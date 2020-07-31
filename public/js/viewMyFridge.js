$(document).ready(function(){

function GetFridgeItems(){ 
    var queryURL = "/api/item";
    $.ajax({
        url:queryURL,
        method:"GET"
    }).then(function(response){
        console.log(response);

        Tb = $("#tableItems");
        newTr = $("<tr>");
        
        itemName = $("<td>").text(response.name);
        itemName.attr("class", "text-info")
        itemName.attr("scope", "row")
        newTr.append(itemName);
        
        
        DatePurchased = $("<td>").text(response.date_purchased);
        newTr.append(DatePurchased);
        
        expiration = $("<td>").text(response.expiration);
        newTr.append(expiration);
        
        quantity = $("<td>").text(response.quantity);
        newTr.append(quantity);
        
        unitMeasurement = $("<td>").text(response.unit_measurement);
        newTr.append(unitMeasurement);
        
        category = $("<td>").text(response.category);
        newTr.append(category);
        Tb.append(newTr);
    
    }) 
 }

   
        



});
