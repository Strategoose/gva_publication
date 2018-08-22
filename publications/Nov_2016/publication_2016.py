
# coding: utf-8

# # 2016 GVA Publication

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
    module_path = os.path.abspath(os.path.join('..'))

# add root directory to sys.path so that package can be found
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

# In[5]:


agg = aggregate_data(combined_gva, gva, tourism, charities)
agg


# #### Save aggregated data to ouputs directory

# In[ ]:


agg.to_csv(os.path.join(output_dir, 'gva_aggregate_data_2016.csv'), index=False)


# ## Part 2 - Produce outputs

# #### Read in aggregate data (This is so Part 1 doesn't need to be rerun)

# In[4]:


agg = pd.read_csv(os.path.join(output_dir, 'gva_aggregate_data_2016.csv'))


# #### Create some summary tables

# In[5]:


make_table(agg, 'All')


# #### Save summary tables to a dictionary so they can be easily used by the test script

# In[6]:


summary_tables = {
    'gva_current': make_table(agg, 'All'),
    'gva_current_indexed': make_table(agg, 'All', indexed=True),
    'creative': make_table(agg, 'Creative Industries'),
    'digital': make_table(agg, 'Digital Sector'),
    'culture': make_table(agg, 'Cultural Sector'),
}

