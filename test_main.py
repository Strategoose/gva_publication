import pandas as pd
import numpy as np
import pytest

sic_mappings = pd.read_csv('lookups/sic_mappings.csv', dtype={'sic': 'str', 'sic2': 'str'})

path = '/Volumes/Data/EAU/Statistics/Economic Estimates/2017 publications/November publication/GVA - current/Working_file_dcms_V11 2016 Data.xlsx'

# note: both sections of data contain sic 92 so one needs removing
df = pd.read_excel(path, sheet_name = 'NEW ABS DATA (2)', usecols=list(range(12, 21)))
df = df.iloc[pd.np.r_[4:81, 82:86, 88, 90:161], :]
df = df.rename(columns={'Checks': 'sic'}).reset_index(drop=True)
df.sic = df.sic.astype(str) #for some reason 62.011 was being held as a number so need to convert to str
df = pd.melt(df, id_vars=['sic'], var_name='year', value_name='abs')
df.year = df.year.astype(int)
abs = df.copy()
abs.dtypes

df = pd.read_excel(path, sheet_name = 'Charities', usecols=list(range(0, 5)), skiprows=[0])
df = df.iloc[0:7, :]
df.columns = ['year', 'gva', 'total', 'perc', 'overlap']
df.year = df.year.astype(int)
charities = df.copy()
charities.dtypes

df = pd.read_excel(path, sheet_name = 'Tourism', usecols=list(range(0, 5)))
df.columns = ['year', 'gva', 'total', 'perc', 'overlap']
tourism = df.copy()
tourism.dtypes

df = pd.read_excel(path, sheet_name = 'CP Millions', skiprows=[0,1,2,3])
df = df.iloc[9:36, 2:].set_index('Unnamed: 2')
df = df.T.reset_index().rename(columns={'index': 'sic'})
df.iloc[0,0] = 'year_total'
s = sic_mappings.sic2.append(pd.Series('year_total'))
df = df.loc[df['sic'].isin(s)]
if len(sic_mappings.sic2.unique()) != df.shape[0] - 1:
    print('missing sics!')
df = pd.melt(df, id_vars=['sic'], var_name='year', value_name='gva_2digit')
df[['year', 'gva_2digit']] = df[['year', 'gva_2digit']].apply(pd.to_numeric)
gva = df.copy()
gva.dtypes

df = pd.read_excel(path, sheet_name='SIC 91 Sales Data', header=None, dtype={0: 'str'})
df = df.iloc[:, [0,2,3]].dropna(axis=0).reset_index(drop=True)
df.columns = ['sic', 'year', 'abs']
df.year = df.year.astype(int)
sic91 = df.copy()
sic91.dtypes


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
#abs_2015['sic'] = abs_2015['sic'].astype(float)
#temp = sic_mappings.loc[sic_mappings['sic2'].apply(lambda x: x.is_integer()), 'sic2']
abs_2digit = abs_2015.loc[abs_2015['sic'].isin(sic_mappings.sic2)]
abs_2digit = abs_2digit[['year', 'abs', 'sic']]
abs_2digit.rename(columns={'sic': 'sic2', 'abs': 'abs_2digit'}, inplace=True)

# add ABS to DCMS sectors
df = pd.merge(sic_mappings, abs_2015, how='left')

# add ABS GVA for integer SIC
df = pd.merge(df, abs_2digit, how='left')

# split of GVA between SIC by SIC2
df['perc_split'] = df['abs'] / df['abs_2digit']
df = df.dropna(axis=0, subset=['year', 'abs'], how='any')

# add GVA
temp = gva.rename(columns={'sic': 'sic2'})
temp = temp.loc[temp['sic2'] != 'year_total']
df = pd.merge(df, temp, how='left')
df['gva'] = df['perc_split'] * df['gva_2digit']

# not totally sure why we remove 62.011
df = df[df['sic'] != '62.011']
combined_gva = df.copy()

