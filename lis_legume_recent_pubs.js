/*
JS functions for the lis_legume_recent_pubs module
*/

/*
 *Sudhansu Dash
 *Mar-01-2016
 *
 */

/* TODO:
 *Handle truncated list for display
 *but try pubmed url with whole list (@Think about this)
 *
 */




function makeHtmlFromEsummaryJson(esummaryJson) {  //NOT DONE YET winProgress
    //Given a jsonObj from eSummary, generates html <li> for display of Docsummary
    //The jsonOBj could be for one or multiple eSummaries
    // jsonObj passed from jQuery.get(url, f())

    //USAGE:
    //domElementIdHtml += makeHtmlFromEsummaryJson(esummaryJson);
    
    
    //TO DO  Take code from getDocSumAttributesFromJson (id)
    var esummaryResult = esummaryJson.result;  //main json obj containing uids list and summary for each uid
    var uidsList = esummaryResult.uids;  // array of all uids in the jsonObj from eSummary
      //(.result.uids is from the ncbi esummary json)
      //console.log("uidsList: " + uidsList.join()); //debug
    
    citation_html ="";
    
    uidsList.forEach(function(uid) {
        //Go through each uid and extract the attributes to make html
        //console.log("for-each: " + uid); //debug
        
        var authors = [];
        esummaryResult[uid]['authors'].forEach(function(author){
           authors.push([author.name]); 
        })  // forEach author
        //console.log("AUTTHORS: " + authors);  //debug
            
        var authorFirst = esummaryResult[uid]['authors'][0]['name'];
        var title = esummaryResult[uid]['title']; //console.log(title);
        var pubdate = esummaryResult[uid]['pubdate'];
        var year = pubdate.match(/^\d\d\d\d/);
        
        var issue = (esummaryResult[uid]['issue']);
        issue = (issue) ? "(" + issue + ")":""; //null if no issue else with parenthesis (issue)
        
        var pages = esummaryResult[uid]['pages'];
        var sortfirstauthor = esummaryResult[uid]['sortfirstauthor'];
        var source = esummaryResult[uid]['source']; //console.log(source);
        var volume = esummaryResult[uid]['volume']; //console.log(volume);
        
        var linkToUid = "<a href=\"http://www.ncbi.nlm.nih.gov/pubmed/" + uid + "\"" + "  target=\"_blank\">" + title + "</a>";
        
        var citation = (authors.join(", ") + ". " + "<b>" + year + "</b>" + ". " + linkToUid + " " + "<strong>" + source + " " + volume +  issue + ":" + pages + "</strong>" + "." + " (" + uid + ")");
        var citation_li = "<li>" + citation + "</li><br/>"; // + "\n\n";
        //Creates like:
        //Dash S, Campbell JD, Cannon EK, Cleary AM, ......, Farmer AD, Cannon SB. 2016. Legume information system (LegumeInfo.org): a key component of a set of federated data resources for the legume family. Nucleic Acids Res 44(D1):D1181-8. (<a href="http://www.ncbi.nlm.nih.gov/pubmed/26546515"  target="_blank">26546515</a>)
        //console.log("citation_li: " + citation_li); //debug
        citation_html += citation_li; 
        
    })  //uidsList.forEach
    
    //console.log("citation_html: " + citation_html); //debug
    return citation_html; // Returns XMLHttpRequest {}
        
}  //function makeHtmlFromEsummaryJson(EsummaryJson)




//The main function
//=================

