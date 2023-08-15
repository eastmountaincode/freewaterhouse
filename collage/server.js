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

app.use('/collage/uploaded_images', express.static(path.join(__dirname, 'collage', 'uploaded_images')));
app.use('/collage', express.static(path.join(__dirname, 'public')));
app.use('/uploaded_images', express.static(path.join(__dirname, 'collage', 'uploaded_images')));


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
        console.log('Both SQLite3 and WebSocket connections have been established');

        wss.on('connection', function connection(ws) {
            console.log('A new client connected!');

            db.all('SELECT id FROM images', [], (err, rows) => {
                if (err) {
                    throw err;
                }
                // rows will contain an array of results, e.g. [{id: 'Basketball.png'}, {id: 'coins.png'}]
    
                const imageNames = rows.map(row => row.id);
                console.log(imageNames);
    
                // Send image names only to this client
                ws.send(JSON.stringify({
                    type: 'initialImageNames',
                    images: imageNames
                }));
    
            });

            wss.on('message', function incoming(message) {
                //console.log('received: %s', message);
                
                const data = JSON.parse(message);
                
                if (data.type === "getInitialPositionAndSize") {
                    db.each('SELECT id, x, y, width, height FROM images', (err, row) => {
                        if (err) {
                            throw err;
                        }

                        wss.send(JSON.stringify({
                            type: 'updateInitialPositionAndSize',
                            id: row.id,
                            x: row.x,
                            y: row.y,
                            width: row.width,
                            height: row.height
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
                } else if (data.type === "updateSizeOnSocketResizing") {
                    //console.log("server got updateSizeOnSocketResizing")
                    wss.clients.forEach(function each(client) {
                        // Exclude the client that made the request
                        if (client !== ws && client.readyState === WebSocket.OPEN) {
                            client.send(JSON.stringify({
                                type: 'updateSizeOnServerResizing',
                                id: data.id,
                                x: data.x,
                                y: data.y,
                                width: data.width,
                                height: data.height  
                            }));
                        }
                    });
                } else if (data.type === "broadcastFinalPosition") {
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
                } else if (data.type === "updateSizeInDatabase") {
                    let sql = `UPDATE images SET x = ?, y = ?, width = ?, height = ? WHERE id = ?`;
                    db.run(sql, [data.x, data.y, data.width, data.height, data.id], function(err) {
                        if (err) {
                            return console.error(err.message);
                        }
                        console.log(`Size (and position) updated for id: ${data.id}`);
                    });
                } else if (data.type === "broadcastFinalSize") {
                    wss.clients.forEach(function each(client) {
                        // Exclude the client that made the request
                        if (client !== ws && client.readyState === WebSocket.OPEN) {
                            client.send(JSON.stringify({
                                type: 'updateSizeOnServerResizing',
                                id: data.id,
                                x: data.x,
                                y: data.y,
                                width: data.width,
                                height: data.height  
                            }));
                        }
                    });
                }
            });
            
        });
    })
    .catch(err => {
        console.error('Failed to connect to either SQLite3 or WebSocket', err);
        process.exit(1);  // This will stop the server in case of a connection error
    });







