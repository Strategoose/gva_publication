// get the reference for the body
df = {{ gva_current_extended_json }}

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