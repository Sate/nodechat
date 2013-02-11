/* Import node's http module: */
var http = require("http");
var handler = require("./request-handler.js");
var connect = require('connect');
var messageModel = require('./messageModel');
var messageMaster = messageModel.messageMaster;

/* Import our custom Cross-Origin Resource Sharing (CORS) code: */
var defaultCorsHeaders = require("./lib/cors.js").defaultCorsHeaders;
/* This CRUCIAL code allows this server to talk to websites that
 * are on different domains. (Your chat client is running from a url
 * like file://your/chat/client/index.html, which is considered a
 * different domain.) */

messageMaster.loadFromFile();
/* This is the callback function that will be called each time a
 * client (i.e.. a web browser) makes a request to our server. */
var requestListener = function (request, response) {
  // var statusCode = 200;
  // headers['Content-Type'] = "text/plain";
  var headers = defaultCorsHeaders();

  handler.handleRequest(request,response, headers);
};

/* Every server needs to listen on a port with a unique number. The
 * standard port for HTTP servers is port 80, but that port is
 * normally already claimed by another server and/or not accessible to
 * user processes, so we'll use a higher port number that is not
 * likely to be taken: */
var port = process.env.PORT;

/* For now, since you're running this server on your local machine,
 * we'll have it listen on the IP address 127.0.0.1, which is a
 * special address that always refers to localhost. */
var ip = "127.0.0.1";

/* Use node's http module to create a server and start it listening on
 * the given port and IP. */
var server = connect.createServer();
server.use(connect.static('public'));
server.use(function(req, res){
  requestListener(req, res);
});
console.log("Listening on http://" + ip + ":" + port);
server.listen(port);

/* To start this server, run:
     node basic-server.js
 *  on the command line.

 * To connect to the server, load http://127.0.0.1:8080 in your web
 * browser.

 * server.listen() will continue running as long as there is the
 * possibility of serving more requests. To stop your server, hit
 * Ctrl-C on the command line. */
