/*Woodchuck Hard Cider - node.js with express*/


var express = require('express');
var app = express();
var path = require('path');
var http = require('http');
var fs = require("fs");
// all environments
app.set('port', process.env.PORT || 14631);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));


http.createServer(function(req, res){


var filename = req.url;

	if(req.url == "/")
		filename = "/index.html";

var ext = path.extname(filename);
var localPath = __dirname;
var validExtensions = {
		".html" : "text/html",	
		".js": "application/javascript",
		".css": "text/css",
		".txt": "text/plain",
		".jpg": "image/jpeg",
		".gif": "image/gif",
		".png": "image/png"
};
var isValidExt = validExtensions[ext];

if(isValidExt) {
	localPath += filename;
	path.exists(localPath, function(exists){
		if(exists){
			console.log("serving file: " + localPath);
			getFile(localPath, res, ext);
		} else {
			console.log('file not found: ' + localPath);
			res.writeHead(404);
			res.end();
		}
	});

} else {
	console.log("Unknown file extension detected: " + ext);

}

}).listen(80);

function getFile(localPath, res, mimeType) {
	fs.readFile(localPath, function(err, contents) {
	if(!err) {
		res.setHeader("Content-Length", contents.length);
		res.setHeader("Content-Type", mimeType);
		res.statusCode = 200;
		res.end(contents);
	} else {
		res.writeHead(500);
		res.end();
	}
});

}

