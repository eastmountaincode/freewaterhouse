console.log('top of server page');
const express = require('express');
const http = require('http'); // This was missing.
const WebSocket = require('ws');
const app = express();
const port = 3001;
var path = require('path');

app.get('/dummy_node', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dummy.html'));
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    console.log(`Received message => ${message}`);
  });

  ws.send('Hello! Message from server.');
});

server.listen(port, () => {
  console.log(`Dummynode and WebSocket listening at http://localhost:${port}`);
});

