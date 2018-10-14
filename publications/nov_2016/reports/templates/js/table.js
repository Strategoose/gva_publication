// get the reference for the body
df = {{ gva_current_extended_json }}

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