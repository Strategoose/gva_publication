// get the reference for the body


//var body = document.getElementsByTagName("body")[0];
function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}



function make_html_tb(tbl_id, df) {

    // creates a <table> element and a <tbody> element
    var tbl = document.getElementById(tbl_id);
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
                    cell.appendChild(cellText);
            } else {
                    if (typeof(df['data'][i - 1][j]) == 'string' && df['data'][i - 1][j].charAt(0) == '<') {
                        var cell = htmlToElement('<td>' + df['data'][i - 1][j] + '</tf>');
                    } else {
                        var cell = document.createElement("td");
                        var cellText = document.createTextNode(df['data'][i - 1][j]);
                        cell.appendChild(cellText);
                    }
            }
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
}

make_html_tb("table_2_1", {{ tb_2_1 }});
make_html_tb("table_2_2", {{ tb_2_2 }});
make_html_tb("table_4_1", {{ tb_2_1 }});
make_html_tb("annex_b", {{ annex_b }});
