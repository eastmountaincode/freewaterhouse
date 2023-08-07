const interact = require('interactjs');

// Create WebSocket connection.
const socket = new WebSocket('wss://freewaterhouse.com/ws');
 
// Connection opened
socket.addEventListener("open", (event) => {
    console.log("Connected to websocket server");

    socket.send(JSON.stringify({
        type: 'getInitialPosition'
    }));
});

// Listen for messages
socket.addEventListener("message", (event) => {
    console.log("Received from server: ", event.data); 
    const data = JSON.parse(event.data);

    if (data.type === 'updateInitialPosition') {
        console.log("updating initial position for", data.id);
        let image = document.getElementById(data.id);
        image.style.left = data.x + 'px';
        image.style.top = data.y + 'px';
    } else if (data.type === 'updatePositionOnServerDragging') {
        let image = document.getElementById(data.id);
        image.style.left = data.x + 'px';
        image.style.top = data.y + 'px';
    } else {
        console.error('Received unknown message type: ', data.type);
    }
});

interact("img")
  .draggable({
    inertia: true,
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent',
        endOnly: true
      })
    ],
    listeners: {
      move(event) {
        let x = (parseFloat(event.target.getAttribute('data-x')) || 0) + event.dx;
        let y = (parseFloat(event.target.getAttribute('data-y')) || 0) + event.dy;
        event.target.style.transform = `translate(${x}px, ${y}px)`;

        // send updates to server when dragging
        socket.send(JSON.stringify({
            type: 'updatePositionOnSocketDragging',
            id: event.target.id,
            x: x,
            y: y  
        }));
      },
      end(event) {
        let x = parseFloat(event.target.getAttribute('data-x')) || 0;
        let y = parseFloat(event.target.getAttribute('data-y')) || 0;

        // send updates to server when dragging ends
        socket.send(JSON.stringify({
            type: 'updatePositionInDatabase',
            id: event.target.id,
            x: x,
            y: y
        }));
      }
    }
  })
  .resizable({
    edges: { left: true, right: true, bottom: true, top: true },
    listeners: {
      move(event) {
        let target = event.target;
        target.style.width = event.rect.width + 'px';
        target.style.height = event.rect.height + 'px';
      },
    },
    modifiers: [
      interact.modifiers.restrictSize({
        min: { width: 100, height: 50 }
      })
    ],
    inertia: true
  });

