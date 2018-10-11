# this adds the root directory to sys.path - I believe it is equivalent to using python -m pytest
import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../..')))

import pandas as pd
import numpy as np
import pytest

# append function which allows notebooks to be imported as modules
from utilities import NotebookFinder
sys.meta_path.append(NotebookFinder())

# change cwd to mimic running notebook from publication dir so that notebook runs as intended
path_og = __file__
#path_og = '/Users/max.unsted/projects/gva_publication/publications/nov_2016/tests/test_2016publication.py'
path = path_og
from pathlib import Path
doop = Path(path_og)
for i in range(len(doop.parts)):
    path = os.path.dirname(path)
    if os.path.split(os.path.dirname(path))[1] == 'publications':
        break

os.chdir(path)

from publications.nov_2016.publication_2016 import summary_tables
excel_dir = 'tests'

test_cases = {}
for k in summary_tables:
    test_cases[k] = {}
    test_cases[k]['calculated'] = summary_tables[k]


# read in excel data for testing
df = pd.read_excel(os.path.join(excel_dir, 'GVA_sector_tables.xlsx'), sheet_name = '1.1 - GVA current (£bn)', skiprows=5).iloc[list(range(9)) + [10],:-3]
df = df.set_index(['Sector'])
df = round(df, 5)
test_cases['gva_current']['publication'] = df

df = pd.read_excel(os.path.join(excel_dir, 'GVA_sector_tables.xlsx'), sheet_name = '1.1a - GVA current (2010=100)', skiprows=5).iloc[list(range(9)) + [10],:-3]
df = df.set_index(['Sector'])
df = round(df, 5)
test_cases['gva_current_indexed']['publication'] = df

df = pd.read_excel(os.path.join(excel_dir, 'GVA_subsector_tables.xlsx'), sheet_name = '1 - Creative Industries-current', skiprows=5).iloc[0:9,:-3]
df = df.set_index(['Sub-sector'])
df = round(df, 5)
test_cases['creative']['publication'] = df

df = pd.read_excel(os.path.join(excel_dir, 'GVA_subsector_tables.xlsx'), sheet_name = '2 - Digital Sector-current', skiprows=5).iloc[0:9,:-3]
df = df.set_index(['Sub-sector'])
df = round(df, 5)
test_cases['digital']['publication'] = df

df = pd.read_excel(os.path.join(excel_dir, 'GVA_subsector_tables.xlsx'), sheet_name = '3 - Cultural Sector-current', skiprows=5).iloc[0:9,:-3]
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












