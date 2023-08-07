const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const http = require('http');
  
const WebSocket = require('ws');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

console.log(__dirname);

// Define the route for '/collage'
app.get('/collage', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); 
});

app.use(express.static('public'));  // Serving static files from "public" directory

let db;
let server;
let wss;

const dbPromise = new Promise((resolve, reject) => {
    db = new sqlite3.Database('./images.db', (err) => {
        if (err) {
            console.error('Failed to connect to SQLite', err);
            reject(err);
        }
        console.log('Connected to the SQLite database.');
        resolve(db);
    });
});

const webSocketPromise = new Promise((resolve, reject) => {
    const server = http.createServer(app);
    const wss = new WebSocket.Server({ server });

    wss.on('error', function error(err) {
        console.error('Failed to connect to WebSocket', err);
        reject(err);
    });

    server.listen(port, () => {
        console.log(`server is running, listing on port:${port}`);
        resolve(wss);  // Resolve the promise here
    });
});

Promise.all([dbPromise, webSocketPromise])
    .then(([db, wss]) => {
        console.log('Both MongoDB and WebSocket connections have been established');
        wss.on('connection', function connection(ws) {
            console.log('A new client connected!');

            ws.on('message', function incoming(message) {
                //console.log('received: %s', message);
                
                const data = JSON.parse(message);
                
                if (data.type === "getInitialPosition") {
                    db.each('SELECT id, x, y FROM images', (err, row) => {
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
                } else if (data.type === "updatePositionInDatabase") {
                    let sql = `UPDATE images SET x = ?, y = ? WHERE id = ?`;
                    db.run(sql, [data.x, data.y, data.id], function(err) {
                        if (err) {
                            return console.error(err.message);
                        }
                        console.log(`Position updated for id: ${data.id}`);
                    });
                }
            });
            
        });
    })
    .catch(err => {
        console.error('Failed to connect to either MongoDB or WebSocket', err);
        process.exit(1);  // This will stop the server in case of a connection error
    });







