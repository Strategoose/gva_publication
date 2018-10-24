// get the reference for the body
df = {"columns":["sector",2010,2011,2012,2013,2014,2015,2016,2017,"% change 2015-2016","% change 2010-2016","% of UK GVA 2016"],"data":[["Civil Society (Non-market charities)",19.0,19.4,17.7,18.4,20.8,22.2,24.4,23.5,10.0,28.9,1.4],["Creative Industries",66.3,70.8,74.4,79.0,84.4,90.3,94.8,101.5,5.0,42.9,5.4],["Cultural Sector",21.3,22.2,23.0,24.0,25.3,27.0,27.5,29.5,1.8,29.2,1.6],["Digital Sector",98.2,103.9,106.1,111.4,113.1,115.0,121.5,130.5,5.7,23.8,6.9],["Gambling",8.4,9.3,9.9,10.0,10.4,10.3,10.1,9.3,-1.9,20.1,0.6],["Sport",7.0,7.4,7.9,7.5,7.8,8.7,9.3,9.8,6.9,33.0,0.5],["Telecoms",24.8,25.5,26.0,28.1,30.0,30.4,31.4,32.6,3.5,27.0,1.8],["Tourism",49.2,53.9,57.3,59.0,60.4,62.4,64.6,66.6,3.6,31.5,3.7],["All DCMS sectors",196.3,209.6,216.2,226.0,234.2,241.6,254.4,265.0,5.3,29.6,14.5],["UK",1429.6,1468.3,1514.9,1573.2,1646.0,1692.0,1756.0,1839.9,3.8,22.8,100.0]]}

//var body = document.getElementsByTagName("body")[0];

// creates a <table> element and a <tbody> element
var tbl = document.getElementById("table_2_1");
var tblBody = document.createElement("tbody");

// creating all cells
for (var i = 0; i < df['data'].length + 1; i++) {
    // creates a table row
    var row = document.createElement("tr");
    var colnames = df['columns']

    for (var j = 0; j < colnames.length; j++) {
        // Create a <td> element and a text node, make the text
        // node the contents of the <td>, and put the <td> at
        // the end of the table row
        var cell = document.createElement("td");
        if (i < 1) {
                var cellText = document.createTextNode(colnames[j]);
        } else {
                var cellText = document.createTextNode(df['data'][i - 1][j]);
        }
        cell.appendChild(cellText);
        row.appendChild(cell);
    }

    // add the row to the end of the table body
    tblBody.appendChild(row);
}

// put the <tbody> in the <table>
tbl.appendChild(tblBody);

// sets the border attribute of tbl to 2;
tbl.setAttribute("border", "2");