/* Copyright (c) Adnan Jaswal, 2015. See the file license.txt for copying permission. */
/* Module for products grid client */
var ProductsClient = function (url) {

	/* the base url for the rest service with directory included*/
	var baseUrl = url;

	/* method to retrieve products */
	var getProducts = function(callback) {
		$.ajax({
		    url: baseUrl,
		    type: "GET",
		    success: function(result) {
				console.log("Messages retrieved: " + JSON.stringify(result));
		    	callback(result);
		    }
		});
	};
	var getMyShifts = function(callback) {
        $.ajax({
            url: baseUrl + "/schedule-corticella",
            type: "GET",
                success: function(result) {
                    console.log("Schedule retrieved: " + JSON.stringify(result));
                    callback(result);
                    showMessage(false);
                },
                error: function(){
                    showMessage(true);
                }
            });
        };

	/* method to delete a product */
	var deleteProduct = function(product, callback) {
		console.log("Deleting message with id [" + product.id() + "]");
		$.ajax({
		    url: baseUrl + product.data.id(),
		    type: "DELETE",
		    success: function(result) {
		    	callback(product);
		    }
		});
	};

	/* method to add a product */
	var addProduct = function(product, callback) {
		var plainProduct = ko.toJS(product);
		console.log("Saving product [" + JSON.stringify(plainProduct) + "]");
		$.ajax({
		    url: baseUrl,
		    type: "POST",
		    data:  JSON.stringify(plainProduct),
		    contentType: "application/json",
		    success: function(id) {
		    	callback(product, id);
		    }
		});
	};




	/* method to update a product */
	var updateProduct = function(product, callback) {
		var plainProduct = ko.toJS(product.data);
		console.log("Updating product [" + JSON.stringify(plainProduct) + "]");
		$.ajax({
		    url: baseUrl + "/products",
		    type: "PUT",
		    data:  JSON.stringify(plainProduct),
		    contentType: "application/json",
		    success: function(result) {
		    	callback(product);
		    }
		});
	};

	return {
		/* add members that will be exposed publicly */
		getProducts: getProducts,
		deleteProduct: deleteProduct,
		addProduct: addProduct,
		updateProduct: updateProduct
	};
};