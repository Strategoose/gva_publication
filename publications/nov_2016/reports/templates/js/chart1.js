  
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
      x: {
          // type: 'timeseries',
          // tick: {
          //     format: function (x) {
          //         return x.getFullYear();
          //     }
          // }
      }
  }
});