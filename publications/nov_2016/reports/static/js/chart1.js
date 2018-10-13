//var totals_ts_data = 

// Assign the specification to a local variable vlSpec.
var vlSpec =
{
  "$schema": "https://vega.github.io/schema/vega-lite/v2.json",
  "data": {
    "values": [{"symbol":"All DCMS sectors","date":1262304000000,"price":100.0},{"symbol":"All DCMS sectors","date":1293840000000,"price":106.5},{"symbol":"All DCMS sectors","date":1325376000000,"price":108.9},{"symbol":"All DCMS sectors","date":1356998400000,"price":114.6},{"symbol":"All DCMS sectors","date":1388534400000,"price":118.1},{"symbol":"All DCMS sectors","date":1420070400000,"price":124.5},{"symbol":"All DCMS sectors","date":1451606400000,"price":129.0},{"symbol":"UK","date":1262304000000,"price":100.0},{"symbol":"UK","date":1293840000000,"price":102.6},{"symbol":"UK","date":1325376000000,"price":105.9},{"symbol":"UK","date":1356998400000,"price":110.0},{"symbol":"UK","date":1388534400000,"price":115.2},{"symbol":"UK","date":1420070400000,"price":118.5},{"symbol":"UK","date":1451606400000,"price":122.7}]
  },
  "width": 450,
  "height": 250,
  "layer": [
    {
      "encoding": {
        "x": {
          "field": "date", "type": "temporal",
          "axis": {
            "title": null,
            "labelAngle": 0,
            "ticks": false,
            "grid": false,
            "domain": false,
            "titleFontSize": 16,
            "labelFontSize": 16,
            "offset": 15
          },
          "scale": { "domain": [1252304000000, 1451606400000] }
        },
        "y": {
          "field": "price", "type": "quantitative", 
          "axis": { "title": "GVA, Index: 2010=100", "ticks": false, "domain": false, "titleFontSize": 16, "labelFontSize": 16, "offset": 5, "titlePadding": 10},
          "scale": { "domain": [90, 140] }
        },
        "color": { "field": "symbol", "type": "nominal", "legend": { "title": null, "labelFontSize": 16, "symbolType": "M0,0 L2,0", "columnPadding": 100, "padding": 20 } }
      },
      "layer": [{
        "mark": "line"
      }, {
        "selection": {
          "tooltip": {
            "type": "single",
            "nearest": true,
            "on": "mouseover",
            "encodings": [
              "x"
            ],
            "empty": "none"
          }
        },
        "mark": "point",
        "encoding": {
          "opacity": {
            "condition": {
              "selection": "tooltip",
              "value": 1
            },
            "value": 0
          }
        }
      }]
    },
    {
      "transform": [
        {
          "filter": {
            "selection": "tooltip"
          }
        }
      ],
      "layer": [{
        "mark": {
          "type": "rule",
          "color": "gray"
        },
        "encoding": {
          "x": {
            "type": "temporal",
            "field": "date"
          }
        }
      }, {
        "mark": {
          "type": "text",
          "align": "left",
          "dx": 5,
          "dy": -5,
          "fontSize": 16
        },
        "encoding": {
          "text": {
            "type": "quantitative",
            "field": "price"
          },
          "color": {
            "type": "nominal",
            "field": "symbol",
            "legend": { "title": null }
          },
          "x": {
            "type": "temporal",
            "field": "date"
          },
          "y": {
            "type": "quantitative",
            "field": "price"
          }
        }
      }]
    }
  ],
  "config": {
    "style": {
      "cell": {
        "stroke": "transparent"
      }
    }
  }
};

// Embed the visualization in the container with id `vis`
vegaEmbed("#figure_2_1", vlSpec, opt = { "actions": false, "renderer": "svg" });