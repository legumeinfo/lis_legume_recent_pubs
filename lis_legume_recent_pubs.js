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




function makeHtmlFromEsummaryJson(esummaryJson) {  
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
        
        var linkToUid = "<a href=\"https://www.ncbi.nlm.nih.gov/pubmed/" + uid + "\"" + "  target=\"_blank\">" + title + "</a>";
        
        var citation = (authors.join(", ") + ". " + "<b>" + year + "</b>" + ". " + linkToUid + " " + "<strong>" + source + " " + volume +  issue + ":" + pages + "</strong>" + "." + " (" + uid + ")");
        var citation_li = "<li>" + citation + "</li><br/>"; // + "\n\n";
        //Creates like:
        //Dash S, Campbell JD, Cannon EK, Cleary AM, ......, Farmer AD, Cannon SB. 2016. Legume information system (LegumeInfo.org): a key component of a set of federated data resources for the legume family. Nucleic Acids Res 44(D1):D1181-8. (<a href="https://www.ncbi.nlm.nih.gov/pubmed/26546515"  target="_blank">26546515</a>)
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
    journal = jQuery("form#journal  input:checked").val();
    
    console.log("genus: " + genus); //debug
    console.log("period: " + period); //debug
    console.log("journal: " + journal); //debug
    
    //Set up htmlContent
    var htmlContent = "";

    //Construct Esearch URL
    //Obsolete Example(works): https://www.ncbi.nlm.nih.gov/pubmed?term=Phaseolus+genetics+AND+%28%22last+12+months%22[PDat]%29&cmd=DetailsSearch
    
    var BaseUrlEsearch = "https:" + "//eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?" + "db=Pubmed" + "&retmode=json"
                         +  "&retmax=10000" + "&" + "term=";
                //Obsolete
                /*var query = genus + "[MeSH+Terms]" + "+OR+" + genus + "[All+Fields]"
                + "+AND+" + "genetics" + "[MeSH+Terms]" + "+AND+" + "(\"last+" + period + "+months\"[PDAT]))";
                (+ "&cmd=DetailsSearch" ;)*/
    var genusTerm = genus + "[Title/Abstract]";
    var periodTerm = "\"last+" + period + "+months\"[PDat]";
    
    var journalTerm =  "\"Am Biotechnol Lab\"[Journal]+OR+\"Am J Bot\"[Journal]+OR+\"Ann Bot\"[Journal]+OR+\"Annu Rev Genet\"[Journal]+OR+\"Annu Rev Phytopathol\"[Journal]+OR+\"Annu Rev Plant Biol\"[Journal]+OR+\"BMC Bioinformatics\"[Journal]+OR+\"BMC Biotechnol\"[Journal]+OR+\"BMC Genet\"[Journal]+OR+\"BMC Genomics\"[Journal]+OR+\"BMC Mol Biol\"[Journal]+OR+\"BMC Plant Biol\"[Journal]+OR+\"Biochem Genet\"[Journal]+OR+\"Bioessays\"[Journal]+OR+\"Bioinformatics\"[Journal]+OR+\"Biotechniques\"[Journal]+OR+\"Biotechnol Adv\"[Journal]+OR+\"Biotechnol Annu Rev\"[Journal]+OR+\"Biotechnol Focus\"[Journal]+OR+\"Biotechnol Genet Eng Rev\"[Journal]+OR+\"Biotechnol J\"[Journal]+OR+\"Biotechnol Lett\"[Journal]+OR+\"Biotechnol Prog\"[Journal]+OR+\"Biotechnology (N Y)\"[Journal]+OR+\"Brief Bioinform\"[Journal]+OR+\"Brief Funct Genomic Proteomic\"[Journal]+OR+\"Brief Funct Genomics\"[Journal]+OR+\"Bull Hunt Inst Bot Doc\"[Journal]+OR+\"Can J Genet Cytol\"[Journal]+OR+\"Cell Mol Biol Res\"[Journal]+OR+\"Cell Mol Biol\"[Journal]+OR+\"Cell Mol Life Sci\"[Journal]+OR+\"Cell Regul\"[Journal]+OR+\"Cell Rep\"[Journal]+OR+\"Chromosoma\"[Journal]+OR+\"Chromosome Res\"[Journal]+OR+\"Cloning\"[Journal]+OR+\"Comput Biol Chem\"[Journal]+OR+\"Crit Rev Biochem Mol Biol\"[Journal]+OR+\"Crit Rev Biotechnol\"[Journal]+OR+\"Crit Rev Eukaryot Gene Expr\"[Journal]+OR+\"Curr Genet\"[Journal]+OR+\"Curr Issues Mol Biol\"[Journal]+OR+\"Curr Opin Biotechnol\"[Journal]+OR+\"Curr Opin Genet Dev\"[Journal]+OR+\"Curr Opin Plant Biol\"[Journal]+OR+\"Curr Protoc Bioinformatics\"[Journal]+OR+\"Curr Protoc Mol Biol\"[Journal]+OR+\"Cytogenet Cell Genet\"[Journal]+OR+\"Cytogenet Genome Res\"[Journal]+OR+\"Cytogenetics\"[Journal]+OR+\"DNA Cell Biol\"[Journal]+OR+\"DNA Res\"[Journal]+OR+\"DNA Seq\"[Journal]+OR+\"DNA\"[Journal]+OR+\"Database (Oxford)\"[Journal]+OR+\"Dev Genet\"[Journal]+OR+\"EMBO J\"[Journal]+OR+\"Epigenetics\"[Journal]+OR+\"Epigenomics\"[Journal]+OR+\"Eukaryot Cell\"[Journal]+OR+\"Eur J Genet Soc\"[Journal]+OR+\"Funct Integr Genomics\"[Journal]+OR+\"G3 (Bethesda)\"[Journal]+OR+\"GM Crops Food\"[Journal]+OR+\"GM Crops\"[Journal]+OR+\"Gene Amplif Anal\"[Journal]+OR+\"Gene Anal Tech\"[Journal]+OR+\"Gene Expr Patterns\"[Journal]+OR+\"Gene Expr\"[Journal]+OR+\"Gene\"[Journal]+OR+\"Genes Cells\"[Journal]+OR+\"Genes Dev\"[Journal]+OR+\"Genes Funct\"[Journal]+OR+\"Genes Genet Syst\"[Journal]+OR+\"Genesis\"[Journal]+OR+\"Genet Anal Tech Appl\"[Journal]+OR+\"Genet Anal\"[Journal]+OR+\"Genet Eng (N Y)\"[Journal]+OR+\"Genet Eng\"[Journal]+OR+\"Genet Mol Res\"[Journal]+OR+\"Genet Res (Camb)\"[Journal]+OR+\"Genet Res\"[Journal]+OR+\"Genet Sel Evol\"[Journal]+OR+\"Genetica\"[Journal]+OR+\"Genetics\"[Journal]+OR+\"Genetika\"[Journal]+OR+\"Genewatch\"[Journal]+OR+\"Genome Biol Evol\"[Journal]+OR+\"Genome Biol\"[Journal]+OR+\"Genome Dyn\"[Journal]+OR+\"Genome Inform Ser Workshop Genome Inform\"[Journal]+OR+\"Genome Inform\"[Journal]+OR+\"Genome Res\"[Journal]+OR+\"Genome Sci Technol\"[Journal]+OR+\"Genome\"[Journal]+OR+\"Genomics Proteomics Bioinformatics\"[Journal]+OR+\"Genomics\"[Journal]+OR+\"Hereditas\"[Journal]+OR+\"Heredity (Edinb)\"[Journal]+OR+\"Int J Bioinform Res Appl\"[Journal]+OR+\"Int J Data Min Bioinform\"[Journal]+OR+\"Int J Phytoremediation\"[Journal]+OR+\"Int Rev Cell Mol Biol\"[Journal]+OR+\"J Appl Genet\"[Journal]+OR+\"J Bioinform Comput Biol\"[Journal]+OR+\"J Biotechnol\"[Journal]+OR+\"J Comput Biol\"[Journal]+OR+\"J Exp Bot\"[Journal]+OR+\"J Genet Genomics\"[Journal]+OR+\"J Genet\"[Journal]+OR+\"J Hered\"[Journal]+OR+\"J Integr Bioinform\"[Journal]+OR+\"J Integr Plant Biol\"[Journal]+OR+\"J Mol Appl Genet\"[Journal]+OR+\"J Mol Biol\"[Journal]+OR+\"J Mol Evol\"[Journal]+OR+\"J Plant Physiol\"[Journal]+OR+\"J Plant Res\"[Journal]+OR+\"J Struct Biol\"[Journal]+OR+\"J Struct Funct Genomics\"[Journal]+OR+\"Mendel Newsl\"[Journal]+OR+\"Methods Cell Sci\"[Journal]+OR+\"Methods Mol Biol\"[Journal]+OR+\"Microrna\"[Journal]+OR+\"Mitochondrial DNA\"[Journal]+OR+\"Mol Biol Biochem Biophys\"[Journal]+OR+\"Mol Biol Cell\"[Journal]+OR+\"Mol Biol Evol\"[Journal]+OR+\"Mol Biol Rep\"[Journal]+OR+\"Mol Biotechnol\"[Journal]+OR+\"Mol Breed\"[Journal]+OR+\"Mol Cell Biol Res Commun\"[Journal]+OR+\"Mol Cell Biol\"[Journal]+OR+\"Mol Cell Proteomics\"[Journal]+OR+\"Mol Cell\"[Journal]+OR+\"Mol Divers\"[Journal]+OR+\"Mol Ecol Resour\"[Journal]+OR+\"Mol Ecol\"[Journal]+OR+\"Mol Gen Genet\"[Journal]+OR+\"Mol Genet Genomics\"[Journal]+OR+\"Mol Phylogenet Evol\"[Journal]+OR+\"Mol Plant Microbe Interact\"[Journal]+OR+\"Mol Plant Pathol\"[Journal]+OR+\"Mol Plant\"[Journal]+OR+\"Mol Syst Biol\"[Journal]+OR+\"Mutat Res Rev Mutat Res\"[Journal]+OR+\"Mutat Res\"[Journal]+OR+\"Nature\"[Journal]+OR+\"N Biotechnol\"[Journal]+OR+\"Nat Biotechnol\"[Journal]+OR+\"Nat Genet\"[Journal]+OR+\"Nat Rev Genet\"[Journal]+OR+\"Nat Rev Mol Cell Biol\"[Journal]+OR+\"Nat Struct Biol\"[Journal]+OR+\"Nat Struct Mol Biol\"[Journal]+OR+\"New Biol\"[Journal]+OR+\"New Phytol\"[Journal]+OR+\"Nucleus\"[Journal]+OR+\"OMICS\"[Journal]+OR+\"Oligonucleotides\"[Journal]+OR+\"Open Biol\"[Journal]+OR+\"Oxf Surv Eukaryot Genes\"[Journal]+OR+\"Plant Physiol\"[Journal]+OR+\"PLoS Comput Biol\"[Journal]+OR+\"PLoS Genet\"[Journal]+OR+\"PloS ONE\"[Journal]+OR+\"Pac Symp Biocomput\"[Journal]+OR+\"Physiol Plant\"[Journal]+OR+\"Phytopathology\"[Journal]+OR+\"Plant Biol (Stuttg)\"[Journal]+OR+\"Plant Biotechnol J\"[Journal]+OR+\"Plant Cell Environ\"[Journal]+OR+\"Plant Cell Physiol\"[Journal]+OR+\"Plant Cell Rep\"[Journal]+OR+\"Plant Cell\"[Journal]+OR+\"Plant J\"[Journal]+OR+\"Plant Mol Biol\"[Journal]+OR+\"Plant Physiol Biochem\"[Journal]+OR+\"Plant Reprod\"[Journal]+OR+\"Plant Sci\"[Journal]+OR+\"Plant Signal Behav\"[Journal]+OR+\"Planta Med\"[Journal]+OR+\"Planta\"[Journal]+OR+\"Science\"[Journal]+OR+\"Sex Plant Reprod\"[Journal]+OR+\"Somat Cell Mol Genet\"[Journal]+OR+\"Somatic Cell Genet\"[Journal]+OR+\"Stat Appl Genet Mol Biol\"[Journal]+OR+\"Theor Appl Genet\"[Journal]+OR+\"Transgenic Res\"[Journal]+OR+\"Tree Physiol\"[Journal]+OR+\"Trends Biotechnol\"[Journal]+OR+\"Trends Genet\"[Journal]+OR+\"Trends Plant Sci\"[Journal]";
    
    var messageJournalList = "To <b>include your favorite journal</b> in our list please <a href=\"/contact\">contact</a> us.<br/><br/>"
    jQuery('fieldset#journalList').html (messageJournalList + journalTerm); // Fill the collapsible fieldset with journalTerm
    
    var term = "(" + genusTerm + "+AND+" + periodTerm + ")";
    var termWithJournal = "(" + genusTerm + "+AND+" + periodTerm + "+AND+" + "(" + journalTerm + ")" + ")";
    
    if (journal) {
        var UrlEsearch = BaseUrlEsearch + termWithJournal;  //Journal based search. Returns json obj
    } else {
        var UrlEsearch = BaseUrlEsearch + term; //Non-journal based search.  Returns json obj
    }
    
    //var UrlEsearch = BaseUrlEsearch + term; //Non-journal based search.  Returns json obj
    //var UrlEsearch = BaseUrlEsearch + termWithJournal;  //Journal based search. Returns json obj
    console.log("UrlEsearch: " + UrlEsearch);

    
    //------------------------------------------------
    //Get json from UrlEsearch
    //------------------------------------------------
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
        esearchIdlist900Max = esearchIdlist.slice(0, 900);;  //Max limit Ids preserved for pubmedUrl (pubmed url limit)
        
        //Processing based on esearchIdlist is
        var messageAddendum = '';
        
        switch (esearchIdlist != undefined) {
            case esearchCount == 0:
                message = "None Found at Pubmed<br/>";
                jQuery("#" + domElementId).html (message);
                return;
            case esearchCount > 100:
                message = "Found " + esearchCount + " items; but showing only 100.";
                messageAddendum = " (showing only 100) ";
                jQuery("#" + domElementId).html (message + " <br/> " + messageInitial);
                esearchIdlistTrunc = esearchIdlist.slice(0, 100); //Truncated Idlist
                esearchIdlist = esearchIdlistTrunc;  //Think about this
                break;
            default:
                message = "Found " + esearchCount + " items.  <br/>" + messageInitial
                jQuery("#" + domElementId).html (message);
            } 
        
        //console.log("messageADDENDUM: " + messageAddendum);
        
        //Pass Esearch Idlist to get Esummary
//CAUTION:   If too many Ids, fails. "XMLHttpRequest cannot load ......    The response had HTTP status code 502. "         
        var esummaryUrl = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&retmode=json" + "&id="
                           + esearchIdlist.join();
        console.log("esummaryUrl: " + esummaryUrl); //debug
        jQuery.get(esummaryUrl,status, function(esummaryJson){
            
            var pubmedUrl = "https://www.ncbi.nlm.nih.gov/pubmed/" + esearchIdlist900Max.join();
            console.log("pubmedUrl: " + pubmedUrl);
            
            message = "<span>" + "Found&nbsp;<b>" + esearchCount + "</b>" + messageAddendum + "&nbsp;publications for " 
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


/*  SCRATCH PAD  */
/*

*/

