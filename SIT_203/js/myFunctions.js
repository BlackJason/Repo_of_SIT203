/**
 * Created by jason on 28/07/2017.
 */

// funtion to load the XML document
function loadxml() {
    try //Internet Explorer
    {
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = false;
        xmlDoc.load('product_details.xml');
    }
    catch (e) {
        try //Firefox, Mozilla, Opera, etc.
        {
            xmlDoc = document.implementation.createDocument("", "", null);
            xmlDoc.async = false;
            xmlDoc.load('product_details.xml');
        }
        catch (e) {
            try //Google Chrome
            {
                var xmlhttp = new window.XMLHttpRequest();
                xmlhttp.open("GET", 'product_details.xml', false);
                xmlhttp.send(null);
                xmlDoc = xmlhttp.responseXML.documentElement;
                console.log("successful");
            }
            catch (e) {
                error = e.message;
            }
        }
    }
    return xmlDoc;
}


// function to test load
function testLoad() {
        var XMLFile = loadxml("../XML/Production_Details.xml");
        $("#applyButton").click(function () {
            var productionCase = $('<div></div>');
            productionCase.append('<p>123312</p>');

            $("#productionCase").html(productionCase);
            console.log("123123");
        })
}


$(document).ready(function () {
    testLoad();
});