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
                if (6 == 6) {
                    var cell = htmlToElement('<th>' + colnames[j] + '</th>');
                } else {
                    var cell = document.createElement("th");
                    var cellText = document.createTextNode(colnames[j]);
                    cell.appendChild(cellText);
                }
            } else {
                    if (typeof(df['data'][i - 1][j]) == 'string' && df['data'][i - 1][j].charAt(0) == '<') {
                        var cell = htmlToElement('<td>' + df['data'][i - 1][j] + '</td>');
                    } else {
                        var cell = document.createElement("td");
                        var myval = df['data'][i - 1][j]
                        if (myval == null) myval = '';
                        try {
                            myval = myval.toLocaleString('en', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
                          }
                          catch(err) {
                          }
                        var cellText = document.createTextNode(myval);
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

make_html_tb("table_2_1", {"columns":["index","<p>2010<sup>(r)<\/sup><\/p>","<p>2011<sup>(r)<\/sup><\/p>","<p>2012<sup>(r)<\/sup><\/p>","<p>2013<sup>(r)<\/sup><\/p>","<p>2014<sup>(r)<\/sup><\/p>","<p>2015<sup>(r)<\/sup><\/p>","<p>2016<sup>(r)<\/sup><\/p>","<p>2017<sup>(p)1<\/sup><\/p>","% change 2016-2017","% change 2010-2017","% of UK GVA 2016"],"data":[["<p>Civil Society (Non-market charities)<sup>2<\/sup><\/p>",19.0,19.4,17.7,18.4,20.8,22.2,24.4,23.5,-3.7,23.7,1.3],["Creative Industries",66.3,70.8,74.4,79.0,84.4,90.3,94.8,101.5,7.1,53.1,5.5],["Cultural Sector",21.3,22.2,23.0,24.0,25.3,27.0,27.5,29.5,7.3,38.5,1.6],["Digital Sector",98.2,103.9,106.1,111.4,113.1,115.0,121.5,130.5,7.4,32.9,7.1],["Gambling",8.4,9.3,9.9,10.0,10.4,10.3,10.1,9.3,-7.9,10.7,0.5],["Sport",7.0,7.4,7.9,7.5,7.8,8.7,9.3,9.8,5.4,40.0,0.5],["Telecoms",24.8,25.5,26.0,28.1,30.0,30.4,31.4,32.6,3.8,31.5,1.8],["<p>Tourism<sup>7<\/sup><\/p>",49.2,53.9,57.3,59.0,60.4,68.0,68.3,67.7,-0.9,37.6,3.7],["All DCMS sectors (exc. Tourism)",147.1,155.7,158.9,167.0,173.7,183.5,190.7,200.1,4.9,36.0,10.9],["<p>All DCMS sectors<sup>7<\/sup><\/p>",196.3,209.6,216.2,226.0,234.2,251.5,258.9,267.7,3.4,36.4,14.5],["UK",1429.6,1468.3,1514.9,1573.2,1646.0,1692.0,1756.0,1839.9,4.8,28.7,100.0]]});
make_html_tb("table_2_2", {"columns":["Sector 1","Sector 2","Sector 3","Sector 4","GVA overlap (\u00a3bn)","% of DCMS total","% of UK total"],"data":[["Creative Industries","Digital Sector","Cultural Sector"," ",17.9,6.7,1.0],["Creative Industries","Cultural Sector"," "," ",10.1,3.8,0.5],["Creative Industries","Digital Sector"," "," ",52.2,19.5,2.8],["Digital Sector","Telecoms"," "," ",32.6,12.2,1.8],["Tourism","Cultural Sector","Creative Industries","Civil Society ",1.8,0.7,0.1],["Tourism","Cultural Sector","Creative Industries"," ",0.3,0.1,0.0],["Tourism","Cultural Sector"," "," ",0.3,0.1,0.0],["Tourism","Sport"," "," ",0.4,0.2,0.0],["Tourism","Gambling"," "," ",1.8,0.7,0.1]]});
make_html_tb("table_4_1", {"columns":["index","<p>2010<sup>(r)<\/sup><\/p>","<p>2011<sup>(r)<\/sup><\/p>","<p>2012<sup>(r)<\/sup><\/p>","<p>2013<sup>(r)<\/sup><\/p>","<p>2014<sup>(r)<\/sup><\/p>","<p>2015<sup>(r)<\/sup><\/p>","<p>2016<sup>(r)<\/sup><\/p>","<p>2017<sup>(p)1<\/sup><\/p>","% change 2016 - 2017","% change 2010 - 2017","% of UK GVA 2017"],"data":[["Creative Industries",73.0,75.9,78.7,81.8,86.1,91.1,94.8,99.0,4.5,35.7,5.5],["Cultural Sector",23.8,24.1,24.7,25.0,26.1,27.5,27.5,28.9,4.9,21.4,1.6],["Digital Sector",105.7,109.4,110.9,114.4,115.0,116.5,121.5,127.2,4.6,20.3,7.1],["Gambling",10.1,10.7,11.1,10.8,11.0,10.6,10.1,9.1,-9.6,-9.8,0.5],["Sport",8.3,8.5,8.9,7.7,7.9,8.8,9.3,9.6,3.1,15.5,0.5],["Telecoms",25.4,26.1,26.6,28.6,30.6,31.3,31.4,32.0,1.7,25.9,1.8],["<p>Tourism<sup>7<\/sup><\/p>",53.0,56.1,58.7,59.6,59.1,64.3,63.3,61.6,-2.7,null,3.4],["All DCMS sectors (excl Tourism)",144.7,150.6,154.0,157.8,161.5,166.6,172.3,178.2,3.4,23.2,9.9],["<p>All DCMS sectors<sup>2<\/sup><\/p>",197.6,206.7,212.7,217.4,220.6,231.0,235.6,239.8,1.8,null,13.4],["UK",1560.6,1583.3,1603.0,1626.2,1680.7,1723.5,1756.0,1796.3,2.3,15.1,100.0]]});
make_html_tb("annex_b", {"columns":["Sector","Sub-sector","Organisation","Summary of use"],"data":[["Civil Society","Civil Society","<a href=\"https:\/\/www.ons.gov.uk\/economy\/nationalaccounts\/satelliteaccounts\/articles\/householdsatelliteaccounts\/2015and2016estimates\">ONS<\/a>","ONS publish a household satellite account which includes an estimate for volunteering for 2015 and 2016. This is based on the DCMS Community Life Survey and multiplying participation by the median earnings. This is a similar methodology used by DCMS to estimate the impact of volunteering on the economy. However these figures should not be included in the GVA figure for the economy due to volunteering being part of the informal economy, and therefore not captured in the ONS's methodology for calculating GVA."],["Creative Industries\nCultural Sector\n","Arts","<a href=\"https:\/\/www.artscouncil.org.uk\/sites\/default\/files\/download-file\/Contribution_arts_culture_industry_UK_economy.pdf\">Arts Council England (ACE)<\/a>","ACE provides a value of GVA and employment accountable by the Arts and Culture industry. They use similar SIC codes to DCMS' Economic Estimates, but rather than using the supply and use tables and then the Annual Business Survey to inform the proportions to use, ACE use only the Annual Business Survey and therefore an approximate measure of GVA. Employment is based on Business Register and Employment Survey which is a business survey and an official statistic. However it only covers employed jobs. This is different to DCMS' approach using the Annual Population Survey where employed and self-employed jobs are included, but it is a social survey and therefore relies on the household individual defining their sector of work, which can be a limitation to this approach."],["Creative Industries and Cultural Sector","Film, TV, video, radio and photography\nIT, software and computer services\n","<a href=\"https:\/\/www.bfi.org.uk\/sites\/bfi.org.uk\/files\/downloads\/screen-business-full-report-2018-10-08.pdf\">British Film Institute (BFI)<\/a>","BFI provides a value of GVA and FTE employment accountable by the Screen sector. The analysis uses a bespoke economic impact model developed for this study, reflecting current best practice in economic impact modelling, aligning the study with current government evaluation methodology (HM Treasury Green Book 2018). The estimates of FTE labour compensation and GVA generated by film and HETV production have been updated through the application of a separate \u2018Job Creation Model\u2019 commissioned by the BFI, and to be published Autumn 2018. This is a different methodology to DCMS' estimates."],["Creative Industries\nCultural Sector\n","Museums, Galleries and Libraries\nMuseums and Galleries\n","<a href=\"https:\/\/www.artscouncil.org.uk\/sites\/default\/files\/download-file\/Economic_Impact_of_Museums_in_England_report.pdf\">Arts Council England (ACE)<\/a>","ACE have commissioned a report which looks at the economic impact of museums in England in 2013. This methodology varies greatly to DCMS Sector Economic Estimates. The definiton of museums is much wider than is used in DCMS' estimates which is based on one SIC code. ACE have identified the limitations with using SIC codes for museums, namely that to be included in the official statistical surveys, the museum needs to be registered for PAYE or VAT, which means some of the small museums would not be included in these official sources. The same applies to local authority delivered museum services which would be coded under the Public Administration SIC code. As a result ACE have used a bottom-up approach of developing a database of museums in England then using various sources to identify the economic measures for each museum. This is for England and was produced in 2013."],["Cultural Sector","Heritage","<a href=\"https:\/\/historicengland.org.uk\/research\/heritage-counts\/heritage-and-economy\/\">Historic England<\/a>","Historic England provides a value of GVA and employment accountable by the Heritage sector. Historic England use a satellite account approach to measure the heritage sector. Satellite accounts measure a sector by aggregating shares of other SICs, estimated using additional information. They can serve several purposes, eg monitoring progress under specific policy theme. While potentially useful, the quality of the data depends on that of the evidence used to estimate the appropriate share of existing SICs. These figures are useful in building the sectoral narrative, and in advocacy work (eg in speeches, alongside our sector estimates). However the scope of the industries included is much wider than for DCMS' estimates."],["Gambling","Gambling","<a href=\"https:\/\/www.gamblingcommission.gov.uk\/news-action-and-statistics\/Statistics-and-research\/Statistics\/Industry-statistics.aspx\">Gambling Commission<\/a> ","Gambling Commission produce industry statistics twice a year covering gross gambling yield, employment and number of businesses. The methods are different to DCMS' Economic Estimates to reflect the different data sources available to the Gambling Commission and their policy needs. The Gambling Commission derive their estimates from the operators. It is a license requirement for operators to submit returns, so essentially a census is being carried here. This has benefits over using a sample survey like DCMS use. DCMS are only using SIC 92 to define Gambling; however it is likely that there will be companies outside of SIC 92 included in the Gambling Commission statistics. For example, some working men's clubs may hold a license but would not be classified under SIC 92 by virtue of their other primary activities. Finally, Gambling Commission do not produce an estimate of GVA; instead GGY. This is because this measure is understood by the sector as a whole and is internationally comparable. This means Gambling Commission can compare historically and internationally, but it does mean it is not comparable against other sectors."],["Sport","Sport","<a href=\"https:\/\/www.sportengland.org\/research\/benefits-of-sport\/economic-value-of-sport\/\">Sport England<\/a>","Sport England produce an estimate of the GVA and number of FTE jobs generated by sport and sport-related activity. This has not been updated since 2013 and covers England only. GVA is split by participation and consumption. The definition is wider than DCMS currently uses in its narrow definition, but is similar to the sport satellite account approach which uses the vilnius definition. This means elements such as sport broadcasting are included. While potentially useful, the quality of the data depends on that of the evidence used to estimate the appropriate share of existing SICs."],["Sport","Sport","<a href=\"https:\/\/www.uksport.gov.uk\/news\/2017\/11\/09\/olympic-and-paralympic-sports-worth-19bn-to-uk-economy\">UK Sport<\/a>","UK Sport have produced estimates of the contribution of the Olympic and Paralympic sports. Whilst this is not fully comparable with DCMS' estimates due to its much narrower scope in terms of sports, it uses a similar methodology to the DCMS Sport satellite account. Please note that this Sport satellite account is not currently part of the DCMS Sector Economic Estimates so there will be further differences in methodology and scope of industries. UK Sport use a satellite account approach for a portfolio of sports. They produce a GVA and employment estimates, using a range of sources: ABS\/ASHE, 2014 Input-Output tables, Participation data and company accounts. Whilst these are not the exact same data sources as DCMS uses, or the most up to date, they do enable a comparison to DCMS statistics. They are therefore a robust estimate if the user are looking for specific Olympic and Paralympic sports. However, as with all satellite accounts, the quality of the data depends on that of the evidence used to estimate the appropriate share of existing SICs."],["Tourism","Tourism","<a href=\"https:\/\/www.visitbritain.org\/sites\/default\/files\/vb-corporate\/Documents-Library\/documents\/Tourism_Jobs_and_Growth_2013.pdf\">VisitBritain<\/a>","VisitBritain have commissioned a report to value the number of jobs and economic contribution in the Tourism industry. This is based on a bespoke model, but the direct tourism industry figures have consistency with the Tourism Satellite Account methodology, which DCMS uses for its Tourism estimates in the DCMS Sector Economic Estimates. It is based on 2008 to 2011, so is more outdated than DCMS estimates."]]});