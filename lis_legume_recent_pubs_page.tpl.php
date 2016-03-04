<!-- Title and guide text  -->
<div>
  <h1>Recent Legume Publications from Pubmed</h1>
  <span style="font-size: 80%;">(<i>Content created with up-to-date data from NCBI Pubmed database</i>)</span>
</div>


<script  type="text/javascript"  src="/sites/all/modules/lis_legume_recent_pubs/lis_legume_recent_pubs.js"></script>
<script>
  var genus = <?php echo $genus ?>;
  var period = <?php echo $period ?>;
</script>

<!-- Template:
<input type="radio" name="genus" value="xxxxxxx"  onclick="FillDomElementWithRecentPubsHtml (this.value, period, 'publications');">  xxxxx  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
-->


<div>
    <form id="genus" action="">
        <fieldset>
            <!--<legend>Genus:</legend><br>-->
            <b>Genus:</b>&nbsp;&nbsp;
            <input type="radio" name="genus" value="Apios"  onclick="FillDomElementWithRecentPubsHtml (this.value, period, 'publications');">  Apios  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="radio" name="genus" value="Arachis"  onclick="FillDomElementWithRecentPubsHtml (this.value, period, 'publications');">  Arachis  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="radio" name="genus" value="Cajanus"  onclick="FillDomElementWithRecentPubsHtml (this.value, period, 'publications');">  Cajanus  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="radio" name="genus" value="Chamaecrista"  onclick="FillDomElementWithRecentPubsHtml (this.value, period, 'publications');">  Chamaecrista  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="radio" name="genus" value="Cicer"  onclick="FillDomElementWithRecentPubsHtml (this.value, period, 'publications');">  Cicer  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="radio" name="genus" value="Glycine"  onclick="FillDomElementWithRecentPubsHtml (this.value, period, 'publications');">  Glycine  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="radio" name="genus" value="Lens"  onclick="FillDomElementWithRecentPubsHtml (this.value, period, 'publications');">  Lens  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="radio" name="genus" value="Lotus"  onclick="FillDomElementWithRecentPubsHtml (this.value, period, 'publications');">  Lotus  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="radio" name="genus" value="Lupinus"  onclick="FillDomElementWithRecentPubsHtml (this.value, period, 'publications');">  Lupinus  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="radio" name="genus" value="Medicago"  onclick="FillDomElementWithRecentPubsHtml (this.value, period, 'publications');">  Medicago  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="radio" name="genus" value="Phaseolus" checked="checked"  onclick="FillDomElementWithRecentPubsHtml (this.value, period, 'publications');">  Phaseolus  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="radio" name="genus" value="Pisum"  onclick="FillDomElementWithRecentPubsHtml (this.value, period, 'publications');">  Pisum  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;            
            <input type="radio" name="genus" value="Trifolium"  onclick="FillDomElementWithRecentPubsHtml (this.value, period, 'publications');">  Trifolium  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="radio" name="genus" value="Vicia"  onclick="FillDomElementWithRecentPubsHtml (this.value, period, 'publications');">  Vicia  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="radio" name="genus" value="Vigna"  onclick="FillDomElementWithRecentPubsHtml (this.value, period, 'publications');">  Vigna  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="radio" name="genus" value="legume"  onclick="FillDomElementWithRecentPubsHtml (this.value, period, 'publications');">&nbsp;&nbsp;Legume  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </fieldset>
    </form>

    <form id="period"  action="">
        <fieldset>
            <!--<legend>Period:</legend><br>-->
            <b>Period:</b>&nbsp;&nbsp;
            <input type="radio" name="period" value="1"  onclick="FillDomElementWithRecentPubsHtml (genus, this.value, 'publications');">&nbsp;&nbsp;Last month &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="radio" name="period" value="3"  checked="checked"  onclick="FillDomElementWithRecentPubsHtml (genus, this.value, 'publications');">&nbsp;&nbsp;Last 3 months&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="radio" name="period" value="6"  onclick="FillDomElementWithRecentPubsHtml (genus, this.value, 'publications');">&nbsp;&nbsp;Last 6 months
        </fieldset>
    </form>
<p style="font-size:70%">**Known issues: #Can't handle too many ids;  #No message on 0/zero or too many publications( stays quite); Gets non-genetics/clinical articles, etc.</p>    
</div>
<hr/>
<div style="display: none">
<p>Debug:</p>
<?php
echo  "(From tpl.php::)  Selected genus, period: ".$genus.", ".$period;
?>
<hr/>
</div>
<script>FillDomElementWithRecentPubsHtml (genus, period, 'publications');</script>    


<!-- =====================================================================  -->
<div id="publications">
    Publications:<br/>
</div>
<hr/>

<!-- END  -->  
