  
    //{{ gva_current_extended_json }},
chartdata = {{ fig_2_1 }}
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
mychart('#figure_2_1', {{ fig_2_1 }}, 80, 160)
mychart('#figure_3_1', {{ fig_3_1 }}, 80, 160)
mychart('#figure_3_2', {{ fig_3_2 }}, 80, 160)
mychart('#figure_3_3', {{ fig_3_3 }}, 80, 160)
mychart('#figure_3_4', {{ fig_3_4 }}, 80, 160)
mychart('#figure_3_5', {{ fig_3_5 }}, 80, 160)
mychart('#figure_3_6', {{ fig_3_6 }}, 80, 160)
mychart('#figure_3_7', {{ fig_3_7 }}, 80, 160)
mychart('#figure_3_8', {{ fig_3_8 }}, 80, 160)
mychart('#figure_4_1', {{ fig_4_1 }}, 80, 160)
mychart('#figure_4_2', {{ fig_4_2 }}, 80, 160)



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