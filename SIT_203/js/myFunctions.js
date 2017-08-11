/**
 * Created by jason(rongjunchen) on 28/07/2017.
 * All comments by jason(rongjunchen)
 */

//Global here
var productArray = new Array();
var nowArray = new Array();
var firstLoad = 0;
var displayType = 6;
var pageNumber = 1;
var pageCount = 1;
//end Global

// funtion to load the XML document
function loadxml(dname){
    if (window.XMLHttpRequest){
        xhttp=new XMLHttpRequest();
    }else{
        xhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.open("GET",dname,false);
    xhttp.send("");
    return xhttp.responseXML;
}

//sort low to high
function orderLowtoHigh(pArray){
    var length = pArray.length;
    for (var i = 0; i<pArray.length; i++) {
        for (var j = 0; j < pArray.length-1-i; j++) {
            if (parseInt(pArray[j][7]) > parseInt(pArray[j + 1][7])) {
                // console.log(pArray[j][7]);
                // console.log(pArray[j + 1][7]);
                temp = pArray[j];
                pArray[j] = pArray[j + 1];
                pArray[j + 1] = temp;
            }
        }
    }
    // console.log(pArray);
    return pArray;
}

// sort high to low
function orderHightoLow(pArray){
    var length = pArray.length;
    for (var i = 0; i<pArray.length; i++) {
        for (var j = 0; j < pArray.length-1-i; j++) {
            if (parseInt(pArray[j][7]) < parseInt(pArray[j + 1][7])) {
                // console.log(pArray[j][7]);
                // console.log(pArray[j + 1][7]);
                temp = pArray[j];
                pArray[j] = pArray[j + 1];
                pArray[j + 1] = temp;
            }
        }
    }
    // console.log(pArray);
    return pArray;
}

// function to get sortMethod and make the sort process
function getSortMethod(aimArray){
    // to got sort option
    var sortMethod=$("#sortByPrice").find("option:selected").text();

    if(sortMethod=="Price: low-high"){
        orderLowtoHigh(aimArray);
    }else if(sortMethod=="Price: high-low"){
        orderHightoLow(aimArray);
    }
}

// function to load XML into an array and process to men or ladies
function xmlLoad(gender) {
    var xmlFile = loadxml("xml/Production_Details.xml");
    var production=xmlFile.getElementsByTagName("productionPlant");

    var infoArray = new Array();
    var processArray = new Array();
    //save all info to an array
    for(var i=0;i<production.length;i++) {
        tempArray = new Array();
        tempArray.push(production[i].getElementsByTagName("id")[0].childNodes[0].nodeValue);
        tempArray.push(production[i].getElementsByTagName("catalog")[0].childNodes[0].nodeValue);
        tempArray.push(production[i].getElementsByTagName("sex")[0].childNodes[0].nodeValue);
        tempArray.push(production[i].getElementsByTagName("name")[0].childNodes[0].nodeValue);
        tempArray.push(production[i].getElementsByTagName("imageS")[0].childNodes[0].nodeValue);
        tempArray.push(production[i].getElementsByTagName("imageL")[0].childNodes[0].nodeValue);
        tempArray.push(production[i].getElementsByTagName("brand")[0].childNodes[0].nodeValue);
        tempArray.push(production[i].getElementsByTagName("price")[0].childNodes[0].nodeValue);
        tempArray.push(production[i].getElementsByTagName("details")[0].childNodes[0].nodeValue);
        tempArray.push(production[i].getElementsByTagName("material")[0].childNodes[0].nodeValue);
        tempArray.push(production[i].getElementsByTagName("care")[0].childNodes[0].nodeValue);
        tempArray.push(production[i].getElementsByTagName("fit")[0].childNodes[0].nodeValue);
        tempArray.push(production[i].getElementsByTagName("size")[0].childNodes[0].nodeValue);
        infoArray.push(tempArray);
        // console.log(tempArray);
    }

    for(var i=0;i<infoArray.length;i++){
        if(infoArray[i][2] == gender) {
            processArray.push(infoArray[i]);
        }
    }

    if(processArray.length == 0){
        productArray = infoArray;
    }else{
        productArray = processArray;
    }

}

//process the productArray **item = catalog in xml**
function processArray(catalog,item){
    var tempArray = new Array();
    // console.log(productArray.length);
    for(var i1=0;i1<productArray.length;i1++){
        if(productArray[i1][item]==catalog){
            //write productArray
            tempArray.push(productArray[i1]);
        }else if(catalog=="all"){
            //console.log(productArray);
            return productArray;
        }
    }
    if(tempArray.length == 0){
        // console.log("no result");
        return 0;
    }else{
        return tempArray;
    }
}

//function to overwrite page
function writePage(pArray, firstValue, showAmount, pageNumber){
    //get the infoArray
    var infoArray = pArray;

    //****separate function begin****
    //carlate page amount
    var pageAmount = Math.ceil(pArray.length / showAmount);
    pageCount = pageAmount;
    var loopIndex = showAmount * (pageNumber-1);

    // console.log(pageAmount);
    //set an indexArray to convenient the sort
    var indexArray = new Array("id","catalog","sex","name","imageS","imageL","brand","price","details","material","care","fit","size");
    if(showAmount>nowArray.length){
        showAmount = nowArray.length;
    }

    var restValue = nowArray.length - (pageNumber-1)*showAmount;
    if(restValue > showAmount){
        restValue = showAmount;
    }
    // console.log(showAmount);
    //****separate function end****

    //write the page include the product Div and the page Div
    for(var i1=loopIndex;i1<loopIndex+restValue;i1++){
        //write the whole Page
        var outDiv1 = $('<div class="col-md-4 col-sm-6"></div>');
        var productDiv = $('<div class="product"></div>');
        outDiv1.append(productDiv);
        var flip_containerDiv = $('<div class="flip-container"></div>');
        productDiv.append(flip_containerDiv);
        var flipperDiv = $('<div class="flipper"></div>');
        flip_containerDiv.append(flipperDiv);
        var frontDiv = $('<div class="front"></div>');
        flipperDiv.append(frontDiv);
        frontDiv.append('<a href="detail.html?id='+infoArray[i1][0]+'"><img src="img/ProductionPhoto/'+infoArray[i1][4]+'" alt="'+infoArray[i1][3]+'" class="img-responsive"></a>');
        var backDiv = $('<div class="back"></div>');
        flipperDiv.append(backDiv);
        backDiv.append('<a href="detail.html?id='+infoArray[i1][0]+'"><img src="img/ProductionPhoto/'+infoArray[i1][5]+'" alt="'+infoArray[i1][3]+'" class="img-responsive"></a>');
        productDiv.append('<a href="detail.html?id='+infoArray[i1][0]+'" class="invisible"><img src="img/ProductionPhoto/'+infoArray[i1][4]+'" alt="" class="img-responsive"></a>');
        var textDiv=$('<div class="text"></div>');
        productDiv.append(textDiv);
        textDiv.append('<h3><a href="detail.html?id='+infoArray[i1][0]+'">'+infoArray[i1][3]+'</a></h3>');
        textDiv.append('<p class="price">$'+infoArray[i1][7]+'</p>');
        textDiv.append('<p class="buttons"><a href="detail.html?id='+infoArray[i1][0]+'" class="btn btn-default">View detail</a><a href="basket.html" class="btn btn-primary" style="margin-left: 2px"><i class="fa fa-shopping-cart"></i>Add to cart</a></p>');
        if (firstValue==0){
            $("#productionCase").html(outDiv1);
            firstValue = 1;
        }else{
            $("#productionCase").append(outDiv1);
        }
    }

    //write the bottom page link
    for(var i=0;i<pageAmount+2;i++){
        if(i==0){
            $("#pageAmountShow").html('<li><a href="#" onclick="previousPage()">&laquo;</a></li>');
        }else if(i==pageNumber){
            $("#pageAmountShow").append('<li class="active"><a href="#" onclick="clickPageNumber('+i+')">'+i+'</a></li>');
        }else if(i==pageAmount+1){
            $("#pageAmountShow").append('<li><a href="#" onclick="nextPage()">&raquo;</a></li>');
        }else{
            $("#pageAmountShow").append('<li><a href="#" onclick="clickPageNumber('+i+')">'+i+'</a></li>');
        }
    }
}

//function to respond click page number
function clickPageNumber(pagenumber){
    pageNumber = pagenumber;
    //chang display amount label and write page to next page
    changeDisplayAmount(displayType,pagenumber);
}

//function to load next page
function nextPage(){
    if(pageNumber==pageCount){
        alert("There is no next page!");
    }

    if(pageNumber<pageCount){
        clickPageNumber(pageNumber+1);
    }
    console.log(pageNumber,pageCount);
}

//function to load next page
function previousPage(){
    if(pageNumber==1){
        alert("This is already the first page!");
    }
    if(pageNumber>1){
        clickPageNumber(pageNumber-1);
    }

}

//respond checkbox event
function catalogSort(){
    var catalog;
    var tempArray = new Array();
    nowArray = new Array();
    $("input[name='catalog']:checked").each(function () {
        catalog= this.value;
        tempArray = processArray(catalog,6);
        //if tick two or more box, add it to nowArray
        for(var i=0;i<tempArray.length;i++){
            nowArray.push(tempArray[i]);
        }
    });

    if(nowArray.length==0){//cannot search brands
        var page = $('<p>No Result</p>');
        $("#productionCase").html(page);
    }else{//can search brands
        getSortMethod(nowArray);
        pageNumber = 1;
        changeDisplayAmount(displayType,1);
    }

    if(catalog==undefined){//tick no checkbox so show all product
        catalog = "all";
        console.log(catalog);
        productArray = processArray(catalog,6);
        nowArray = productArray;
        getSortMethod(nowArray);
        pageNumber = 1;
        changeDisplayAmount(displayType,1);
    }
}

//clear the checkbox
function clearCheck(){
    $("input[name='catalog']").each(function(){
        $(this).attr("checked",false);
    });
    nowArray = productArray;
    getSortMethod(nowArray);
    pageNumber = 1;
    changeDisplayAmount(displayType,1);
}

//function to get the item
function returnCatalog(item) {
    var reg = new RegExp("(^|&)"+ item +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

//function to show different catalogs
function catalogFind(){
    var catalog=returnCatalog("item");
    // console.log(catalog);
    if(catalog != null){
        productArray = processArray(catalog,1);
        nowArray = productArray;
        // console.log(productArray);
        getSortMethod(nowArray);
        updateBrandAmount();
        changeDisplayAmount(displayType,1);
    }
}

//function to respond onchang event
function sortFromOption(){
    // console.log("sortFromOption");
    getSortMethod(nowArray);
    pageNumber = 1;
    changeDisplayAmount(displayType,1);
}

//function to update the item amount
function updateBrandAmount(){
    var armaniCount = 0;
    var VersaceCount = 0;
    var Carlo_BruniCount = 0;
    var Jack_HoneyCount = 0;
    console.log(nowArray);
    for(var i=0;i<nowArray.length;i++){
        if(nowArray[i][6] == "Armani" ){
            armaniCount++;
        }else if(nowArray[i][6] == "Versace"){
            VersaceCount++;
        }else if(nowArray[i][6] == "Carlo Bruni"){
            Carlo_BruniCount++;
        }else if(nowArray[i][6] == "Jack Honey"){
            Jack_HoneyCount++;
        }

        $("#Armani_man").html('<label><input name="catalog" type="checkbox" value="Armani">Armani ('+armaniCount+')</label>');
        $("#Versace_man").html('<label><input name="catalog" type="checkbox" value="Versace">Versace ('+VersaceCount+')</label>');
        $("#Carlo_Bruni_man").html('<label><input name="catalog" type="checkbox" value="Carlo Bruni">Carlo Bruni ('+Carlo_BruniCount+')</label>');
        $("#Jack_Honey_man").html('<label><input name="catalog" type="checkbox" value="Jack Honey">Jack Honey ('+Jack_HoneyCount+')</label>');

    }
}

//function to change display amount and it will also change the product Div
function changeDisplayAmount(item,pagenumber){
    pageNumber = pagenumber;
// var to save production amount
    var productAmount = nowArray.length;
    if(item!="-1"){

        //get how many products can show in this page
        var showingProduct = productAmount - (pagenumber-1)*item;

        /*
        if showing products excess the display type let the page can only show max displaytype amount pruduction
        for example displaytype == 6, productAmount == 10, so page 1 will show 6/10 products
        */
        if(showingProduct>item){
            showingProduct = item;
        }
    }

    if(item=="6"){
        displayType = 6;
        $("#displayView").html('Showing <strong>'+showingProduct+'</strong> of <strong>'+productAmount+'</strong> products');
        $("#selectAmount").html('<strong>Show</strong><a href="javascript:void(0)" class="btn btn-default btn-sm btn-primary" onclick="changeDisplayAmount(6,1)">6</a>');
        $("#selectAmount").append('<a href="javascript:void(0)" class="btn btn-default btn-sm" style="margin-left: 2px" onclick="changeDisplayAmount(12,1)">12</a>');
        $("#selectAmount").append('<a href="javascript:void(0)" class="btn btn-default btn-sm" style="margin-left: 2px" onclick="changeDisplayAmount(-1,1)">All</a> products');

        //write page to replace
        writePage(nowArray,0,displayType,pagenumber);
    }else if(item=="12"){
        displayType = 12;
        $("#displayView").html('Showing <strong>'+showingProduct+'</strong> of <strong>'+productAmount+'</strong> products');
        $("#selectAmount").html('<strong>Show</strong><a href="javascript:void(0)" class="btn btn-default btn-sm" onclick="changeDisplayAmount(6,1)">6</a>');
        $("#selectAmount").append('<a href="javascript:void(0)" class="btn btn-default btn-sm btn-primary" style="margin-left: 3px" onclick="changeDisplayAmount(12,1)">12</a>');
        $("#selectAmount").append('<a href="javascript:void(0)" class="btn btn-default btn-sm" style="margin-left: 3px" onclick="changeDisplayAmount(-1,1)">All</a> products');

        //write page to replace
        writePage(nowArray,0,displayType,pagenumber);
    }else if(item==-1){// to avoid all = 12 or 6 make all's Type = -1
        displayType = -1;
        $("#displayView").html('Showing <strong>'+productAmount+'</strong> of <strong>'+productAmount+'</strong> products');
        $("#selectAmount").html('<strong>Show</strong><a href="javascript:void(0)" class="btn btn-default btn-sm" onclick="changeDisplayAmount(6,1)">6</a>');
        $("#selectAmount").append('<a href="javascript:void(0)" class="btn btn-default btn-sm" style="margin-left: 3px" onclick="changeDisplayAmount(12,1)">12</a>');
        $("#selectAmount").append('<a href="javascript:void(0)" class="btn btn-default btn-sm btn-primary" style="margin-left: 3px" onclick="changeDisplayAmount(-1,1)">All</a> products');

        //write page to replace
        writePage(nowArray,0,nowArray.length,pagenumber);
    }


}

// $(document).ready(function(){
//     xmlLoad("men");
//     nowArray = productArray;
//     getSortMethod(productArray);
//     catalogFind();
//     updateBrandAmount();
//     //give the page show a defalt value and write page, this function call the writePage() function
//     changeDisplayAmount(displayType,pageNumber);
// });