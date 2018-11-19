  
    //,
chartdata = [{"year": 2010, "All DCMS sectors": 100.0, "UK": 100.0}, {"year": 2011, "All DCMS sectors": 106.8043, "UK": 102.70715}, {"year": 2012, "All DCMS sectors": 110.18382, "UK": 105.96585}, {"year": 2013, "All DCMS sectors": 115.15386, "UK": 110.04476}, {"year": 2014, "All DCMS sectors": 119.30598, "UK": 115.13226}, {"year": 2015, "All DCMS sectors": 128.14282, "UK": 118.35577}, {"year": 2016, "All DCMS sectors": 131.93763, "UK": 122.8329}, {"year": 2017, "All DCMS sectors": 136.40465, "UK": 128.70012}]
seriesnames = Object.keys(chartdata[0]).slice(1,-1)

mychart = function(id, data, yaxismin, yaxismax) {
    seriesnames = Object.keys(data[0])
    var chart = c3.generate({
      bindto: id,
      data: {
          json: data,
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
                // culling: {max: 4}
            },
            // max: 100,
            padding: {
                top: 0,
                bottom: 0
            },
            max: yaxismax,
            min: yaxismin
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
}
mychart('#figure_2_1', [{"year": 2010, "All DCMS sectors": 100.0, "UK": 100.0}, {"year": 2011, "All DCMS sectors": 106.8043, "UK": 102.70715}, {"year": 2012, "All DCMS sectors": 110.18382, "UK": 105.96585}, {"year": 2013, "All DCMS sectors": 115.15386, "UK": 110.04476}, {"year": 2014, "All DCMS sectors": 119.30598, "UK": 115.13226}, {"year": 2015, "All DCMS sectors": 128.14282, "UK": 118.35577}, {"year": 2016, "All DCMS sectors": 131.93763, "UK": 122.8329}, {"year": 2017, "All DCMS sectors": 136.40465, "UK": 128.70012}], 80, 160)
mychart('#figure_3_1', [{"year": 2010, "Civil Society (Non-market charities)": 100.0, "UK": 100.0}, {"year": 2011, "Civil Society (Non-market charities)": 102.09322, "UK": 102.70715}, {"year": 2012, "Civil Society (Non-market charities)": 93.27217, "UK": 105.96585}, {"year": 2013, "Civil Society (Non-market charities)": 97.13698, "UK": 110.04476}, {"year": 2014, "Civil Society (Non-market charities)": 109.73321, "UK": 115.13226}, {"year": 2015, "Civil Society (Non-market charities)": 117.1992, "UK": 118.35577}, {"year": 2016, "Civil Society (Non-market charities)": 128.90963, "UK": 122.8329}, {"year": 2017, "Civil Society (Non-market charities)": 124.09894, "UK": 128.70012}], 80, 160)
mychart('#figure_3_2', [{"year": 2010, "Creative Industries": 100.0, "UK": 100.0}, {"year": 2011, "Creative Industries": 106.79102, "UK": 102.70715}, {"year": 2012, "Creative Industries": 112.08966, "UK": 105.96585}, {"year": 2013, "Creative Industries": 119.12788, "UK": 110.04476}, {"year": 2014, "Creative Industries": 127.26536, "UK": 115.13226}, {"year": 2015, "Creative Industries": 136.11023, "UK": 118.35577}, {"year": 2016, "Creative Industries": 142.92819, "UK": 122.8329}, {"year": 2017, "Creative Industries": 153.0547, "UK": 128.70012}], 80, 160)
mychart('#figure_3_3', [{"year": 2010, "Cultural Sector": 100.0, "UK": 100.0}, {"year": 2011, "Cultural Sector": 104.23159, "UK": 102.70715}, {"year": 2012, "Cultural Sector": 108.24526, "UK": 105.96585}, {"year": 2013, "Cultural Sector": 112.61513, "UK": 110.04476}, {"year": 2014, "Cultural Sector": 118.97411, "UK": 115.13226}, {"year": 2015, "Cultural Sector": 126.91603, "UK": 118.35577}, {"year": 2016, "Cultural Sector": 129.23997, "UK": 122.8329}, {"year": 2017, "Cultural Sector": 138.52014, "UK": 128.70012}], 80, 160)
mychart('#figure_3_4', [{"year": 2010, "Digital Sector": 100.0, "UK": 100.0}, {"year": 2011, "Digital Sector": 105.7934, "UK": 102.70715}, {"year": 2012, "Digital Sector": 108.09461, "UK": 105.96585}, {"year": 2013, "Digital Sector": 113.45336, "UK": 110.04476}, {"year": 2014, "Digital Sector": 115.18618, "UK": 115.13226}, {"year": 2015, "Digital Sector": 117.09937, "UK": 118.35577}, {"year": 2016, "Digital Sector": 123.80158, "UK": 122.8329}, {"year": 2017, "Digital Sector": 132.89477, "UK": 128.70012}], 80, 160)
mychart('#figure_3_5', [{"year": 2010, "Gambling": 100.0, "UK": 100.0}, {"year": 2011, "Gambling": 110.5545, "UK": 102.70715}, {"year": 2012, "Gambling": 117.59876, "UK": 105.96585}, {"year": 2013, "Gambling": 118.62208, "UK": 110.04476}, {"year": 2014, "Gambling": 123.6197, "UK": 115.13226}, {"year": 2015, "Gambling": 122.44169, "UK": 118.35577}, {"year": 2016, "Gambling": 120.13327, "UK": 122.8329}, {"year": 2017, "Gambling": 110.26892, "UK": 128.70012}], 80, 160)
mychart('#figure_3_6', [{"year": 2010, "Sport": 100.0, "UK": 100.0}, {"year": 2011, "Sport": 104.97024, "UK": 102.70715}, {"year": 2012, "Sport": 112.06827, "UK": 105.96585}, {"year": 2013, "Sport": 106.35852, "UK": 110.04476}, {"year": 2014, "Sport": 110.73235, "UK": 115.13226}, {"year": 2015, "Sport": 124.41903, "UK": 118.35577}, {"year": 2016, "Sport": 132.97971, "UK": 122.8329}, {"year": 2017, "Sport": 140.03751, "UK": 128.70012}], 80, 160)
mychart('#figure_3_7', [{"year": 2010, "Telecoms": 100.0, "UK": 100.0}, {"year": 2011, "Telecoms": 102.85657, "UK": 102.70715}, {"year": 2012, "Telecoms": 105.10707, "UK": 105.96585}, {"year": 2013, "Telecoms": 113.44242, "UK": 110.04476}, {"year": 2014, "Telecoms": 121.25253, "UK": 115.13226}, {"year": 2015, "Telecoms": 122.71919, "UK": 118.35577}, {"year": 2016, "Telecoms": 127.00202, "UK": 122.8329}, {"year": 2017, "Telecoms": 131.55556, "UK": 128.70012}], 80, 160)
mychart('#figure_3_8', [{"year": 2010, "Tourism": 100.0, "UK": 100.0}, {"year": 2011, "Tourism": 109.75992, "UK": 102.70715}, {"year": 2012, "Tourism": 116.66938, "UK": 105.96585}, {"year": 2013, "Tourism": 120.03459, "UK": 110.04476}, {"year": 2014, "Tourism": 122.96556, "UK": 115.13226}, {"year": 2015, "Tourism": 138.40301, "UK": 118.35577}, {"year": 2016, "Tourism": 138.88466, "UK": 122.8329}, {"year": 2017, "Tourism": 137.65456, "UK": 128.70012}], 80, 160)
mychart('#figure_4_1', [{"year": 2010, "All DCMS sectors": 100.0, "UK": 100.0}, {"year": 2011, "All DCMS sectors": 106.8043, "UK": 102.70715}, {"year": 2012, "All DCMS sectors": 110.18382, "UK": 105.96585}, {"year": 2013, "All DCMS sectors": 115.15386, "UK": 110.04476}, {"year": 2014, "All DCMS sectors": 119.30598, "UK": 115.13226}, {"year": 2015, "All DCMS sectors": 128.14282, "UK": 118.35577}, {"year": 2016, "All DCMS sectors": 131.93763, "UK": 122.8329}, {"year": 2017, "All DCMS sectors": 136.40465, "UK": 128.70012}], 80, 160)
mychart('#figure_4_2', [{"year": 2010, "Civil Society (Non-market charities)": 100.0, "Creative Industries": 100.0, "Cultural Sector": 100.0, "Digital Sector": 100.0, "Gambling": 100.0, "Sport": 100.0, "Telecoms": 100.0, "Tourism": 100.0, "All DCMS sectors": 100.0, "UK": 100.0}, {"year": 2011, "Civil Society (Non-market charities)": 102.09322, "Creative Industries": 106.79102, "Cultural Sector": 104.23159, "Digital Sector": 105.7934, "Gambling": 110.5545, "Sport": 104.97024, "Telecoms": 102.85657, "Tourism": 109.75992, "All DCMS sectors": 106.8043, "UK": 102.70715}, {"year": 2012, "Civil Society (Non-market charities)": 93.27217, "Creative Industries": 112.08966, "Cultural Sector": 108.24526, "Digital Sector": 108.09461, "Gambling": 117.59876, "Sport": 112.06827, "Telecoms": 105.10707, "Tourism": 116.66938, "All DCMS sectors": 110.18382, "UK": 105.96585}, {"year": 2013, "Civil Society (Non-market charities)": 97.13698, "Creative Industries": 119.12788, "Cultural Sector": 112.61513, "Digital Sector": 113.45336, "Gambling": 118.62208, "Sport": 106.35852, "Telecoms": 113.44242, "Tourism": 120.03459, "All DCMS sectors": 115.15386, "UK": 110.04476}, {"year": 2014, "Civil Society (Non-market charities)": 109.73321, "Creative Industries": 127.26536, "Cultural Sector": 118.97411, "Digital Sector": 115.18618, "Gambling": 123.6197, "Sport": 110.73235, "Telecoms": 121.25253, "Tourism": 122.96556, "All DCMS sectors": 119.30598, "UK": 115.13226}, {"year": 2015, "Civil Society (Non-market charities)": 117.1992, "Creative Industries": 136.11023, "Cultural Sector": 126.91603, "Digital Sector": 117.09937, "Gambling": 122.44169, "Sport": 124.41903, "Telecoms": 122.71919, "Tourism": 138.40301, "All DCMS sectors": 128.14282, "UK": 118.35577}, {"year": 2016, "Civil Society (Non-market charities)": 128.90963, "Creative Industries": 142.92819, "Cultural Sector": 129.23997, "Digital Sector": 123.80158, "Gambling": 120.13327, "Sport": 132.97971, "Telecoms": 127.00202, "Tourism": 138.88466, "All DCMS sectors": 131.93763, "UK": 122.8329}, {"year": 2017, "Civil Society (Non-market charities)": 124.09894, "Creative Industries": 153.0547, "Cultural Sector": 138.52014, "Digital Sector": 132.89477, "Gambling": 110.26892, "Sport": 140.03751, "Telecoms": 131.55556, "Tourism": 137.65456, "All DCMS sectors": 136.40465, "UK": 128.70012}], 80, 160)



// civil society
d3.xml("https://raw.githubusercontent.com/DCMSstats/images/master/pound_chart.svg").mimeType("image/svg+xml").get(function(error, xml) {
   if (error) throw error;
   d3.select("#cs-pound").node().appendChild(xml.documentElement);
});
d3.xml("https://raw.githubusercontent.com/DCMSstats/images/master/up_arrow.svg").mimeType("image/svg+xml").get(function(error, xml) {
   if (error) throw error;
   d3.select("#cs-arrow").node().appendChild(xml.documentElement);
});


// creative industries
d3.xml("https://raw.githubusercontent.com/DCMSstats/images/master/pound_chart.svg").mimeType("image/svg+xml").get(function(error, xml) {
   if (error) throw error;
   d3.select("#ci-pound").node().appendChild(xml.documentElement);
});
d3.xml("https://raw.githubusercontent.com/DCMSstats/images/master/up_arrow.svg").mimeType("image/svg+xml").get(function(error, xml) {
   if (error) throw error;
   d3.select("#ci-arrow").node().appendChild(xml.documentElement);
});

// culture
d3.xml("https://raw.githubusercontent.com/DCMSstats/images/master/pound_chart.svg").mimeType("image/svg+xml").get(function(error, xml) {
   if (error) throw error;
   d3.select("#culture-pound").node().appendChild(xml.documentElement);
});
d3.xml("https://raw.githubusercontent.com/DCMSstats/images/master/up_arrow.svg").mimeType("image/svg+xml").get(function(error, xml) {
   if (error) throw error;
   d3.select("#culture-arrow").node().appendChild(xml.documentElement);
});


// digital
d3.xml("https://raw.githubusercontent.com/DCMSstats/images/master/pound_chart.svg").mimeType("image/svg+xml").get(function(error, xml) {
   if (error) throw error;
   d3.select("#digital-pound").node().appendChild(xml.documentElement);
});
d3.xml("https://raw.githubusercontent.com/DCMSstats/images/master/up_arrow.svg").mimeType("image/svg+xml").get(function(error, xml) {
   if (error) throw error;
   d3.select("#digital-arrow").node().appendChild(xml.documentElement);
});

// gambling
d3.xml("https://raw.githubusercontent.com/DCMSstats/images/master/pound_chart.svg").mimeType("image/svg+xml").get(function(error, xml) {
   if (error) throw error;
   d3.select("#gambling-pound").node().appendChild(xml.documentElement);
});
d3.xml("https://raw.githubusercontent.com/DCMSstats/images/master/up_arrow.svg").mimeType("image/svg+xml").get(function(error, xml) {
   if (error) throw error;
   d3.select("#gambling-arrow").node().appendChild(xml.documentElement);
});



// sport
d3.xml("https://raw.githubusercontent.com/DCMSstats/images/master/pound_chart.svg").mimeType("image/svg+xml").get(function(error, xml) {
   if (error) throw error;
   d3.select("#sport-pound").node().appendChild(xml.documentElement);
});
d3.xml("https://raw.githubusercontent.com/DCMSstats/images/master/up_arrow.svg").mimeType("image/svg+xml").get(function(error, xml) {
   if (error) throw error;
   d3.select("#sport-arrow").node().appendChild(xml.documentElement);
});


// telecoms
d3.xml("https://raw.githubusercontent.com/DCMSstats/images/master/pound_chart.svg").mimeType("image/svg+xml").get(function(error, xml) {
   if (error) throw error;
   d3.select("#telecoms-pound").node().appendChild(xml.documentElement);
});
d3.xml("https://raw.githubusercontent.com/DCMSstats/images/master/up_arrow.svg").mimeType("image/svg+xml").get(function(error, xml) {
   if (error) throw error;
   d3.select("#telecoms-arrow").node().appendChild(xml.documentElement);
});



// tourism
d3.xml("https://raw.githubusercontent.com/DCMSstats/images/master/pound_chart.svg").mimeType("image/svg+xml").get(function(error, xml) {
   if (error) throw error;
   d3.select("#tourism-pound").node().appendChild(xml.documentElement);
});
d3.xml("https://raw.githubusercontent.com/DCMSstats/images/master/up_arrow.svg").mimeType("image/svg+xml").get(function(error, xml) {
   if (error) throw error;
   d3.select("#tourism-arrow").node().appendChild(xml.documentElement);
});






// var play = d3.select("#path0").style("fill", "green");