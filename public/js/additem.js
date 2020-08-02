
$(document).ready(function() {
    $.get("/api/categories").then(function(result){
        var categories = result;
        console.log(categories);
        var categoryDropDown = $("#category-dropdown");
        $(categoryDropDown).append(`<option value="">choose category</option>`)
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
            date_purchased:$("#date-purchased").val(),
            expiration:$("#inputExpiration").val().trim(),
            quantity:$("#inputQuantity").val().trim(),
            unit_measurement:$("#inputMeasurement").val().trim(),
            CategoryId:$("#category-dropdown").val().trim(),
            UserId: window.sessionStorage.getItem("userId"),
        }
        console.log(itemData);
        if(isEmpty(itemData.name)){
            $("#input-name").addClass("error");
            showErr("Name required");
        }
        else if(isEmpty(itemData.date_purchased)){
            $("#date-purchased").addClass("error");
            showErr("Please select a purchased date");
        }
        else if(isEmpty(itemData.expiration)){
            $("#inputExpiration").addClass("error");
            showErr("Please select an expiration date");
        }
        else if(isEmpty(itemData.quantity)){
            $("#inputQuantity").addClass("error");
            showErr("Please select a valid quantity");
        }
        else if(isEmpty(itemData.unit_measurement)){
            $("#inputMeasurement").addClass("error");
            showErr("Please select a valid unit of measurement");
        }
        else if(isEmpty(itemData.CategoryId)){
            $("#category-dropdown").addClass("error");
            showErr("Please select a valid category from dropdown");
        }
        else{
            $.post("/api/item",itemData).then(function(result){
                console.log(result);
                location.reload();
            }).fail(function(err){
                showErr("Error occured while saving. Please check if all values entered are valid");
            });
            $("#input-name").removeClass("error");
            $("#date-purchased").removeClass("error");
            $("#inputExpiration").removeClass("error");
            $("#inputQuantity").removeClass("error");
            $("#inputMeasurement").removeClass("error");
            $("#category-dropdown").removeClass("error");
        }

    });

    function isEmpty(str){
        if(str === "" || str === null || str === undefined){
            return true;
        }
        return false;
    }

    function showErr(err) {
        $("#alert .msg").text(err);
        $("#alert").fadeIn(500);
    }
    
});