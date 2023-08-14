// Create WebSocket connection.
const socket = new WebSocket('wss://freewaterhouse.com/ws2');
 
// Connection opened
socket.addEventListener("open", (event) => {
    console.log("Connected to websocket server dummy time");

    socket.send(JSON.stringify({
      type: 'getInitialPosition'
    }));
});

// Listen for messages
// This is if we get a message from the server...
socket.addEventListener("message", (event) => {
  console.log("Received from server: ", event.data); 
  const data = JSON.parse(event.data);

  if (data.type === 'updateInitialPosition') {
    console.log("updating initial position for", data.id);
    let image = document.getElementById(data.id);
    image.style.left = data.x + "px";
    image.style.top = data.y + "px";
    image.setAttribute("data-x", data.x);
    image.setAttribute("data-y", data.y);
  } else if (data.type === 'updatePositionOnServerDragging') {
    let image = document.getElementById(data.id);
    image.style.transform = "translate(" + data.x + "px, " + data.y + "px)";
  } else {
      console.error('Received unknown message type: ', data.type);
  }
});

document.addEventListener("DOMContentLoaded", function() { 
    // Make sure the DOM is fully loaded before attaching handlers.

    // Make all images inside the #imageArea draggable
    interact("#imageArea img")  // Selects all img elements inside the #imageArea
      .draggable({
        inertia: false,
        restrict: {
          restriction: "parent",
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
          endOnly: false,
        },
        autoScroll: true,
  
        // Event listeners for dragmove and dragend
        listeners: {
          move(event) {
            var x = (parseFloat(event.target.getAttribute("data-x")) || 0) + event.dx;
            var y = (parseFloat(event.target.getAttribute("data-y")) || 0) + event.dy;
  
            // Translate the element
            event.target.style.transform = "translate(" + x + "px, " + y + "px)";
  
            // Update the position attributes
            event.target.setAttribute("data-x", x);
            event.target.setAttribute("data-y", y);

            socket.send(JSON.stringify({
              type: 'updatePositionOnSocketDragging',
              id: event.target.id,  // include the ID in the message
              x: x,
              y: y  
            }));
          },
          end(event) {
            const target = event.target;

            const id = target.id;

            // Get the x and y positions from the data attributes
            const x = parseFloat(target.getAttribute("data-x")) || 0;
            const y = parseFloat(target.getAttribute("data-y")) || 0;

            socket.send(JSON.stringify({
              type: 'updatePositionInDatabase',
              id: id,
              x: x,
              y: y
            }));
          }
        }
      });
});
