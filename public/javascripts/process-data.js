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
        var name = propertiesArr[i];
        if(counts[name]) {
            counts[name] = counts[name] + 1
        }
        else {
            counts[name] = 1;
        }
    }

    var countsKeys = Object.keys(counts);
    var dataArr = [];
    for (var i = 0; i < countsKeys.length; i++) {
        dataArr.push({
            "type": countsKeys[i],
            "count": Object.values(counts)[i]
        });
    }
    var jsonDataArr = JSON.stringify(dataArr);
    console.log(jsonDataArr);
    return jsonDataArr;
}
