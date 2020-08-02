$(document).ready(function () {
    var userID = window.sessionStorage.getItem("userId");
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
            var currentDate = moment().startOf('day').hour(12);
            var expirationFormatted = moment(result[i].expiration + "T12:00:00");
            let diffInDays = expirationFormatted.diff(currentDate, 'days');
            let formattedDays = diffInDays + " days left";
            if(diffInDays === 0){
                formattedDays = "expiring today";
                $(newTdExpiration).css({
                    "color":"darkorange",
                    "font-weight":"bold"}
                    );
            }
            else if(diffInDays < 0){
                formattedDays = "expired";
                $(newTdExpiration).css({
                    "color":"crimson",
                    "font-weight":"bold"}
                    );
            }
            newTdExpiration.append(formattedDays);
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