combined_gva_dtypes_check = pd.Series({
    'sic': np.dtype(np.object),
    'description': np.dtype(np.object),
    'sector': np.dtype(np.object),
    'sic2': np.dtype(np.object),
    'sub-sector': np.dtype(np.object),
    'year': np.dtype(np.int64),
    'abs': np.dtype(np.float64),
    'abs_2digit': np.dtype(np.float64),
    'perc_split': np.dtype(np.float64),
    'gva_2digit': np.dtype(np.float64),
    'gva': np.dtype(np.float64),
})
combined_gva.shape == (1494, 11)
combined_gva_dtypes_check.sort_index() == combined_gva.dtypes.sort_index()



# we aggregate the data in two parts: sector level, and sub-sector level. It is not sufficient to simple have sub-sector level and then sum up to find sector level, since some sectors such as toursim and charities do not have a sub-sector breakdown, and for 'All DCMS' there is overlap between sectors so you could not simply sum all sub-sectors. So for a clean approach the data for total sector level is provided where sub-sector column has the value 'All'

# part 1 - sector level aggregate

# aggregate combined GVA
df = combined_gva.copy()
#df['sic'] = df['sic'].astype(float)
#df['sic2'] = df['sic2'].astype(float)
df = df[['year', 'sector', 'gva']].groupby(['year', 'sector']).sum().reset_index()

# append Uk total, tourism, and charities
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

df = pd.concat([df, gva_temp, tourism_temp, charities_temp], axis=0)

# add overlap info from tourism in order to calculate GVA for sector=all_dcms
temp = tourism.copy()
temp['sector'] = 'all_dcms'
temp = temp[['year', 'sector', 'overlap']].copy()
df = pd.merge(df, temp, how='left')
df['gva'] = df['gva'] + df['overlap'].fillna(0)
df = df.drop(['overlap'], axis=1)

# add overlap info from charities in order to calculate GVA for sector=all_dcms
temp = charities.copy()
temp['sector'] = 'all_dcms'
temp = temp[['year', 'sector', 'overlap']].copy()
df = pd.merge(df, temp, how='left')
df['gva'] = df['gva'] + df['overlap'].fillna(0)
df = df.drop(['overlap'], axis=1)

# sort data - this is for consistency
df = df[['sector', 'year', 'gva']].sort_values(by=['year', 'sector'])

# populate sub-sector column with 'All'
df['sub-sector'] = 'All'

sector_agg = df.copy()

# part 2 - sub-sector level aggregate
df = combined_gva.loc[combined_gva['sector'] != 'all_dcms', ['sector', 'sub-sector', 'year', 'gva']]
#df.columns = ['sector', 'sub-sector', 'year', 'gva']
subsector_agg = df.copy()

# append data
df = pd.concat([subsector_agg, sector_agg], axis=0)

# remove pre 2010 data
current_year = gva.year.max()
df = df.loc[df['year'].isin(range(2010, current_year + 1))]

# rename sector column's level names
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
    "UK": "UK"
}
df['sector'] = df['sector'].map(sector_names)
agg = df.copy()

# create aggregate data CSV
agg.to_csv('gva_aggregate_data_2016.csv', index=False)

# make summary tables ==========================================================

# specify row orders for summary tables
all_row_order = """Civil Society (Non-market charities)
Creative Industries
Cultural Sector
Digital Sector
Gambling
Sport
Telecoms
Tourism
All DCMS sectors
UK""".split('\n')
creative_row_order = """Advertising and marketing
Architecture 
Crafts 
Design and designer fashion 
Film, TV, video, radio and photography
IT, software and computer services
Publishing
Museums, galleries and Libraries 
Music, performing and visual arts""".split('\n')
digital_row_order = """Manufacturing of electronics and computers    
Wholesale of computers and electronics    
Publishing (excluding translation and interpretation activities)       
Software publishing       
Film, TV, video, radio and music   
Telecommunications        
Computer programming, consultancy and related activities        
Information service activities      
Repair of computers and communication equipment""".split('\n')
culture_row_order = """Arts
Film, TV and music
Radio
Photography
Crafts
Museums and galleries
Library and archives
Cultural education
Heritage""".split('\n')
row_orders = {
    'Creative Industries': creative_row_order,
    'Digital Sector': digital_row_order,
    'Cultural Sector': culture_row_order,
    'All': all_row_order
}




