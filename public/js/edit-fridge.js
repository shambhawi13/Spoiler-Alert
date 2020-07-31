$(document).ready(function () {

    //first need call to populate table with data
    //next need to capture inputs on click of update
    //send put request with data
    //add delete on click


    var userID = 1 //to be updated with session storage id
    $.get("/api/items/" + userID).then(function (result) {

        var tb = $("#tableItems");


        for (var i = 0; i < result.length; i++) {
            var newTr = $("<tr>");
            var newTdName = $('<td>');
            var newTdDate = $('<td>');
            var newTdExpiration = $('<td>');
            var newTdQuantity = $('<td>');
            var newTdUnit = $('<td>');
            // var newTdCategory = $('<td>');
            var newQuantity = $(`<td><form class="form-inline">
            <label for="inputPassword2" class="sr-only">Quantity to eat!</label>
            <input type="text" class="form-control m-2" id="inputQuantity" placeholder="Quantity">
        </form></td>`);
            var newEatButton = $(`<td><button type="button" class="btn btn-outline-primary" data-value="${result[i].id}">Eat it!</button></td>`)
            var newDelButton = $(`<td><button type="button" class="btn btn-outline-danger" data-value="${result[i].id}">Delete it!</button></td>`)

            newTdName.append(result[i].name);
            newTdDate.append(result[i].date_purchased);
            newTdExpiration.append(result[i].expiration);
            newTdQuantity.append(result[i].quantity);
            newTdUnit.append(result[i].unit_measurement);
            // newTdCategory.append(result[i].Category.name)

            newTr.append(newTdName, newTdDate, newTdExpiration, newTdQuantity, newTdUnit, newQuantity, newEatButton, newDelButton)
            tb.append(newTr)

        }


    })



    // $.put("/api/item/" + userID).then(function (result) {

    // })

    // function updateItem(item) {
    //     $.ajax({
    //       method: "PUT",
    //       url: "/api/item"+userID,
    //       data: item
    //     })
    //       .then(function() {
    //         ;
    //       });
    //   }
})