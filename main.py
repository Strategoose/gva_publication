import pandas as pd
import numpy as np
import itertools

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
mysics = sic_mappings.sic2.astype(int).astype(str).append(pd.Series('year_total'))
df4 = df3.loc[df3['sic'].isin(mysics)]
if len(sic_mappings.sic2.unique()) != df4.shape[0] - 1:
    print('missing sics')
df5 = pd.melt(df4, id_vars=['sic'], var_name='year', value_name='gva_2digit')
df5.year = pd.to_numeric(df5.year)
df5.gva_2digit = pd.to_numeric(df5.gva_2digit)
gva = df5
gva.dtypes

df = pd.read_excel(path, sheet_name='SIC 91 Sales Data', header=None)
df2 = df.iloc[:, [0,2,3]]
df3 = df2.dropna(axis=0).reset_index(drop=True)
df3.columns = ['sic', 'year', 'abs']
df3.sic = df3.sic.astype(str)
df3.year = df3.year.astype(int)
sic91 = df3

# appending SIC sales data which supplements the ABS for SIC 91
abs_2015 = abs.loc[~abs['sic'].isin(sic91['sic'].unique())]
abs_2015 = pd.concat([abs_2015, sic91], axis=0)
abs_year = abs.year.max()

# copy 2015 data to append as 2016 data
temp = abs_2015.loc[abs['year'] == abs_year]
temp['year'] = abs_year + 1
abs_2015 = pd.concat([abs_2015, temp], axis=0)

# keep cases from ABS which have integer SIC - which is just a higher level SIC
# !!!!!!!! sic mappings 2 digit has 30.1 as a value
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

gva_by_sector = combined_gva[['year', 'sector', 'gva']].groupby(['year', 'sector']).sum().reset_index()



  gva_by_sector <- combined_gva %>%

    # initial summary by sector
    dplyr::group_by(year, sector) %>%
    dplyr::summarise(gva = sum(gva)) %>%

    #append total UK GVA by year
    dplyr::bind_rows(
      dplyr::filter(gva, sic == "year_total") %>%
        dplyr::mutate(sector = "UK") %>%
        dplyr::select(year, sector, gva = gva_2digit)
    ) %>%

    #append tourism data - add in by statement for transparency
    dplyr::bind_rows(
      dplyr::mutate(tourism, sector = "tourism") %>%
        dplyr::select(year, sector, gva)
    ) %>%

    #append charitites data
    dplyr::bind_rows(
      dplyr::mutate(charities, sector = "charities") %>%
        dplyr::select(year, sector, gva)
    )

  #add overlap info from tourism in order to calculate GVA for sector=all_dcms
  tourism_all_sectors <- dplyr::mutate(tourism, sector = "all_dcms") %>%
    dplyr::select(year, sector, overlap)

  #add overlap info from tourism in order to calculate GVA for sector=all_dcms
  charities_all_sectors <- dplyr::mutate(charities, sector = "all_dcms") %>%
    dplyr::select(year, sector, overlap)


  gva_by_sector <-
    dplyr::left_join(gva_by_sector, tourism_all_sectors, by = c("year", "sector")) %>%
    dplyr::ungroup() %>%
    dplyr::mutate(gva = ifelse(!is.na(overlap), overlap + gva, gva)) %>%
    dplyr::select(-overlap)

  gva_by_sector <-
    dplyr::left_join(gva_by_sector, charities_all_sectors, by = c("year", "sector")) %>%
    dplyr::ungroup() %>%
    dplyr::mutate(gva = ifelse(!is.na(overlap), overlap + gva, gva)) %>%
    dplyr::select(-overlap)

  #final clean up
  gva_by_sector <- gva_by_sector %>%
    dplyr::filter(year %in% 2010:max(attr(combined_gva, "years"))) %>%
    dplyr::select(sector, year, gva) %>%
    dplyr::arrange(year, sector) %>%
    data.frame()


  sectors_set <- c(
    "charities"   = "Civil Society (Non-market charities)",
    "creative"    = "Creative Industries",
    "culture"     = "Cultural Sector",
    "digital"     = "Digital Sector",
    "gambling"    = "Gambling",
    "sport"       = "Sport",
    "telecoms"    = "Telecoms",
    "tourism"     = "Tourism",
    "all_dcms"    = "All DCMS sectors",
    "perc_of_UK"  = "% of UK GVA",
    "UK"          = "UK"
  )

















