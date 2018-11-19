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

make_html_tb("table_2_1", {"columns":["sector",2010,2011,2012,2013,2014,2015,2016,2017,"% change 2016-2017","% change 2010-2017","% of UK GVA 2016"],"data":[["Civil Society (Non-market charities)",19.0,19.4,17.7,18.4,20.8,22.2,24.4,23.5,-3.7,23.7,1.3],["Creative Industries",66.3,70.8,74.4,79.0,84.4,90.3,94.8,101.5,7.1,53.1,5.5],["Cultural Sector",21.3,22.2,23.0,24.0,25.3,27.0,27.5,29.5,7.3,38.5,1.6],["Digital Sector",98.2,103.9,106.1,111.4,113.1,115.0,121.5,130.5,7.4,32.9,7.1],["Gambling",8.4,9.3,9.9,10.0,10.4,10.3,10.1,9.3,-7.9,10.7,0.5],["Sport",7.0,7.4,7.9,7.5,7.8,8.7,9.3,9.8,5.4,40.0,0.5],["Telecoms",24.8,25.5,26.0,28.1,30.0,30.4,31.4,32.6,3.8,31.5,1.8],["Tourism",49.2,53.9,57.3,59.0,60.4,68.0,68.3,67.7,-0.9,37.6,3.7],["All DCMS sectors (exc. Tourism)",147.1,155.7,158.9,167.0,173.8,183.5,190.6,200.0,4.9,36.0,10.9],["All DCMS sectors",196.3,209.6,216.2,226.0,234.2,251.5,258.9,267.7,3.4,36.4,14.5],["UK",1429.6,1468.3,1514.9,1573.2,1646.0,1692.0,1756.0,1839.9,4.8,28.7,100.0]]});
make_html_tb("table_2_2", {"columns":["Sector 1","Sector 2","Sector 3","Sector 4","GVA overlap (\u00a3bn)","% of DCMS total","% of UK total"],"data":[["Creative Industries","Digital Sector","Cultural Sector",null,17.929,0.0669717431,0.0097444242],["Creative Industries","Cultural Sector",null,null,10.077,0.0376414889,0.0054768567],["Creative Industries","Digital Sector",null,null,52.153,0.1948116079,0.0283451925],["Digital Sector","Telecoms",null,null,32.559,0.1216204464,0.0176958396],["Tourism","Cultural Sector","Creative Industries","Civil Society ",1.8246840319,0.0068158999,0.0009917171],["Tourism","Cultural Sector","Creative Industries",null,0.2777674397,0.0010375687,0.0001509668],["Tourism","Cultural Sector",null,null,0.2959391414,0.001105447,0.0001608431],["Tourism","Sport",null,null,0.44565,0.001664675,0.0002422111],["Tourism","Gambling",null,null,1.79479,0.0067042342,0.0009754696]]});
make_html_tb("table_4_1", {"columns":["sector",2010,2011,2012,2013,2014,2015,2016,2017,"% change 2016-2017","% change 2010-2017","% of UK GVA 2016"],"data":[["Civil Society (Non-market charities)",19.0,19.4,17.7,18.4,20.8,22.2,24.4,23.5,-3.7,23.7,1.3],["Creative Industries",66.3,70.8,74.4,79.0,84.4,90.3,94.8,101.5,7.1,53.1,5.5],["Cultural Sector",21.3,22.2,23.0,24.0,25.3,27.0,27.5,29.5,7.3,38.5,1.6],["Digital Sector",98.2,103.9,106.1,111.4,113.1,115.0,121.5,130.5,7.4,32.9,7.1],["Gambling",8.4,9.3,9.9,10.0,10.4,10.3,10.1,9.3,-7.9,10.7,0.5],["Sport",7.0,7.4,7.9,7.5,7.8,8.7,9.3,9.8,5.4,40.0,0.5],["Telecoms",24.8,25.5,26.0,28.1,30.0,30.4,31.4,32.6,3.8,31.5,1.8],["Tourism",49.2,53.9,57.3,59.0,60.4,68.0,68.3,67.7,-0.9,37.6,3.7],["All DCMS sectors (exc. Tourism)",147.1,155.7,158.9,167.0,173.8,183.5,190.6,200.0,4.9,36.0,10.9],["All DCMS sectors",196.3,209.6,216.2,226.0,234.2,251.5,258.9,267.7,3.4,36.4,14.5],["UK",1429.6,1468.3,1514.9,1573.2,1646.0,1692.0,1756.0,1839.9,4.8,28.7,100.0]]});
make_html_tb("annex_b", {"columns":["Sector","Sub-sector","Organisation","Summary of use"],"data":[["Civil Society","Civil Society","<a href=\"https:\/\/www.ons.gov.uk\/economy\/nationalaccounts\/satelliteaccounts\/articles\/householdsatelliteaccounts\/2015and2016estimates\">ONS<\/a>","ONS publish a household satellite account which includes an estimate for volunteering for 2015 and 2016. This is based on the DCMS Community Life Survey and multiplying participation by the median earnings. This is a similar methodology used by DCMS to estimate the impact of volunteering on the economy. However these figures should not be included in the GVA figure for the economy due to volunteering being part of the informal economy, and therefore not captured in the ONS's methodology for calculating GVA."],["Creative Industries\nCultural Sector\n","Arts","Arts Council England","Provides a value of GVA and employment accountable by the Arts and Culture industry. They use similar SIC codes to DCMS' Economic Estimates, but rather than using the supply and use tables and then the Annual Business Survey to inform the proportions to use, ACE use only the Annual Business Survey and therefore an approximate measure of GVA. Employment is based on Business Register and Employment Survey which is a business survey and an official statistic. However it only covers employed jobs. This is different to DCMS' approach using the Annual Population Survey where employed and self-employed jobs are included, but it is a social survey and therefore relies on the household individual defining their sector of work, which can be a limitation to this approach."],["Creative Industries and Cultural Sector","Film, TV, video, radio and photography\nIT, software and computer services\n","British Film Institute","Provides a value of GVA and FTE employment accountable by the Screen sector. The analysis uses a bespoke economic impact model developed for this study, reflecting current best practice in economic impact modelling, aligning the study with current government evaluation methodology (HM Treasury Green Book 2018). The estimates of FTE labour compensation and GVA generated by film and HETV production have been updated through the application of a separate \u2018Job Creation Model\u2019 commissioned by the BFI, and to be published Autumn 2018. This is a different methodology to DCMS' estimates."],["Creative Industries\nCultural Sector\n","Museums, Galleries and Libraries\nMuseums and Galleries\n","Arts Council England","Arts Council England have commissioned a report which looks at the economic impact of museums in England in 2013. This methodology varies greatly to DCMS Sector Economic Estimates. The definiton of museums is much wider than is used in DCMS' estimates which is based on one SIC code. ACE have identified the limitations with using SIC codes for museums, namely that to be included in the official statistical surveys, the museum needs to be registered for PAYE or VAT, which means some of the small museums would not be included in these official sources. The same applies to local authority delivered museum services which would be coded under the Public Administration SIC code. As a result ACE have used a bottom-up approach of developing a database of museums in England then using various sources to identify the economic measures for each museum. This is for England and was produced in 2013."],["Cultural Sector","Heritage","Historic England","Provides a value of GVA and employment accountable by the Heritage sector. Historic England use a satellite account approach to measure the heritage sector. Satellite accounts measure a sector by aggregating shares of other SICs, estimated using additional information. They can serve several purposes, eg monitoring progress under specific policy theme. While potentially useful, the quality of the data depends on that of the evidence used to estimate the appropriate share of existing SICs. These figures are useful in building the sectoral narrative, and in advocacy work (eg in speeches, alongside our sector estimates). However the scope of the industries included is much wider than for DCMS' estimates."],["Gambling","Gambling","Gambling Commission","Gambling Commission produce industry statistics twice a year covering gross gambling yield, employment and number of businesses. The methods are different to DCMS' Economic Estimates to reflect the different data sources available to the Gambling Commission and their policy needs. The Gambling Commission derive their estimates from the operators. It is a license requirement for operators to submit returns, so essentially a census is being carried here. This has benefits over using a sample survey like DCMS use. DCMS are only using SIC 92 to define Gambling; however it is likely that there will be companies outside of SIC 92 included in the Gambling Commission statistics. For example, some working men's clubs may hold a license but would not be classified under SIC 92 by virtue of their other primary activities. Finally, Gambling Commission do not produce an estimate of GVA; instead GGY. This is because this measure is understood by the sector as a whole and is internationally comparable. This means Gambling Commission can compare historically and internationally, but it does mean it is not comparable against other sectors."],["Sport","Sport","Sport England","Sport England produce an estimate of the GVA and number of FTE jobs generated by sport and sport-related activity. This has not been updated since 2013 and covers England only. GVA is split by participation and consumption. The definition is wider than DCMS currently uses in its narrow definition, but is similar to the sport satellite account approach which uses the vilnius definition. This means elements such as sport broadcasting are included. While potentially useful, the quality of the data depends on that of the evidence used to estimate the appropriate share of existing SICs."],["Sport","Sport","UK Sport","UK Sport have produced estimates of the contribution of the Olympic and Paralympic sports. Whilst this is not fully comparable with DCMS' estimates due to its much narrower scope in terms of sports, it uses a similar methodology to the DCMS Sport satellite account. Please note that this Sport satellite account is not currently part of the DCMS Sector Economic Estimates so there will be further differences in methodology and scope of industries. UK Sport use a satellite account approach for a portfolio of sports. They produce a GVA and employment estimates, using a range of sources: ABS\/ASHE, 2014 Input-Output tables, Participation data and company accounts. Whilst these are not the exact same data sources as DCMS uses, or the most up to date, they do enable a comparison to DCMS statistics. They are therefore a robust estimate if the user are looking for specific Olympic and Paralympic sports. However, as with all satellite accounts, the quality of the data depends on that of the evidence used to estimate the appropriate share of existing SICs."],["Tourism","Tourism","Visit Britain","Visit Britain have commissioned a report to value the number of jobs and economic contribution in the Tourism industry. This is based on a bespoke model, but the direct tourism industry figures have consistency with the Tourism Satellite Account methodology, which DCMS uses for its Tourism estimates in the DCMS Sector Economic Estimates. It is based on 2008 to 2011, so is more outdated than DCMS estimates."]]});