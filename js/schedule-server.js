var restify = require('restify');

var PATH = '/schedule-corticella';
var MPATH = '/messages';
var shifts = [
		{week: "28/11/2016" , description: "A"},
		{week: "29/11/2016", description:"B"},
		{week: "30/11/2016", description:"C"},
		{week: "01/12/2016", description:"D"},
		{week: "02/12/2016", description:"8:30 - 12:30; 15:30 - 19:30"},
		{week: "03/12/2016", description:"F"},
		{week: "04/12/2016", description:"G"},
		{week: "05/12/2016", description:"H"},
		{week: "06/12/2016", description:"Solo sabato 8:30 - 12:30; 15:30 - 19:30"}
];

var msg = [
        { id: "1000", firstName: "", lastName: "", emailAddress: "", subject: "", message: ""},
    ];

var currentIdCount = msg.length;

// function getProducts(req, res, next) {
// 	res.setHeader('Access-Control-Allow-Origin','*');
// 	console.log("GET[" + PATH + "] " + JSON.stringify(products));
// 	res.send(200, products);
// 	next();
// };
function getShifts(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin','*');
	console.log("GET[" + PATH + "] " + JSON.stringify(shifts));
	res.send(200, shifts);
	next();
};
function getMessage(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin','*');
	console.log("GET[" + MPATH + "] " + JSON.stringify(msg));
	res.send(200, msg);
	next();
};
function addMessage(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin','*');
	console.log("POST[" + MPATH + "] " + JSON.stringify(req.body));

	currentIdCount = currentIdCount + 1;
	var msgId = currentIdCount * 1000;
	req.body.id = msgId.toString();
	msg.push(req.body);
	res.send(200, msgId);
	next();
};

// function updateProduct(req, res, next) {
// 	res.setHeader('Access-Control-Allow-Origin','*');
// 	console.log("PUT[" + PATH + "] " + JSON.stringify(req.body));

// 	products.forEach(function(product, index) {
// 		if(req.body.id == product.id) {
// 			product.name = req.body.name;
// 			product.description = req.body.description;
// 			product.price = req.body.price;
// 		}
// 	});

// 	res.send(200);
// 	next();
// };

// function deleteProduct(req, res, next) {
// 	res.setHeader('Access-Control-Allow-Origin','*');
// 	console.log("DELETE[" + PATH + "/" + req.params.id + "]");

// 	products.forEach(function(product, index) {
// 		if(req.params.id == product.id) {
// 			products.splice(index, 1);
// 		}
// 	});
// 	res.send(200, req.params.id);
// 	next();
// };


var server = restify.createServer();
server.use(restify.bodyParser({ mapParams: true }));

server.get(PATH, getShifts);
// server.put(PATH, updateProduct);
server.get(MPATH, getMessage);
server.post(MPATH, addMessage);
// server.del(PATH +'/:id', deleteProduct);

server.listen(8081, '127.0.0.1',function() {
	console.log('%s listening at %s', server.name, server.url);
});