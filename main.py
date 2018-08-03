import pandas as pd
import numpy as np
import itertools

sic_lookup = pd.read_csv('lookups/sic_mappings.csv')


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
mysics = sic_lookup.sic2.astype(int).astype(str).append(pd.Series('year_total'))
df4 = df3.loc[df3['sic'].isin(mysics)]
if len(sic_lookup.sic2.unique()) != df4.shape[0] - 1:
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

  abs_2015 <- abs %>%
    dplyr::filter(!sic %in% unique(sic91$sic)) %>%

    #simply appending SIC sales data which supplements the ABS for SIC 91
    dplyr::bind_rows(sic91)

  abs_year <- max(attr(abs, "years"))
  abs_2015 <-
    dplyr::bind_rows(
      abs_2015,
      dplyr::filter(abs_2015, year == abs_year) %>%
      dplyr::mutate(year = abs_year + 1L))

  # keep cases from ABS which have integer SIC - which is just a higher level SIC
  abs_2digit <- abs_2015 %>%
    dplyr::filter(sic %in% eegva::sic_mappings$sic2) %>%
    dplyr::select(year, abs_2digit = abs, sic2 = sic)


  #add ABS to DCMS sectors
  gva_sectors <- dplyr::left_join(
                   eegva::sic_mappings,
                   abs_2015,
                   by = c('sic')) %>%
    dplyr::left_join(abs_2digit, by = c('year', 'sic2')) %>% #  add ABS GVA for integer SIC
    dplyr::mutate(perc_split = abs / abs_2digit) %>% #  split of GVA between SIC by SIC2
    dplyr::filter(!(is.na(year) & is.na(abs))) %>% #  rows must have either year or ABS GVA

    #add GVA
    dplyr::left_join(gva, by = c('sic2' = 'sic', 'year')) %>% #  add in GVA if SIC appears in SIC2
    dplyr::mutate(gva = perc_split * gva_2digit)