import pandas as pd
import numpy as np
import itertools
import feather

sic_mappings = pd.read_csv('lookups/sic_mappings.csv')


path = '/Volumes/Data/EAU/Statistics/Economic Estimates/2017 publications/November publication/GVA - current/Working_file_dcms_V11 2016 Data.xlsx'

df = pd.read_excel(path, sheet_name = 'NEW ABS DATA (2)', usecols=list(range(12, 21)))
df2 = df.iloc[90:161, :]
df3 = df.iloc[list(range(4, 86)) + [88], :]
df4 = pd.concat([df2, df3])
df5 = df4.rename(columns={'Checks': 'sic'}).reset_index(drop=True)
df6 = df5.drop(81)
df7 = pd.melt(df6, id_vars=['sic'], var_name='year', value_name='abs')
df7.year = pd.to_numeric(df7.year)
abs = df7
#abs.loc[abs['abs'] < 0, 'abs'] = 0


df = pd.read_excel(path, sheet_name = 'Charities', usecols=list(range(0, 5)), skiprows=[0])
df2 = df.iloc[0:7, :]
df2.columns = ['year', 'gva', 'total', 'perc', 'overlap']
charities = df2

df = pd.read_excel(path, sheet_name = 'Tourism', usecols=list(range(0, 5)))
df.columns = ['year', 'gva', 'total', 'perc', 'overlap']
tourism = df

df = pd.read_excel(path, sheet_name = 'CP Millions', skiprows=[0,1,2,3])
df2 = df.iloc[9:36, 2:].set_index('Unnamed: 2')
df3 = df2.T.reset_index().rename(columns={'index': 'sic'})
df3.iloc[0,0] = 'year_total'
#mysics = sic_mappings.sic2.astype(int).astype(str).append(pd.Series('year_total'))
mysics = sic_mappings.sic2.copy()
mask = mysics.apply(lambda x: x.is_integer())
tempo = mysics.astype(str)
tempo[mask] = mysics[mask].astype(int).astype(str)
mysics = tempo.append(pd.Series('year_total'))
df4 = df3.loc[df3['sic'].isin(mysics)]
if len(sic_mappings.sic2.unique()) != df4.shape[0] - 1:
    print('missing sics')
df5 = pd.melt(df4, id_vars=['sic'], var_name='year', value_name='gva_2digit')
df5.year = pd.to_numeric(df5.year)
df5.gva_2digit = pd.to_numeric(df5.gva_2digit)
gva = df5

df = pd.read_excel(path, sheet_name='SIC 91 Sales Data', header=None)
df2 = df.iloc[:, [0,2,3]]
df3 = df2.dropna(axis=0).reset_index(drop=True)
df3.columns = ['sic', 'year', 'abs']

# convert sics to string
#df3.sic = df3.sic.astype(str)
mysics = df3.sic
mask = mysics.apply(lambda x: x.is_integer())
tempo = mysics.astype(str)
tempo[mask] = mysics[mask].astype(int).astype(str)
df3.sic = tempo

df3.year = df3.year.astype(int)

sic91 = df3

# combine extracts =============================================================
# appending SIC sales data which supplements the ABS for SIC 91
abs_2015 = abs.loc[~abs['sic'].isin(sic91['sic'].unique())]
abs_2015 = pd.concat([abs_2015, sic91], axis=0)
abs_year = abs.year.max()

# copy 2015 data to append as 2016 data
temp = abs_2015.loc[abs_2015['year'] == abs_year].copy()
temp['year'] = abs_year + 1
abs_2015 = pd.concat([abs_2015, temp], axis=0)

# keep cases from ABS which have integer SIC - which is just a higher level SIC
# sic mappings 2 digit has 30.1 as a value
# convert abs_2015.sic from str without decimals to float
abs_2015['sic'] = abs_2015['sic'].astype(float)
#temp = sic_mappings.loc[sic_mappings['sic2'].apply(lambda x: x.is_integer()), 'sic2']
abs_2digit = abs_2015.loc[abs_2015['sic'].isin(sic_mappings.sic2)]
abs_2digit = abs_2digit[['year', 'abs', 'sic']]
abs_2digit.rename(columns={'sic': 'sic2', 'abs': 'abs_2digit'}, inplace=True)

# add ABS to DCMS sectors
gva_sectors = pd.merge(sic_mappings, abs_2015, how='left')
# add ABS GVA for integer SIC
gva_sectors = pd.merge(gva_sectors, abs_2digit, how='left')
# split of GVA between SIC by SIC2
gva_sectors['perc_split'] = gva_sectors['abs'] / gva_sectors['abs_2digit']
gva_sectors = gva_sectors.dropna(axis=0, subset=['year', 'abs'], how='any')

# add GVA
temp = gva.rename(columns={'sic': 'sic2'})
temp = temp.loc[temp['sic2'] != 'year_total']
temp['sic2'] = temp['sic2'].astype(float)
gva_sectors = pd.merge(gva_sectors, temp, how='left')
gva_sectors['gva'] = gva_sectors['perc_split'] * gva_sectors['gva_2digit']

combined_gva = gva_sectors
combined_gva = combined_gva[combined_gva['sic'] != 62.011]

# sum by sector ================================================================
gva_by_sector = combined_gva[['year', 'sector', 'gva']].groupby(['year', 'sector']).sum().reset_index()

