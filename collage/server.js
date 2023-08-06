const express = require('express');
const app = express();
const port = 3000;
const server = require('http').createServer(app);
const WebSocket = require('ws');
const MongoClient = require('mongodb').MongoClient;

// Define the route for '/collage'
app.get('/collage', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html')); // send the index.html file
});

app.use(express.static('public'));  // Serving static files from "public" directory

let url = "mongodb://localhost:27017/";
let db, collection;

const mongoPromise = MongoClient.connect(url, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to MongoDB');
        db = client.db("test");
        collection = db.collection("images");
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
        throw err;
    });

const webSocketPromise = new Promise((resolve, reject) => {
    const wss = new WebSocket.Server({ server });

    wss.on('error', function error(err) {
        console.error('Failed to connect to WebSocket', err);
        reject(err);
    });

    server.listen(port, () => {
        console.log(`server is running on http://localhost:${port}`);
        resolve(wss);  // Resolve the promise here
    });
});

Promise.all([mongoPromise, webSocketPromise])
    .then(([mongoResult, wss]) => {
        console.log('Both MongoDB and WebSocket connections have been established');
        wss.on('connection', function connection(ws) {
            console.log('A new client connected!');

            ws.on('message', function incoming(message) {
                //console.log('received: %s', message);
                
                const data = JSON.parse(message);
                
                if (data.type === "getInitialPosition") {
                    //console.log("--entering the getInitialPosition block");
                    // Fetch all documents from the MongoDB collection
                    //console.log("before find block")
                    collection.find().toArray()
                        .then(docs => {
                            //console.log("within find block")
                            docs.forEach(doc => {
                                ws.send(JSON.stringify({
                                    type: 'updateInitialPosition',
                                    id: doc.id,  // include the ID in the message
                                    position: doc.position
                                }));
                            });
                        })
                        .catch(err => {
                            console.error('Failed to get documents from MongoDB', err);
                });
                } else if (data.type === "updatePositionOnSocketDragging") {
                    //console.log('--entering the updatePositionOnSocket block');

                    wss.clients.forEach(function each(client) {
                        // Exclude the client that made the request
                        if (client !== ws && client.readyState === WebSocket.OPEN) {
                            client.send(JSON.stringify({
                                type: 'updatePositionOnServerDragging',
                                id: data.id,
                                position: data.position
                            }));
                        }
                    });
                } else if (data.type === "updatePositionInDatabase") {
                    //console.log('--entering the updatePositionInDatabase block');
                    collection.updateOne({ id: data.id }, { $set: {position: data.position}})
                        .then(() => {
                            console.log('position updated in database');
                        })
                        .catch(err => {
                            console.err('Failed to update document in MongoDB', err);
                        })
                }
            });
            
        });
    })
    .catch(err => {
        console.error('Failed to connect to either MongoDB or WebSocket', err);
        process.exit(1);  // This will stop the server in case of a connection error
    });







