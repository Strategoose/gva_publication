  
    //{{ gva_current_extended_json }},
chartdata = {{ gva_current_json }}
seriesnames = Object.keys(chartdata[0]).slice(1,-1)

var chart = c3.generate({
  bindto: '#figure_2_1',
  data: {
      json: {{ gva_current_json }},
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