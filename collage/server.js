const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const http = require('http');
  
const WebSocket = require('ws');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const multer = require('multer');
const sizeOf = require('image-size');

console.log(__dirname);

// MULTER STUFF

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploaded_images/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage: storage });

// END MULTER STUFF

// Define the route for '/collage'
app.get('/collage', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); 
});

// Expose the public folder
app.use('/collage', express.static(path.join(__dirname, 'public')));

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
    wss = new WebSocket.Server({ server });

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

        // Endpoint to handle image uploads
        app.post('/collage/upload', upload.single('image'), (req, res) => {
            if (!req.file) {
                return res.status(400).send('No file uploaded.');
            }

            const imageFile = req.file.filename;

            // Get dimensions of uploaded image
            const dimensions = sizeOf(req.file.path);
            const originalWidth = dimensions.width;
            const originalHeight = dimensions.height;
            let newWidth, newHeight;

            if (originalWidth > originalHeight) {
                newWidth = 150;
                newHeight = (originalHeight / originalWidth) * 150;
            } else if (originalWidth < originalHeight) {
                newHeight = 150;
                newWidth = (originalWidth / originalHeight) * 150;
            } else {
                newWidth = 150;
                newHeight = 150;
            }

            // Insert into SQLite
            const sql = `INSERT INTO images(id, x, y, width, height) VALUES(?, ?, ?, ?, ?)`;
            db.run(sql, [imageFile, 0, 0, newWidth, newHeight], function(err) { // Set the new width and height
                if (err) {
                    return res.status(500).send('Failed to add image to database.');
                }
                res.status(200).send('Image uploaded and added to database.');
            });
        });


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

            ws.on('message', function incoming(message) {
                //console.log('received: %s', message);
                
                const data = JSON.parse(message);
                
                if (data.type === "getInitialPositionAndSize") {
                    console.log("enter initial pos and size on server");
                    db.each('SELECT id, x, y, width, height FROM images', (err, row) => {
                        if (err) {
                            throw err;
                        }

                        ws.send(JSON.stringify({
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

            ws.on('close', () => {
                console.log('Client disconnected');
            });
            
        });
    })
    .catch(err => {
        console.error('Failed to connect to either SQLite3 or WebSocket', err);
        process.exit(1);  // This will stop the server in case of a connection error
    });







