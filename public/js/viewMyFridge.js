$(document).ready(function () {

    function GetFridgeItems() {
        var queryURL = "/api/item";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            for (var i = 0; i < response.length; i++) {

                Tb = $("#tableItems");
                newTr = $("<tr>");
                //Name
                itemName = $("<td>").text(response.name);
                itemName.attr("class", "text-info")
                itemName.attr("scope", "row")
                newTr.append(itemName);

                //Date purchased
                DatePurchased = $("<td>").text(response.date_purchased);
                newTr.append(DatePurchased);
                //Expiration
                expiration = $("<td>").text(response.expiration);
                newTr.append(expiration);
                //Quantity
                quantity = $("<td>").text(response.quantity);
                newTr.append(quantity);
                //UnitMeasurement
                unitMeasurement = $("<td>").text(response.unit_measurement);
                newTr.append(unitMeasurement);
                //Category
                category = $("<td>").text(response.category);
                newTr.append(category);
                Tb.append(newTr);

            }



        })
    }






});