def make_table(sector, indexed=False):
    df = pd.read_csv('gva_aggregate_data_2016.csv')
    if sector == 'All':
        df = agg.loc[agg['sub-sector'] == 'All']
        breakdown_col = 'sector'
    else:
        df = agg.loc[agg['sector'] == sector]
        breakdown_col = 'sub-sector'        

    tb = pd.crosstab(df[breakdown_col], df['year'], values=df['gva'], aggfunc=sum)
    tb = tb.reindex(row_orders[sector])
    
    if indexed:
        data = tb.copy()
        tb.loc[:, 2010] = 100
        for y in range(2011, current_year + 1):
            tb.loc[:, y] = data.loc[:, y] / data.loc[:, 2010] * 100
        tb = round(tb, 5)
    else:
        if sector == 'All':
            tb = round(tb / 1000, 5)
        else:
            tb = round(tb, 5)        
        
    
    return tb
gva_creative = make_table('Creative Industries')
gva_digital = make_table('Digital Sector')
gva_culture = make_table('Cultural Sector')
gva_current = make_table('All')
gva_current_indexed = make_table('All', indexed=True)




# read in excel data for testing
df = pd.read_excel('GVA_sector_tables.xlsx', sheet_name = '1.1 - GVA current (£bn)', skiprows=5).iloc[list(range(9)) + [10],:-3]
df = df.set_index(['Sector'])
gva_current_excel = round(df, 5)

df = pd.read_excel('GVA_sector_tables.xlsx', sheet_name = '1.1a - GVA current (2010=100)', skiprows=5).iloc[list(range(9)) + [10],:-3]
df = df.set_index(['Sector'])
gva_current_indexed_excel = round(df, 5)

df = pd.read_excel('GVA_subsector_tables.xlsx', sheet_name = '1 - Creative Industries-current', skiprows=5).iloc[0:9,:-3]
df = df.set_index(['Sub-sector'])
gva_creative_excel = round(df, 5)

df = pd.read_excel('GVA_subsector_tables.xlsx', sheet_name = '2 - Digital Sector-current', skiprows=5).iloc[0:9,:-3]
df = df.set_index(['Sub-sector'])
gva_digital_excel = round(df, 5)

df = pd.read_excel('GVA_subsector_tables.xlsx', sheet_name = '3 - Cultural Sector-current', skiprows=5).iloc[0:9,:-3]
df = df.set_index(['Sub-sector'])
gva_culture_excel = round(df, 5)


test_cases = {
    'gva_current': [gva_current, gva_current_excel],
    'gva_current_indexed': [gva_current_indexed, gva_current_indexed_excel],
    'creative': [gva_creative, gva_creative_excel],
    'digital': [gva_digital, gva_digital_excel],
    'culture': [gva_culture, gva_culture_excel],

}
# marks=pytest.mark.xfail
@pytest.mark.parametrize('test_input,expected', [
    pytest.param('gva_current', False, marks=pytest.mark.basic),
    pytest.param('gva_current_indexed', False, marks=pytest.mark.basic),
    pytest.param('creative', False, marks=pytest.mark.basic),
    pytest.param('digital', False, marks=pytest.mark.basic),
    pytest.param('culture', False, marks=pytest.mark.basic),
])
def test_data_matches(test_input, expected):
    assert (test_cases[test_input][0].values != test_cases[test_input][1].values).any() == expected














