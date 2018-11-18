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

make_html_tb("table_2_1", {"columns":["sector",2010,2011,2012,2013,2014,2015,2016,2017,"% change 2015-2016","% change 2010-2016","% of UK GVA 2016"],"data":[["Civil Society (Non-market charities)",19.0,19.4,17.7,18.4,20.8,22.2,24.4,23.5,-3.7,23.7,1.3],["Creative Industries",66.3,70.8,74.4,79.0,84.4,90.3,94.8,101.5,7.1,53.1,5.5],["Cultural Sector",21.3,22.2,23.0,24.0,25.3,27.0,27.5,29.5,7.3,38.5,1.6],["Digital Sector",98.2,103.9,106.1,111.4,113.1,115.0,121.5,130.5,7.4,32.9,7.1],["Gambling",8.4,9.3,9.9,10.0,10.4,10.3,10.1,9.3,-7.9,10.7,0.5],["Sport",7.0,7.4,7.9,7.5,7.8,8.7,9.3,9.8,5.4,40.0,0.5],["Telecoms",24.8,25.5,26.0,28.1,30.0,30.4,31.4,32.6,3.8,31.5,1.8],["Tourism",49.2,53.9,57.3,59.0,60.4,68.0,68.3,67.7,-0.9,37.6,3.7],["All DCMS sectors (exc. Tourism)",147.1,155.7,158.9,167.0,173.8,183.5,190.6,200.0,4.9,36.0,10.9],["All DCMS sectors",196.3,209.6,216.2,226.0,234.2,251.5,258.9,267.7,3.4,36.4,14.5],["UK",1429.6,1468.3,1514.9,1573.2,1646.0,1692.0,1756.0,1839.9,4.8,28.7,100.0]]});
make_html_tb("table_2_2", );
make_html_tb("table_4_1", {"columns":["sector",2010,2011,2012,2013,2014,2015,2016,2017,"% change 2015-2016","% change 2010-2016","% of UK GVA 2016"],"data":[["Civil Society (Non-market charities)",19.0,19.4,17.7,18.4,20.8,22.2,24.4,23.5,-3.7,23.7,1.3],["Creative Industries",66.3,70.8,74.4,79.0,84.4,90.3,94.8,101.5,7.1,53.1,5.5],["Cultural Sector",21.3,22.2,23.0,24.0,25.3,27.0,27.5,29.5,7.3,38.5,1.6],["Digital Sector",98.2,103.9,106.1,111.4,113.1,115.0,121.5,130.5,7.4,32.9,7.1],["Gambling",8.4,9.3,9.9,10.0,10.4,10.3,10.1,9.3,-7.9,10.7,0.5],["Sport",7.0,7.4,7.9,7.5,7.8,8.7,9.3,9.8,5.4,40.0,0.5],["Telecoms",24.8,25.5,26.0,28.1,30.0,30.4,31.4,32.6,3.8,31.5,1.8],["Tourism",49.2,53.9,57.3,59.0,60.4,68.0,68.3,67.7,-0.9,37.6,3.7],["All DCMS sectors (exc. Tourism)",147.1,155.7,158.9,167.0,173.8,183.5,190.6,200.0,4.9,36.0,10.9],["All DCMS sectors",196.3,209.6,216.2,226.0,234.2,251.5,258.9,267.7,3.4,36.4,14.5],["UK",1429.6,1468.3,1514.9,1573.2,1646.0,1692.0,1756.0,1839.9,4.8,28.7,100.0]]});
make_html_tb("annex_b", );