import pandas as pd
import numpy as np
import pytest
from notebooks.publication_2016 import make_table


test_cases = {
    'gva_current': 
        {'calculated': make_table('All')},
    'gva_current_indexed': 
        {'calculated': make_table('All', indexed=True)},
    'creative': 
        {'calculated': make_table('Creative Industries')},
    'digital': 
        {'calculated': make_table('Digital Sector')},
    'culture':
        {'calculated': make_table('Cultural Sector')},
}

# read in excel data for testing
df = pd.read_excel('GVA_sector_tables.xlsx', sheet_name = '1.1 - GVA current (£bn)', skiprows=5).iloc[list(range(9)) + [10],:-3]
df = df.set_index(['Sector'])
df = round(df, 5)
test_cases['gva_current']['publication'] = df

df = pd.read_excel('GVA_sector_tables.xlsx', sheet_name = '1.1a - GVA current (2010=100)', skiprows=5).iloc[list(range(9)) + [10],:-3]
df = df.set_index(['Sector'])
df = round(df, 5)
test_cases['gva_current_indexed']['publication'] = df

df = pd.read_excel('GVA_subsector_tables.xlsx', sheet_name = '1 - Creative Industries-current', skiprows=5).iloc[0:9,:-3]
df = df.set_index(['Sub-sector'])
df = round(df, 5)
test_cases['creative']['publication'] = df

df = pd.read_excel('GVA_subsector_tables.xlsx', sheet_name = '2 - Digital Sector-current', skiprows=5).iloc[0:9,:-3]
df = df.set_index(['Sub-sector'])
df = round(df, 5)
test_cases['digital']['publication'] = df

df = pd.read_excel('GVA_subsector_tables.xlsx', sheet_name = '3 - Cultural Sector-current', skiprows=5).iloc[0:9,:-3]
df = df.set_index(['Sub-sector'])
df = round(df, 5)
test_cases['culture']['publication'] = df

# marks=pytest.mark.xfail
@pytest.mark.parametrize('test_input,expected', [
    pytest.param('gva_current', False, marks=pytest.mark.basic),
    pytest.param('gva_current_indexed', False, marks=pytest.mark.basic),
    pytest.param('creative', False, marks=pytest.mark.basic),
    pytest.param('digital', False, marks=pytest.mark.basic),
    pytest.param('culture', False, marks=pytest.mark.basic),
])
def test_data_matches(test_input, expected):
    assert (test_cases[test_input]['calculated'].values != test_cases[test_input]['publication'].values).any() == expected














