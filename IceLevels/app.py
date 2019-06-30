import numpy as np # linear algebra
import pandas as pd # data processing
import datetime as dt # date and time processing functions
import itertools
import matplotlib.pyplot as plt # basic plotting 
import matplotlib.dates as mdates # date processing in matplotlib
from matplotlib.offsetbox import AnchoredText
plt.style.use('ggplot') # use ggplot style
%matplotlib inline 

# read in the data from the provided csv file
df = pd.read_csv('seaice.csv')

# drop the 'Source Data' column as it obscures more useful columns and doesn't tell us much
df.drop('Source Data', axis = 1, inplace = True)

# convert the provided 3 column date format to datetime format and set it as the index
df['Date'] = pd.to_datetime(df[['Year','Month','Day']])
df.index = df['Date'].values

# split according to hemisphere, as we are expecting different trends for each
#north = df[df['hemisphere'] == 'north']
#south = df[df['hemisphere'] == 'south']

#plt.figure(figsize=(9,3))
#plt.plot(north.index,north['Extent'], label='Northern Hemisphere')
#plt.plot(south.index,south['Extent'], label='Southern Hemisphere')

# add plot legend and titles
#plt.legend(bbox_to_anchor=(0., -.362, 1., .102), loc=3, ncol=2, 
#           mode="expand", borderaxespad=0.)
#plt.ylabel('Sea ice extent (10^6 sq km)')
#plt.xlabel('Date')
#plt.title('Daily sea-ice extent')

# resample raw data into annual averages
northyear = north['01-01-1979':'31-12-2016'].resample('12M').mean()
southyear = south['01-01-1979':'31-12-2016'].resample('12M').mean()

# remove the initial and final item as they aer averaged incorrectly (also indexes seem bad)
northyear = northyear[1:-1]
southyear = southyear[1:-1]

plt.figure(figsize=(9,3))
plt.plot(northyear.Year,northyear['Extent'], marker = '.', label='Northern Hemisphere')
plt.plot(southyear.Year,southyear['Extent'], marker = '.', label='Southern Hemisphere')

# add plot legend and titles
plt.legend(bbox_to_anchor=(0., -.362, 1., .102), loc=3, ncol=2, mode="expand", borderaxespad=0.)
plt.ylabel('Sea ice extent (10^6 sq km)')
plt.xlabel('Date')
plt.title('Annual average sea-ice extent')
plt.xlim(1977, 2016)