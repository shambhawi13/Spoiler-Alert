$(document).ready(function () {

    //first need call to populate table with data
    //next need to capture inputs on click of update
    //send put request with data
    //add delete on click


    var userID = 1 //to be updated with session storage id
    $.get("/api/items/" + userID).then(function (result) {

        var tb = $("#tableItems");


        for (var i = 0; i < result.length; i++) {
            var newTr = $(`<tr class="updateItem" data-value="${result[i].id}" data-quantity="${result[i].quantity}">`);
            var newTdName = $('<td>');
            var newTdDate = $('<td>');
            var newTdExpiration = $('<td>');
            var newTdQuantity = $('<td>');
            var newTdUnit = $('<td>');
            // var newTdCategory = $('<td>');
            var newQuantity = $(`<td><form class="form-inline">
            <label for="inputPassword2" class="sr-only">Quantity to eat!</label>
            <input type="text" class="form-control m-2" id="inputQuantity${result[i].id}" placeholder="Quantity">
        </form></td>`);
            var newEatButton = $(`<td><button type="button" class="btn btn-outline-primary" data-value="${result[i].id}">Eat it!</button></td>`)
            var newDelButton = $(`<td><button type="delete" class="btn btn-outline-danger" data-value="${result[i].id}">Delete it!</button></td>`)

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

    $(document).on("click", ".updateItem", captureUpdate);


    function captureUpdate (event){
        event.preventDefault();
        if (event.target.matches("button")) {
            console.log($(this))
            var value = $(this).attr("data-value")
            var prevQuantity = $(this).attr("data-quantity")
            var redQuantity = $(`#inputQuantity${value}`).val().trim();

            var itemData = {
                // name:$("#input-name").val().trim(),
                // date_purchased:$("#date-purchased").val(),
                // expiration:$("#inputExpiration").val().trim(),
                quantity: prevQuantity-redQuantity,
                // unit_measurement:$("#inputMeasurement").val().trim(),
                // CategoryId:$("#category-dropdown").val().trim(),
                id: value,
            }
            console.log(itemData);
            updateItem(itemData);
        }


    }

    // $.put("/api/item/" + userID).then(function (result) {

    // })

    function updateItem(item) {
        $.ajax({
          method: "PUT",
          url: "/api/item",
          data: item
        })
          .then(function(response) {
            console.log(response);
            location.reload();
          });
      }
})