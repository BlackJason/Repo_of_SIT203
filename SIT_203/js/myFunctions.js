/**
 * Created by jason on 28/07/2017.
 */

//Global here
var productArray = new Array();
var nowArray = new Array();
var firstLoad = 0;
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

// function to get sortMethod
function getSortMethod(aimArray){
    // to got sort option
    var sortMethod=$("#sortByPrice").find("option:selected").text();

    if(sortMethod=="Price: low-high"){
        orderLowtoHigh(aimArray);
    }else if(sortMethod=="Price: high-low"){
        orderHightoLow(aimArray);
    }
}

// function to load into an array
function xmlLoad() {
    var xmlFile = loadxml("js/Production_Details.xml");
    var production=xmlFile.getElementsByTagName("productionPlant");

    var infoArray = new Array();
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
    productArray = infoArray;
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
function writePage(pArray, firstValue){
    //get the infoArray
    var infoArray = pArray;

    //set an indexArray to convenient the sort
    var indexArray = new Array("id","catalog","sex","name","imageS","imageL","brand","price","details","material","care","fit","size");
    //write the page
    for(var i1=0;i1<infoArray.length;i1++){
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
        frontDiv.append('<a href="detail.html"><img src="img/ProductionPhoto/'+infoArray[i1][4]+'" alt="" class="img-responsive"></a>');
        var backDiv = $('<div class="back"></div>');
        flipperDiv.append(backDiv);
        backDiv.append('<a href="detail.html"><img src="img/ProductionPhoto/'+infoArray[i1][5]+'" alt="" class="img-responsive"></a>');
        productDiv.append('<a href="detail.html" class="invisible"><img src="img/ProductionPhoto/'+infoArray[i1][4]+'" alt="" class="img-responsive"></a>');
        var textDiv=$('<div class="text"></div>');
        productDiv.append(textDiv);
        textDiv.append('<h3><a href="detail.html">'+infoArray[i1][3]+'</a></h3>');
        textDiv.append('<p class="price">$'+infoArray[i1][7]+'</p>');
        textDiv.append('<p class="buttons"><a href="detail.html" class="btn btn-default">View detail</a><a href="basket.html" class="btn btn-primary" style="margin-left: 2px"><i class="fa fa-shopping-cart"></i>Add to cart</a></p>');
        if (firstValue==0){
            $("#productionCase").html(outDiv1);
            firstValue = 1;
        }else{
            $("#productionCase").append(outDiv1);
        }
    }
}

//respond checkbox event
function catalogSort(){
    var catalog;
    var firstTimeValue = 0;
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
        writePage(nowArray,firstTimeValue);
        firstTimeValue++;
    }

    if(catalog==undefined){//tick no checkbox
        catalog = "all";
        console.log(catalog);
        productArray = processArray(catalog,6);
        nowArray = productArray;
        getSortMethod(nowArray);
        writePage(nowArray,0);
    }
}

//clear the checkbox
function clearCheck(){
    $("input[name='catalog']").each(function(){
        $(this).attr("checked",false);
    });
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
    console.log(catalog);
    if(catalog != null){
        productArray = processArray(catalog,1);
        nowArray = productArray;
        // console.log(productArray);
        getSortMethod(nowArray);
        writePage(nowArray,0);
    }
}

//function to respond onchang event
function sortFromOption(){
    // console.log("sortFromOption");
    getSortMethod(nowArray);
    writePage(nowArray,0);
}

$(document).ready(function(){
    xmlLoad();
    nowArray = productArray;
    getSortMethod(productArray);
    catalogFind();
    writePage(productArray,0);
});