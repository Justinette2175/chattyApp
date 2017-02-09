// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const WebSocket = require('ws');
const uuid = require('node-uuid');

// Set the port to 4000
const PORT = 4000;
let connectedUsers = 0;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

let currentColor = 1;

wss.broadcast = function (data){
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  connectedUsers +=1;
  if (currentColor === 4){
    currentColor = 1;
  }
  else if (currentColor < 4){
    currentColor += 1;
  }
  console.log('Client connected');
  const message = {connectedUsers : connectedUsers, type : "connectedUsers"};
  const colorMessage = {color:currentColor, type:"colorSet"};
  ws.send(JSON.stringify(colorMessage));
  wss.broadcast(message);


  ws.on('message', (message) => {
    message = JSON.parse(message);
    switch (message.type){
      case "message" :
        message.id = uuid.v1();
        wss.broadcast(message);
        break;
      case "notification" :
        message.id = uuid.v1();
        wss.broadcast(message);
        break;
    }


  });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected')
    connectedUsers -=1;
    var message = {connectedUsers : connectedUsers, type : "connectedUsers"}
    wss.broadcast(message);
  });
});