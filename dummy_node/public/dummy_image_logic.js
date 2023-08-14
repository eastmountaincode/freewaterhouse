// Create WebSocket connection.
const socket = new WebSocket('wss://freewaterhouse.com/ws');
 
// Connection opened
socket.addEventListener("open", (event) => {
    console.log("Connected to websocket server");

});