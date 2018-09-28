
# coding: utf-8

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

# In[4]:


agg = aggregate_data(combined_gva, gva, tourism, charities)
agg


# #### Save aggregated data to ouputs directory

# In[5]:


agg.to_csv(os.path.join(output_dir, 'gva_aggregate_data_2016.csv'), index=False)


# ## Part 2 - Produce outputs

# #### Read in aggregate data (This is so Part 1 doesn't need to be rerun)

# In[6]:


agg = pd.read_csv(os.path.join(output_dir, 'gva_aggregate_data_2016.csv'))


# #### Create some summary tables

# #### Dictionary of summary tables for use by the test script

# In[7]:


summary_tables = {
    'gva_current': make_table(agg, 'All'),
    'gva_current_indexed': make_table(agg, 'All', indexed=True),
    'creative': make_table(agg, 'Creative Industries'),
    'digital': make_table(agg, 'Digital Sector'),
    'culture': make_table(agg, 'Cultural Sector'),
}


# #### Assign all individual stats, and dataframes, used by publication outputs

# In[8]:


summary_tables = {
    'gva_current': make_table(agg, 'All'),
    'gva_current_indexed': make_table(agg, 'All', indexed=True),
    'creative': make_table(agg, 'Creative Industries'),
    'digital': make_table(agg, 'Digital Sector'),
    'culture': make_table(agg, 'Cultural Sector'),
}


# In[9]:


uk_current_total = summary_tables['gva_current'].loc['UK', 2016]


# ## Build Report

# In[10]:


#%load_ext autoreload
#%autoreload 2


# In[12]:


from report_maker import build
# from report_maker import build (the function) create_app
context = {
    'global': {'hello':  'nothing'},
    'money_bag': {'text': '£994'},
    'donut': {'text': '19.2'},
    'up_arrow_1': {'text': '20.6%'},
    'up_arrow_2': {'text': '40.6%'},
    'dcms_cont': uk_current_total,
}
build.all(context)


# In[46]:


from report_maker import testing


# In[47]:


testing.PATH


# In[ ]:


from report_maker import app
#app.run()


# In[85]:


import os
cwd = os.getcwd()
os.path.join(cwd, "deep")

