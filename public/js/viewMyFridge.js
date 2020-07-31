$(document).ready(function () {
    var userID = 1 //to be updated with session storage id
    $.get("/api/items/" + userID).then(function (result) {
        console.log(result)

        console.log(result[0].Category.name)

        var tb = $("#tableItems");


        for (var i = 0; i < result.length; i++) {
            var newTr = $("<tr>");
            var newTdName = $('<td>');
            var newTdDate = $('<td>');
            var newTdExpiration = $('<td>');
            var newTdQuantity = $('<td>');
            var newTdUnit = $('<td>');
            var newTdCategory = $('<td>');

            newTdName.append(result[i].name);
            newTdDate.append(result[i].date_purchased);
            newTdExpiration.append(result[i].expiration);
            newTdQuantity.append(result[i].quantity);
            newTdUnit.append(result[i].unit_measurement);
            newTdCategory.append(result[i].Category.name)
            newTr.append(newTdName, newTdDate, newTdExpiration, newTdQuantity, newTdUnit, newTdCategory)
            tb.append(newTr)

        }


    })

    // function GetFridgeItems() {
    //     var queryURL = "/api/item";
    //     $.ajax({
    //         url: queryURL,
    //         method: "GET"
    //     }).then(function (response) {
    //         console.log(response);

    //         for (var i = 0; i < response.length; i++) {

    //             Tb = $("#tableItems");
    //             newTr = $("<tr>");
    //             //Name
    //             itemName = $("<td>").text(response.name);
    //             itemName.attr("class", "text-info")
    //             itemName.attr("scope", "row")
    //             newTr.append(itemName);

    //             //Date purchased
    //             DatePurchased = $("<td>").text(response.date_purchased);
    //             newTr.append(DatePurchased);
    //             //Expiration
    //             expiration = $("<td>").text(response.expiration);
    //             newTr.append(expiration);
    //             //Quantity
    //             quantity = $("<td>").text(response.quantity);
    //             newTr.append(quantity);
    //             //UnitMeasurement
    //             unitMeasurement = $("<td>").text(response.unit_measurement);
    //             newTr.append(unitMeasurement);
    //             //Category
    //             category = $("<td>").text(response.category);
    //             newTr.append(category);
    //             Tb.append(newTr);

    //         }



    //     })
    // }

    // GetFridgeItems();




});
