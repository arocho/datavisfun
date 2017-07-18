//dependencies
var express = require('express');
var app = express();
var request = require('request');

//local constants
var GBMUS_SERVER = 'https://dcc.icgc.org';
var GBMUS_PATH = '/api/v1/projects/GBM-US/mutations';
var GBMUS_PARAMS = '?field=id,mutation,type,chromosome,start,end&size=100&order=desc'

/*
*  Calls the mutations API endpoint of the ICGC Data Coordination Center and sends response to be parsed
*/
function makeRequest() {
    request({
        url: GBMUS_SERVER + GBMUS_PATH + GBMUS_PARAMS
    }, function (err, response, body) {
        if (err) {
            var error = '{ "status":"Internal Server Error", "statusCode":"500", ' +
                '"error":"Error retrieving subscriptions API response." }';
            var jsonResponse = JSON.parse(error);
            console.log('****RESPONSE****: ' + response);
            console.log(jsonResponse);
        }
        else {
            parseResponse(body.toString())
            console.log('****RESPONSE****: ' + response);
            console.log('****BODY****: ' + body);
        }
    });
}

/*
* Parses the JSON response obtaine from the API call, and creates mutation data objects
*/
function parseResponse(responseBody) {
    try {
        var jsonObj = JSON.parse(responseBody);
        var hits = jsonObj.hits;
        var length = hits.length;
        var arr = [];

        for (var i = 0; i < length; i++) {
            arr.push({
                id: hits[i].id,
                type: hits[i].type,
                chromosome: hits[i].chromosome,
                start: hits[i].start,
                end: hits[i].end,
                mutation: hits[i].mutation
        });
            console.log(hits[i].id);
        }
    }
    catch (err) {
        var error = '{ "status":"Internal Server Error", "statusCode":"500", ' +
                '"error":"Error parsing JSON Response." }';
        var jsonResponse = JSON.parse(error);
        console.log(jsonResponse);
    }
}

makeRequest();