function FillDomElementWithRecentPubsHtml (genus, period, domElementId) {
    
    var message = "";
    var messageInitial = "<span style='font-size:1.5em;color:#999999'>Please wait: Gettting data from Pubmed ...   ...   ...</span>";
    //Show intial message
    jQuery("#" + domElementId).html (messageInitial);
    
    //Get the selected genus and periods from form
    genus = jQuery("form#genus  option:selected").val()
    period = jQuery("form#period  input:checked").val()   
    
    console.log("genus: " + genus); //debug
    console.log("period: " + period); //debug
    
    //Set up htmlContent
    var htmlContent = "";

    //Construct Esearch URL
    //Obsolete Example(works): http://www.ncbi.nlm.nih.gov/pubmed?term=Phaseolus+genetics+AND+%28%22last+12+months%22[PDat]%29&cmd=DetailsSearch
    
    var BaseUrlEsearch = "http:" + "//eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?" + "db=Pubmed" + "&retmode=json" + "&" + "term=(";
    //var query = genus + "[MeSH+Terms]" + "+OR+" + genus + "[All+Fields]" + "+AND+" + "genetics" + "[MeSH+Terms]" +
                "+AND+" + "(\"last+" + period + "+months\"[PDAT]))"; // + "&cmd=DetailsSearch" ;
    var query = genus + "[Title/Abstract]" + "+AND+" + "\"last+" + period + "+months\"[PDat])" + "&retmax=10000";
    var UrlEsearch = BaseUrlEsearch + query; //returns json obj
    console.log("UrlEsearch: " + UrlEsearch);

    
    //Get json from UrlEsearch
    
    //Http Request
    jQuery.get(UrlEsearch,status, function(esearchJson){
    //jQuery.post(UrlEsearch,status, function(esearchJson){
        
        //pubmed id counts from Esearch
        var esearchCount = esearchJson.esearchresult.count;
        
        //Message while waiting 'No of items found'
        message = "Found " + esearchCount + " items.  <br/>" + messageInitial;
        jQuery("#" + domElementId).html (message);
        var esearchRetmax = esearchJson.esearchresult.retmax;
        console.log ("esearchCount: " + esearchCount + "; esearchRetmax: " + esearchRetmax); //debug
        
        //pubmed id list from Esearch
        var esearchIdlist = esearchJson.esearchresult.idlist;
        console.log ("esearchIdlist: " + esearchIdlist.join() ); //debug
        
        //Processing based on esearchIdlist is
        switch (esearchIdlist != undefined) {
            case esearchCount == 0:
                message = "None Found at Pubmed<br/>";
                jQuery("#" + domElementId).html (message);
                return;
            case esearchCount > 150:
                message = "Found " + esearchCount + " items; but showing only 150.";
                jQuery("#" + domElementId).html (message + " <br/> " + messageInitial);
                esearchIdlistTrunc = esearchIdlist.slice(0, 150); //Truncated Idlist
                esearchIdlist = esearchIdlistTrunc;  //Think about this
                break;
            default:
                message = "Found " + esearchCount + " items.  <br/>" + messageInitial
                jQuery("#" + domElementId).html (message);
            } 
        
        
        
        //Pass Esearch Idlist to get Esummary
//CAUTION:   If too many Ids, fails. "XMLHttpRequest cannot load ......    The response had HTTP status code 502. "         
        var esummaryUrl = "http://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&retmode=json" + "&id="
                           + esearchIdlist.join();
        console.log("esummaryUrl: " + esummaryUrl); //debug
        jQuery.get(esummaryUrl,status, function(esummaryJson){
            
            var pubmedUrl = "http://www.ncbi.nlm.nih.gov/pubmed/" + esearchIdlist.join();
            console.log("pubmedUrl: " + pubmedUrl);
            
            message = "<span>" + "Found&nbsp;<b>" + esearchCount + "</b>&nbsp;publications for " 
                      + "<b>"+ genus + "</b> at Pubmed " + " published in the last <b>" + period + "</b> month(s):"
                      +"</span>";
            pubmedLink = " <a href=\"" + pubmedUrl + "\"  target=\"_blank\"> (Link to Pubmed) </a>";
            //htmlContent += message + "<br/><br/>";            
            htmlContent += message + pubmedLink + "<br/><br/>";
            
            htmlContent += makeHtmlFromEsummaryJson(esummaryJson);
            
            //Fill with htmlContent
            jQuery("#" + domElementId).html (htmlContent);
            
            
            })
        
        
    }) //lQ.get(UrlESearch.......)
    
    
    

} // FillDomElementWithRecentPubsHtml()
