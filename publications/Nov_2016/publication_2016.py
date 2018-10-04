
# coding: utf-8

# In[21]:


# this tells jupyter to reload our packages every time we run import, so that any changes are included
if __name__ == "__main__":
    get_ipython().run_line_magic('load_ext', 'autoreload')
    get_ipython().run_line_magic('autoreload', '2')


# # 2016 GVA Publication

# In[88]:


# the cwd is the directory where the notebook is located
# this means that need to make sure that any paths in the notebook are not relative, 
# else they will fail when used by pytest.
# I think this is a better approach than changing the cwd to  gva/ 
import os
os.getcwd()


# #### Import packages and define paths to directories

# In[1]:


# this will automatically reload the gva package when changes have been made
#%load_ext autoreload
#%autoreload 2

import pandas as pd
import numpy as np
import os
import sys

# find path to root directory
if os.path.exists(os.path.abspath(os.path.join('src'))):
    module_path = os.path.abspath(os.path.join(''))
else: 
    module_path = os.path.abspath(os.path.join('../..'))

# add root directory to sys.path so we that our packages can be found
if module_path not in sys.path:
    sys.path.append(module_path)
        
# import package functions
from src.functions import read_abs, read_charities, read_tourism, read_gva, read_sic91, combine_gva, aggregate_data, make_table

# specify output directory
output_dir = os.path.join(module_path, 'publications/Nov_2016')

#package_dir = os.path.dirname(os.path.abspath(__file__))
#output_dir = os.path.join(module_path, 'outputs')

# set path to raw data excel file
path = '/Volumes/Data/EAU/Statistics/Economic Estimates/2017 publications/November publication/GVA - current/Working_file_dcms_V11 2016 Data.xlsx'


# ## Part 1 - Read in, clean, and aggregate data
# This section makes use of the source code in the GVA package's src folder

# #### Read in and clean up raw data in excel file

# In[2]:


abs = read_abs(path)
charities = read_charities(path)
tourism = read_tourism(path)
gva = read_gva(path)
sic91 = read_sic91(path)


# #### Combine sic level data read in above into a single dataset

# In[3]:


combined_gva = combine_gva(abs, gva, sic91)


# #### Aggregate data to sector level
# we want the data all in a single dataset so that sector totals can be easily added to subsector breakdowns, and we do not have to store the values twice, which could be confusing.

# In[139]:


agg = aggregate_data(combined_gva, gva, tourism, charities)


# In[144]:


#pd.pivot_table(agg, values='gva', index=['sector', 'sub-sector'], columns=['year'], aggfunc=np.sum)


# #### Save aggregated data to ouputs directory

# In[5]:


agg.to_csv(os.path.join(output_dir, 'gva_aggregate_data_2016.csv'), index=False)


# ## Part 2 - Produce written reports
# This section makes used of the report_maker package

# #### Read in aggregate data

# This demonstrates that, once the CSV has been generated and published, all the the publication outputs can be created from it, using the below code.

# In[6]:


agg = pd.read_csv(os.path.join(output_dir, 'gva_aggregate_data_2016.csv'))


# #### Create some summary tables
# the `make_table()` function simply make time series for different subsets of the data

# ## Create dictionary to be populate html template

# In[312]:


context = {}


# #### Define tables

# In[320]:


gva_current = make_table(agg, 'All')
gva_current_indexed = make_table(agg, 'All', indexed=True)
creative = make_table(agg, 'Creative Industries')
digital = make_table(agg, 'Digital Sector')
culture = make_table(agg, 'Cultural Sector')


# #### Define individual stats

# In[383]:


perc_change_2010 = (gva_current.loc[:,2016] / gva_current.loc[:,2010] - 1) * 100
perc_change_last_year = (gva_current.loc[:,2016] / gva_current.loc[:,2015] - 1) * 100
perc_of_uk = (gva_current.loc[:, 2016] / gva_current.loc['UK', 2016]) * 100
uk_current_total = gva_current.loc['UK', 2016]


# #### Extended tables

# In[365]:


gva_current_extended = round(make_table(agg, 'All'), 1)
gva_current_extended['% change 2015-2016'] = round(perc_change_last_year, 1)
gva_current_extended['% change 2010-2016'] = round(perc_change_2010, 1)
gva_current_extended['% of UK GVA 2016'] = round(perc_of_uk, 1)
gva_current_extended = gva_current_extended.reset_index()
# convert column names to strings to ensure order is maintained
#gva_current_extended.columns = [str(i) for i in list(gva_current_extended.columns)]
gva_current_extended_json = gva_current_extended.to_json(orient='split', index=False)
gva_current_extended_json


# #### Convert data for charts

# In[351]:


totals = make_table(agg, 'All', indexed=True).loc[['All DCMS sectors', 'UK']]
totals = round(totals, 1)
totals = totals.stack()
totals.name = 'value'
totals = totals.reset_index()
totals['year'] = pd.to_datetime(totals['year'], format='%Y')
#totals_ts_data['year']
totals.columns = ["symbol", "date", "price"]
totals = totals.to_json(orient='records')


# ### Build Written Report

# read json template in as python dict - update according, then convert back to json.

# In[385]:


from report_maker import build
# from report_maker import build (the function) create_app
# add inits to packages
# considering just passing the global environment to build so we don't have to specify this, or do all of the
# above within a new environment to convert to dict. use context.append().
context = {
    # publication info
    'release_date': '29 November 2017',
    
    # individual stats
    'uk_change_2010': round(perc_change_2010['UK'], 1),
    'uk_change_last_year': round(perc_change_last_year['UK'], 1),
    'uk_change_2010_cvm': 'NOT AVAILABLE',
    'uk_change_last_year_cvm': 'NOT AVAILABLE',
    'dcms_perc_uk': round(perc_of_uk['All DCMS sectors']),
    'dcms_total': uk_current_total,
    
    # infographics
    'money_bag': {'text': '£994'},
    'donut': {'text': '19.2'},
    'up_arrow_1': {'text': '20.6%'},
    'up_arrow_2': {'text': '40.6%'},
    
    # json data
    'totals_chart_data': totals,
    'gva_current_extended_json': gva_current_extended_json,
    
}
build.all(context)


# In[46]:


from report_maker import testing


# In[47]:


testing.PATH


# In[ ]:


from report_maker import app
if __name__ == "__main__":
    app.run()


# In[85]:


import os
cwd = os.getcwd()
os.path.join(cwd, "deep")


# In[19]:


print(__name__)


# ## Part 3 - Create Excel Tables
# This section makes use of the spreadsheet_maker package. By default it will look for templates in publication_dir/spreadsheets/templates
# https://github.com/pytest-dev/pytest/issues/2268

# ## Testing

# #### Dictionary of summary tables for use by the test script

# In[7]:


summary_tables = {
    'gva_current': make_table(agg, 'All'),
    'gva_current_indexed': make_table(agg, 'All', indexed=True),
    'creative': make_table(agg, 'Creative Industries'),
    'digital': make_table(agg, 'Digital Sector'),
    'culture': make_table(agg, 'Cultural Sector'),
}

