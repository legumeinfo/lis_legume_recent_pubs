<!-- Title and guide text  -->
<div>
  <h1>List of Journals scanned for Recent Legume Publications from Pubmed</h1>
</div>


<script  type="text/javascript"  src="/sites/all/modules/lis_legume_recent_pubs/lis_legume_recent_pubs.js"></script>
<script>
  var genus = <?php echo $genus ?>;
  var period = <?php echo $period ?>;
</script>


    
<!--  <p style="font-size:70%">**Known issues: Shows non-genetics, clinical articles from Pubmed particularly for Glycine.</p>  -->
<span style="font-size: 80%;">(<i>Content created with up-to-date data from NCBI Pubmed database</i>)</span>
</div>
<hr/>

<div style="display: none">
<p>Debug:</p>
<?php
echo  "(From tpl.php::)  Selected genus, period: ".$genus.", ".$period;
?>
<hr/>
</div>

<script>
  //For initial page loading before user interaction
FillDomElementWithRecentPubsHtml (genus, period, 'publications');
</script>    


<!-- =====================================================================  -->
<div id="journals">
    <br/><br/><br/><br/><br/>
    <span style='font-size:1.5em;color:#999999'>Please wait: Gettting data from Pubmed ...   ...   ...</span>
    <br/><br/><br/><br/><br/><br/><br/><br/>
</div>
<hr/>

<!-- END  -->  
