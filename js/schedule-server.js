var restify = require('restify');
var fs = require('fs');
var sendmail = require('sendmail')({silent: false});
var PATH = '/schedule-corticella';
var MPATH = '/messages';
//var obj = $.parseJSON( '{ "name": "John" }' );
 var shifts = [
    {
        date: "2017-02-02T00:00:00",
        turni: "1 \u2013 2"
    },
    {
        date: "2017-02-03T00:00:00",
        turni: "1 \u2013 2"
    },
    {
        date: "2017-02-04T00:00:00",
        turni: "1 \u2013 2"
    },
    {
        date: "2017-02-05T00:00:00",
        turni: 0
    },
    {
        date: "2017-02-06T00:00:00",
        turni: 0
    },
    {
        date: "2017-02-07T00:00:00",
        turni: "1 \u2013 2"
    },
    {
        date: "2017-02-08T00:00:00",
        turni: "1 \u2013 2"
    },
    {
        date: "2017-02-09T00:00:00",
        turni: "1 \u2013 2"
    }
 ];

// var shifts = require('./turni.json');
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
	res.send(200, shifts);
	next();
}
function getMessage(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin','*');
	console.log("GET[" + MPATH + "] " + JSON.stringify(msg));
	res.send(200, msg);
	next();
};

// function getshift() {
// 		$.ajax({
// 		    url: "turni.json",
// 		    type: "GET",
// 		    success: function(result) {
// 				return JSON.stringify(result);
// 		    }
// 		});
// 	};

function addMessage(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin','*');
	console.log("POST[" + MPATH + "] " + JSON.stringify(req.body));

	currentIdCount = currentIdCount + 1;
	var msgId = currentIdCount * 1000;
	req.body.id = msgId.toString();
	sendmail({
		    from: JSON.stringify(req.body.emailAddress),
		    to: 'claudio.tubertini@gmail.com',
		    subject: JSON.stringify(req.body.subject) +' from ' + JSON.stringify(req.body.emailAddress),
		    html: JSON.stringify(req.body.message),
			  },
			  function(err, reply) {
				    console.log(err && err.stack);
				    console.dir(reply);
			});
	msg.push(req.body);
	writeMsg(JSON.stringify(msg));
	res.send(200, msgId);
	next();
};
// function writeMsg( string ){
// 	fs.writeFile("/home/claudio/corticella.json", string, function(err) {
// 	    if(err) {
// 	        return console.log(err);
// 	    }

// 	    console.log("The file was saved!");
// 	});
// }



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