  
    //{"columns":["sector",2010,2011,2012,2013,2014,2015,2016,"% change 2015-2016","% change 2010-2016","% of UK GVA 2016"],"data":[["Civil Society (Non-market charities)",19.3,19.6,16.1,18.7,19.8,21.3,20.9,-1.7,8.7,1.2],["Creative Industries",63.4,67.2,70.7,74.9,80.0,85.3,91.8,7.6,44.8,5.3],["Cultural Sector",21.1,21.7,22.6,23.3,24.5,25.6,26.8,4.4,27.1,1.5],["Digital Sector",94.5,99.6,101.7,106.8,108.4,110.2,116.5,5.8,23.3,6.7],["Gambling",8.4,9.3,9.9,10.0,10.4,11.1,10.6,-3.7,26.7,0.6],["Sport",7.0,7.4,7.9,7.5,7.8,8.6,9.0,4.9,28.6,0.5],["Telecoms",24.7,25.5,26.0,28.1,30.0,30.4,30.0,-1.4,21.1,1.7],["Tourism",49.2,53.9,57.3,59.0,60.4,64.6,66.1,2.2,34.4,3.8],["All DCMS sectors",192.7,205.2,209.9,220.8,227.5,239.8,248.5,3.6,29.0,14.2],["UK",1422.0,1458.8,1505.7,1564.4,1638.7,1684.9,1744.4,3.5,22.7,100.0]]},
chartdata = [{"year": 2010, "Civil Society (Non-market charities)": 19.3, "Creative Industries": 63.4, "Cultural Sector": 21.1, "Digital Sector": 94.5, "Gambling": 8.4, "Sport": 7.0, "Telecoms": 24.7, "Tourism": 49.2, "All DCMS sectors": 192.7, "UK": 1422.0}, {"year": 2011, "Civil Society (Non-market charities)": 19.6, "Creative Industries": 67.2, "Cultural Sector": 21.7, "Digital Sector": 99.6, "Gambling": 9.3, "Sport": 7.4, "Telecoms": 25.5, "Tourism": 53.9, "All DCMS sectors": 205.2, "UK": 1458.8}, {"year": 2012, "Civil Society (Non-market charities)": 16.1, "Creative Industries": 70.7, "Cultural Sector": 22.6, "Digital Sector": 101.7, "Gambling": 9.9, "Sport": 7.9, "Telecoms": 26.0, "Tourism": 57.3, "All DCMS sectors": 209.9, "UK": 1505.7}, {"year": 2013, "Civil Society (Non-market charities)": 18.7, "Creative Industries": 74.9, "Cultural Sector": 23.3, "Digital Sector": 106.8, "Gambling": 10.0, "Sport": 7.5, "Telecoms": 28.1, "Tourism": 59.0, "All DCMS sectors": 220.8, "UK": 1564.4}, {"year": 2014, "Civil Society (Non-market charities)": 19.8, "Creative Industries": 80.0, "Cultural Sector": 24.5, "Digital Sector": 108.4, "Gambling": 10.4, "Sport": 7.8, "Telecoms": 30.0, "Tourism": 60.4, "All DCMS sectors": 227.5, "UK": 1638.7}, {"year": 2015, "Civil Society (Non-market charities)": 21.3, "Creative Industries": 85.3, "Cultural Sector": 25.6, "Digital Sector": 110.2, "Gambling": 11.1, "Sport": 8.6, "Telecoms": 30.4, "Tourism": 64.6, "All DCMS sectors": 239.8, "UK": 1684.9}, {"year": 2016, "Civil Society (Non-market charities)": 20.9, "Creative Industries": 91.8, "Cultural Sector": 26.8, "Digital Sector": 116.5, "Gambling": 10.6, "Sport": 9.0, "Telecoms": 30.0, "Tourism": 66.1, "All DCMS sectors": 248.5, "UK": 1744.4}]
seriesnames = Object.keys(chartdata[0]).slice(1,-1)

var chart = c3.generate({
  bindto: '#figure_2_1',
  data: {
      json: [{"year": 2010, "Civil Society (Non-market charities)": 19.3, "Creative Industries": 63.4, "Cultural Sector": 21.1, "Digital Sector": 94.5, "Gambling": 8.4, "Sport": 7.0, "Telecoms": 24.7, "Tourism": 49.2, "All DCMS sectors": 192.7, "UK": 1422.0}, {"year": 2011, "Civil Society (Non-market charities)": 19.6, "Creative Industries": 67.2, "Cultural Sector": 21.7, "Digital Sector": 99.6, "Gambling": 9.3, "Sport": 7.4, "Telecoms": 25.5, "Tourism": 53.9, "All DCMS sectors": 205.2, "UK": 1458.8}, {"year": 2012, "Civil Society (Non-market charities)": 16.1, "Creative Industries": 70.7, "Cultural Sector": 22.6, "Digital Sector": 101.7, "Gambling": 9.9, "Sport": 7.9, "Telecoms": 26.0, "Tourism": 57.3, "All DCMS sectors": 209.9, "UK": 1505.7}, {"year": 2013, "Civil Society (Non-market charities)": 18.7, "Creative Industries": 74.9, "Cultural Sector": 23.3, "Digital Sector": 106.8, "Gambling": 10.0, "Sport": 7.5, "Telecoms": 28.1, "Tourism": 59.0, "All DCMS sectors": 220.8, "UK": 1564.4}, {"year": 2014, "Civil Society (Non-market charities)": 19.8, "Creative Industries": 80.0, "Cultural Sector": 24.5, "Digital Sector": 108.4, "Gambling": 10.4, "Sport": 7.8, "Telecoms": 30.0, "Tourism": 60.4, "All DCMS sectors": 227.5, "UK": 1638.7}, {"year": 2015, "Civil Society (Non-market charities)": 21.3, "Creative Industries": 85.3, "Cultural Sector": 25.6, "Digital Sector": 110.2, "Gambling": 11.1, "Sport": 8.6, "Telecoms": 30.4, "Tourism": 64.6, "All DCMS sectors": 239.8, "UK": 1684.9}, {"year": 2016, "Civil Society (Non-market charities)": 20.9, "Creative Industries": 91.8, "Cultural Sector": 26.8, "Digital Sector": 116.5, "Gambling": 10.6, "Sport": 9.0, "Telecoms": 30.0, "Tourism": 66.1, "All DCMS sectors": 248.5, "UK": 1744.4}],
      keys: {
          x: 'year',
          value: seriesnames
      }
  },
  axis: {
    y: {
        tick: {
            // values: [50, 100, 150, 200, 250],
            outer: false
        },
        // max: 100,
        padding: {
            top: 0,
            bottom: 0
        },
        min: -10
    },
    x: {
        tick: {
            culling: false,
            outer: false
        }
        // height: 80
    }
},
legend: {
    // amount of padding to put between each legend element
    padding: 5,
    // define custom height and width for the legend item tile
    item: {
        tile: {
            width: 15,
            height: 2
        }
    }
},
  size: {
    width: 640,
    height: 500
  },
  padding: {
    top: 10,
    right: 50,
    bottom: 20,
    left: 50,
  },
  grid: {
    x: {
    },
    y: {
        show: true
    }
}
});