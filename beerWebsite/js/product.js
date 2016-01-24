var data = {
	"beer":[
		{	
			"img":"beer1.png",
			"name":"AAAAAA",
			"price":"$100.00",
			"status":0
		},
		{	
			"img":"beer2.png",
			"name":"BBBBBB",
			"price":"$200.00",
			"status":0
		}
	],
	"food":[
		{
			"img":"beer3.png",
			"name":"CCCC",
			"price":"$100.00",
			"status":0

		},
		{
			"img":"beer4.png",
			"name":"DDDD",
			"price":200.00,
			"status":1
		}

	]
};
products = {
	"AAAAAA":{
		"description":"this is the A type of bear",
		"img":"beer1.png",
		"info":[
			{
				"bottle":"6 * Bottle 341ml",
				"price":"$18.99",
				"inStock":"9"
			},
			{
				"bottle":"6 * Bottle 341ml",
				"price":"$18.99",
				"inStock":"9"
			}
		]
	},
	"BBBBBB":{
		"description":"this is the B type of bear",
		"img":"beer2.png",
		"info":[
			{
				"bottle":"6 * Bottle 341ml",
				"price":"$18.99",
				"inStock":"9"
			},
			{
				"bottle":"6 * Bottle 341ml",
				"price":"$18.99",
				"inStock":"9"
			}
		]
	},
	"CCCC":{
		"description":"this is the C type of bear",
		"img":"beer3.png",
		"info":[
			{
				"bottle":"6 * Bottle 341ml",
				"price":"$18.99",
				"inStock":"9"
			},
			{
				"bottle":"6 * Bottle 341ml",
				"price":"$18.99",
				"inStock":"9"
			}
		]
	},
	"DDDD":{
		"description":"this is the D type of bear",
		"img":"beer4.png",
		"info":[
			{
				"bottle":"6 * Bottle 341ml",
				"price":"$18.99",
				"inStock":"9"
			},
			{
				"bottle":"6 * Bottle 341ml",
				"price":"$18.99",
				"inStock":"9"
			}
		]
	}
};

function showProduct(_productName){
	$("#products").hide();
	$("#product").show();
	var productNode = $("#product")[0];
	//<div><img></div>
	var img = document.createElement("img");
	img.src = "img/" + products[_productName].img;
	var divImg = document.createElement("div");
	$(divImg).addClass("col-sm-4 col-md-3");
	$(divImg).append(img);
	//<div clo-sm><div
	var div_col = document.createElement("div");
	$(div_col).addClass("col-sm-8 col-md-9");
	var div_panel = document.createElement("div");
	$(div_panel).addClass("panel panel-default");
	var div_heading = '<div class="panel-heading">Description</div>';
	var div_body = '<div class="panel-body"><p>' + products[_productName].description+ '</p></div>';
	var table = document.createElement("table");
	var thead = "<thead><tr><th>Bottle</th><th>Price</th><th>Avaliable In Stock</th></tr></thead>";
	var tbody = document.createElement("tbody");
	var data = products[_productName].info;
	for(var i = 0; i < data.length; i++){
		var tr = document.createElement("tr");
		tr.innerHTML += "<td>"+data[i].bottle + "</td>";
		tr.innerHTML += "<td>"+data[i].price + "</td>";
		tr.innerHTML += "<td>"+data[i].inStock + "</td>";
		$(tbody).append(tr);
	}
	$(table).append(thead, tbody);
	$(table).addClass("table");
	$(div_panel).append(div_heading,div_body,table);
	$(div_col).append(div_panel);
	$(productNode).append(divImg, div_col);
}
var language_soldOut = "Sold Out";
var language_avaliable = "Avaliable";

var product_html = '<div class="col-sm-6 col-md-2"><div class="thumbnail"><img class="product-img" src="img/beer1.png" alt="100%*180"><div class="caption"><p> <a class = "product-name">The best beer of the world</a></p><p class = "product-price">$1.8</p><p><span class="label label-danger product-status">Danger</span></p></div></div></div>';

function loadProduct(_data){
	$("#products").empty();
	var productNode = $("#products")[0];

	var len = _data.length;
	for(var i = 0; i < len; i++)
		productNode.innerHTML += product_html;

	var productName = $(".product-name");
	var productPrice = $(".product-price");
	var productImg = $(".product-img");
	var productStatus = $(".product-status")
	for(var i = 0; i < len; i++){
		productName[i].innerHTML = _data[i].name;
		
		productName[i].addEventListener('click', function() {
			var name = $(this)[0].innerHTML
			showProduct(name);
		}, false);
		productPrice[i].innerHTML = _data[i].price;
		productImg[i].src = "img/"+_data[i].img;
		if(_data[i].status == 0)
		{
			$(productStatus[i]).removeClass("label-danger");
			$(productStatus[i]).addClass("label-default");
			productStatus[i].innerHTML = language_soldOut;

		}
		else{
			productStatus[i].innerHTML = _data[i].status + " " + language_avaliable;			
		}
	}
}







//showProduct("A");