temp = gva.loc[gva['sic'] == 'year_total'].copy()
temp['sector'] = 'UK'
temp = temp.rename(columns={'gva_2digit': 'gva'})
gva_temp = temp[['year', 'sector', 'gva']].copy()

temp = tourism.copy()
temp['sector'] = 'tourism'
tourism_temp = temp[['year', 'sector', 'gva']].copy()

temp = charities.copy()
temp['sector'] = 'charities'
charities_temp = temp[['year', 'sector', 'gva']].copy()

gva_by_sector = pd.concat([gva_by_sector, gva_temp, tourism_temp, charities_temp], axis=0)

# add overlap info from tourism in order to calculate GVA for sector=all_dcms
temp = tourism.copy()
temp['sector'] = 'all_dcms'
tourism_all_sectors = temp[['year', 'sector', 'overlap']].copy()

# add overlap info from charities in order to calculate GVA for sector=all_dcms
temp = charities.copy()
temp['sector'] = 'all_dcms'
charities_all_sectors = temp[['year', 'sector', 'overlap']].copy()

gva_by_sector = pd.merge(gva_by_sector, tourism_all_sectors, how='left')
gva_by_sector['gva'] = gva_by_sector['gva'] + gva_by_sector['overlap'].fillna(0)
gva_by_sector = gva_by_sector.drop(['overlap'], axis=1)

gva_by_sector = pd.merge(gva_by_sector, charities_all_sectors, how='left')
gva_by_sector['gva'] = gva_by_sector['gva'] + gva_by_sector['overlap'].fillna(0)
gva_by_sector = gva_by_sector.drop(['overlap'], axis=1)

# clean up
current_year = combined_gva.year.max()
gva_by_sector = gva_by_sector.loc[gva_by_sector['year'].isin(range(2010, current_year + 1))]
gva_by_sector = gva_by_sector[['sector', 'year', 'gva']].sort_values(by=['year', 'sector'])


sector_names = {
    "charities": "Civil Society (Non-market charities)",
    "creative": "Creative Industries",
    "culture": "Cultural Sector",
    "digital": "Digital Sector",
    "gambling": "Gambling",
    "sport": "Sport",
    "telecoms": "Telecoms",
    "tourism": "Tourism",
    "all_dcms": "All DCMS sectors",
    "perc_of_UK": "% of UK GVA",
    "UK": "UK"
}

df = gva_by_sector.copy()
temp = gva_by_sector.copy()
temp = temp.loc[(temp['sector'] == 'UK') & (temp['year'] == 2016)]
total2016 = temp.copy()
df['gva'] = round(df['gva'] / 1000, 1)
df['year'] = df['year'].astype(int)

tb = pd.crosstab(df['sector'], df['year'], values=df['gva'], aggfunc=sum)
tb.loc['perc_of_UK'] = round(tb.loc['all_dcms'] / tb.loc['UK'] * 100, 1)
tb = tb.reindex(list(sector_names))

gva_excel = pd.read_excel('GVA_sector_tables.xlsx', sheet_name = '1.1 - GVA current (£bn)', skiprows=5).iloc[0:11,:-3]
gva_excel = gva_excel.set_index(['Sector'])
gva_excel = round(gva_excel, 1)
tb.values == gva_excel.values




gvar = feather.read_dataframe('gva.feather')
absr = feather.read_dataframe('abs.feather')
combined_gvar = feather.read_dataframe('combined_gva.feather')
tempr = feather.read_dataframe('temp.feather')
gva.dtypes
gvar.dtypes
(gva != gvar).any()
gvar.head()
abs.iloc[16]
absr.iloc[16]
(abs != absr).any()
test = abs != absr
absr[test['sic']]
absr[abs != absr]
test = abs != absr
abs.iloc[69]
absr.iloc[69]
abs.dtypes
absr.dtypes

tempr.dtypes
gva_sectors.dtypes
tempr.sic = tempr.sic.astype(float)
tempr.sic2 = tempr.sic2.astype(float)
(combined_gva != combined_gvar).any()
df_all = gva_sectors.merge(tempr.drop_duplicates(), 
                   how='left', indicator=True)
df_all['_merge'] == 'left_only'



row_order = """Civil Society (Non-market charities)
Creative Industries
Cultural Sector
Digital Sector
Gambling
Sport
Telecoms
Tourism
All DCMS sectors
% of UK GVA
UK""".split('\n')
tb[row_order]

    
  total2016 <- df %>%
    dplyr::filter(sector == "UK" & year == 2016) %>%
    data.frame()

  df <- df %>%
    dplyr::group_by(sector) %>%
    tidyr::spread(key = year, value = gva) %>%
    dplyr::ungroup()

  df <- df %>%
    dplyr::rename(`Sector` = sector) %>%
    as.data.frame() # just ata.frame() will read in data and convert col names

  # append dcms % uk row

  # update sector column with pretty category names
  sector_lookup <- eegva::sector_lookup
  df$Sector <-
    sector_lookup$output_name[match(df$Sector, sector_lookup$working_name)]

  # re-order rows
  df <-
    df[
      order(
        sector_lookup$row_postition[
          match(df$Sector, sector_lookup$output_name)]
      ),
    ]















