/* You should implement your request handler function in this file.
 * But you need to pass the function to http.createServer() in
 * basic-server.js.  So you must figure out how to export the function
 * from this file and include it in basic-server.js. Check out the
 * node module documentation at http://nodejs.org/api/modules.html. */

var messageModel = require('./messageModel');
var messageMaster = messageModel.messageMaster;

var getMessages = function(request, response, headers, room){
  if(headers){headers['Content-Type'] = "application/json";}
  response.writeHead(200, headers);
  response.end(JSON.stringify(messageMaster.getRoomMessages(room) ));
};

  

exports.handleRequest = function(request, response, headers) {
  var room = request.url.split('/');
  room = room[room.length-1];
  if (request.method === "GET" && request.url.indexOf("/1/classes/") === 0 ){
    getMessages(request,response, headers, room);
  } else if(request.method === "GET"){
    send404(response, headers);
  }
  if(request.method === "OPTIONS"){
    send200(response, headers);
  }
  if(request.method === "POST"){
    postMessage(request, response, headers, room);
  }
};



var send404 = function(response, headers){
  response.writeHead(404, headers);
  response.end('[]');
};
var send200 = function(response, headers){
  response.writeHead(200, headers);
  response.end();
};
var postMessage = function(request, response, headers, room){
    console.log('posted');
    response.writeHead(302, headers);
    response.end();
    request.on("data", function(data){
      messageMaster.writeToFile(data,room);
      response.writeHead(302, headers);
      response.end();
    });    
};  




