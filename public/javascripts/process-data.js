//local constants
var GBMUS_SERVER = 'https://dcc.icgc.org';
var GBMUS_PATH = '/api/v1/projects/GBM-US/mutations';
var GBMUS_PARAMS = '?field=id,mutation,type,chromosome,start,end&size=100&order=desc'

var dataObj = new Object();

/*
*  Calls the mutations API endpoint of the ICGC Data Coordination Center and sends response to be parsed
*/
function makeRequest() {
    d3.json(GBMUS_SERVER + GBMUS_PATH + GBMUS_PARAMS, function(error, data) {
        if(error) {
            var error = '{ "status":"Internal Server Error", "statusCode":"500", ' +
                '"error":"Error retrieving subscriptions API response." }';
            var jsonResponse = JSON.parse(error);
            console.log(jsonResponse);
        }
        else {
            dataObj.all_data = data.hits;
            console.log(dataObj.all_data);
            return dataObj.all_data;
        }
    });
}

function getListOfMutationTypes(dataArr) {
    var typeCountArr = [];
    for (var i = 0; i < dataArr.length; i++) {
        typeCountArr.push(dataArr[i].type);
    }
    dataObj.type_data = typeCountArr;
    console.log(dataObj.type_data);
    return typeCountArr;
}

function countProperties(propertiesArr) {
    var counts = {};
    for (var i = 0; i < propertiesArr.length; i++) {
        counts[propertiesArr[i]] = 1 + (counts[propertiesArr[i]] || 0);
    }
    console.log(propertiesArr.length);
    console.log(counts);
    var countOfProperties = d3.values(counts);
    console.log(countOfProperties);
    return countOfProperties;
}

function getAllData() {
    return dataObj.all_data;
}