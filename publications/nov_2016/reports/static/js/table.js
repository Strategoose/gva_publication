// get the reference for the body
df = {"columns":["sector",2010,2011,2012,2013,2014,2015,2016,"% change 2015-2016","% change 2010-2016","% of UK GVA 2016"],"data":[["Civil Society (Non-market charities)",19.3,19.6,16.1,18.7,19.8,21.3,20.9,-1.7,8.7,1.2],["Creative Industries",63.4,67.2,70.7,74.9,80.0,85.3,91.8,7.6,44.8,5.3],["Cultural Sector",21.1,21.7,22.6,23.3,24.5,25.6,26.8,4.4,27.1,1.5],["Digital Sector",94.5,99.6,101.7,106.8,108.4,110.2,116.5,5.8,23.3,6.7],["Gambling",8.4,9.3,9.9,10.0,10.4,11.1,10.6,-3.7,26.7,0.6],["Sport",7.0,7.4,7.9,7.5,7.8,8.6,9.0,4.9,28.6,0.5],["Telecoms",24.7,25.5,26.0,28.1,30.0,30.4,30.0,-1.4,21.1,1.7],["Tourism",49.2,53.9,57.3,59.0,60.4,64.6,66.1,2.2,34.4,3.8],["All DCMS sectors",192.7,205.2,209.9,220.8,227.5,239.8,248.5,3.6,29.0,14.2],["UK",1422.0,1458.8,1505.7,1564.4,1638.7,1684.9,1744.4,3.5,22.7,100.0]]}

//var body = document.getElementsByTagName("body")[0];

// creates a <table> element and a <tbody> element
var tbl = document.getElementById("table_2_1");
var tblHead = document.createElement("thead");
var tblBody = document.createElement("tbody");
var tblFoot = document.createElement("tfoot")

// creating all cells
for (var i = 0; i < df['data'].length + 1; i++) {
    // creates a table row
    var row = document.createElement("tr");
    var colnames = df['columns']

    for (var j = 0; j < colnames.length; j++) {
        // Create a <td> element and a text node, make the text
        // node the contents of the <td>, and put the <td> at
        // the end of the table row
        if (i < 1) {
                var cell = document.createElement("th");
                var cellText = document.createTextNode(colnames[j]);
        } else {
                var cell = document.createElement("td");
                var cellText = document.createTextNode(df['data'][i - 1][j]);
        }
        cell.appendChild(cellText);
        cell.classList.add("dt-center");
        row.appendChild(cell);
    }

    // add the row to the end of the table body
    if (i < 1) {
        tblHead.appendChild(row);
    } else if (i < 9) {
        tblBody.appendChild(row);
    } else {
        tblFoot.appendChild(row)
    }
}

// put the <thead> and <tbody> in the <table>
tbl.appendChild(tblHead);
tbl.appendChild(tblBody);
tbl.appendChild(tblFoot);

// sets the border attribute of tbl to 2;
// tbl.setAttribute("border", "2");