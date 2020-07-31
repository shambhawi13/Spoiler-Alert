
$(document).ready(function() {
    $.get("/api/categories").then(function(result){
        var categories = result;
        console.log(categories);
        var categoryDropDown = $("#category-dropdown");
        for(var i=0; i<categories.length;i++){
            $(categoryDropDown).append(`<option value="${categories[i].id}">${categories[i].name}</option>`)
        }
    })

    $("#Save-newCategory").on("click", function(event) {

        $.post("/api/categories",{
            name:$("#add-category").val().trim(),
        }).then(function(result){
            console.log(result)
            // $.get("/api/categories").then(function(result){
            //     categories = result;
            //     console.log(categories);
            // })
            location.reload()
        })
    });

    $("#add-form").on("submit",function(event){
        event.preventDefault();
        var itemData = {
            name:$("#input-name").val().trim(),
            date_purchased:$("#input-purchased").val(),
            expiration:$("#inputExpiration").val().trim(),
            quantity:$("#inputQuantity").val().trim(),
            unit_measurement:$("#inputMeasurement").val().trim(),
            CategoryId:$("#category-dropdown").val().trim(),
            UserId: 1,
        }
        console.log(itemData);

    })



    
    
});