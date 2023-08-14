console.log('top of server page');
const express = require('express');
const http = require('http'); // This was missing.
const WebSocket = require('ws');
const app = express();
const port = 3001;
var path = require('path');
const sqlite3 = require('sqlite3').verbose();

app.get('/dummy_node', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dummy.html'));
});

app.use('/dummy_node', express.static(path.join(__dirname, 'public')));

let db = new sqlite3.Database('./dummy_page.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
      console.error(err.message);
  }
  console.log('Connected to the dummy_page database.');
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', function incoming(message) {
    const data = JSON.parse(message);
    console.log(`Received message => ${message}`);

    if (data.type === "getInitialPosition") {
      db.each('SELECT id, x, y FROM positions', (err, row) => {
          if (err) {
              throw err;
          }

          ws.send(JSON.stringify({
              type: 'updateInitialPosition',
              id: row.id,
              x: row.x,
              y: row.y
          }));
      });
    } else if (data.type === "updatePositionInDatabase") {
      let sql = `UPDATE positions SET x = ?, y = ? WHERE id = ?`;
      db.run(sql, [data.x, data.y, data.id], function(err) {
          if (err) {
              return console.error(err.message);
          }
          console.log(`Position updated for id: ${data.id}`);
      });
    } else if (data.type === "updatePositionOnSocketDragging") {
      //console.log('--entering the updatePositionOnSocket block');

      wss.clients.forEach(function each(client) {
          // Exclude the client that made the request
          if (client !== ws && client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({
                  type: 'updatePositionOnServerDragging',
                  id: data.id,
                  x: data.x,
                  y: data.y
              }));
          }
      });
    }

  });

});

server.listen(port, () => {
  console.log(`Dummynode and WebSocket listening at http://localhost:${port}`);
});

