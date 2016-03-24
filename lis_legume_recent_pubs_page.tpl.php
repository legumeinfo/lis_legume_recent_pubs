<!-- Title and guide text  -->
<div>
  <h1>Recent Legume Publications from Pubmed</h1>
</div>


<script  type="text/javascript"  src="/sites/all/modules/lis_legume_recent_pubs/lis_legume_recent_pubs.js"></script>
<script>
  var genus = <?php echo $genus ?>;
  var period = <?php echo $period ?>;
</script>

<!-- Template:
<input type="radio" name="genus" value="xxxxxxx"  onclick="FillDomElementWithRecentPubsHtml (this.value, period, 'publications');">  xxxxx  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
-->

<!--
<div>
    <form id="genus_obsolete" action="">
        <fieldset>
            
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
</div>
-->
<!--   Genus Dropdown  -->
<div>
  <fieldset>
  <form id="genus" action="">
    <b>Genus:&nbsp;&nbsp;</b>  
    <select  id="genus" onchange="FillDomElementWithRecentPubsHtml (this.options[this.selectedIndex].value, period, 'publications'); console.log('selected-option-value: ' + this.options[this.selectedIndex].value);">
        <option value="Apios">  Apios  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option>
        <option value="Arachis">  Arachis  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option>
        <option value="Cajanus">  Cajanus  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option>
        <option value="Chamaecrista">  Chamaecrista  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <option value="Cicer">  Cicer  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option>
        <option value="Glycine max">  Glycine (max) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option>
        <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option>
        <option value="Lens culinaris">  Lens (culinaris) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option>
        <option value="Lotus japonicus">  Lotus (japonicus) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option>
        <option value="Lupinus">  Lupinus  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option>
        <option value="Medicago">  Medicago  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option>
        <option value="Phaseolus" selected="selected">  Phaseolus  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option>
        <option value="Pisum">  Pisum  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option>
        <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  </option>          
        <option value="Trifolium">  Trifolium  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option>
        <option value="Vicia">  Vicia  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option>
        <option value="Vigna">  Vigna  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option>
        <option value="legume">&nbsp;&nbsp;Legume  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option>
    </select>  <!-- mentioned in Title or Abstract -->
  </form>


    <form id="period"  action="">
            <!--<legend>Period:</legend><br>-->
            <b>Period:</b>&nbsp;&nbsp;
            <input type="radio" name="period" value="1"  onclick="FillDomElementWithRecentPubsHtml (genus, this.value, 'publications');">&nbsp;&nbsp;Last month &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="radio" name="period" value="3"  checked="checked"  onclick="FillDomElementWithRecentPubsHtml (genus, this.value, 'publications');">&nbsp;&nbsp;Last 3 months&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="radio" name="period" value="6"  onclick="FillDomElementWithRecentPubsHtml (genus, this.value, 'publications');">&nbsp;&nbsp;Last 6 months
    </form>
    </fieldset>
    
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
<div id="publications">
    <br/><br/><br/><br/><br/>
    <span style='font-size:1.5em;color:#999999'>Please wait: Gettting data from Pubmed ...   ...   ...</span>
    <br/><br/><br/><br/><br/><br/><br/><br/>
</div>
<hr/>

<!-- END  -->  
