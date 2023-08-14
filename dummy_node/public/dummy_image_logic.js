// Create WebSocket connection.
const socket = new WebSocket('wss://freewaterhouse.com/ws2');
 
// Connection opened
socket.addEventListener("open", (event) => {
    console.log("Connected to websocket server dummy time");

});