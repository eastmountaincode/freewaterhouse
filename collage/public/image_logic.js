// Create WebSocket connection.
const socket = new WebSocket('wss://freewaterhouse.com/ws');
 
// Connection opened
socket.addEventListener("open", (event) => {
    console.log("Connected to websocket server");

    socket.send(JSON.stringify({
        type: 'getInitialPositionAndSize'
    }));
});

// Listen for messages
// This is if we get a message from the server...
socket.addEventListener("message", (event) => {
    console.log("Received from server: ", event.data); 
    const data = JSON.parse(event.data);

    if (data.type === 'updateInitialPositionAndSize') {
        console.log("updating initial position for", data.id);
        let image = document.getElementById(data.id);
        image.style.left = data.x + 'px';
        image.style.top = data.y + 'px';

        image.style.width = data.width + 'px';
        image.style.height = data.height + 'px';

        image.setAttribute("data-x", data.x);
        image.setAttribute("data-y", data.y);
    } else if (data.type === 'updatePositionOnServerDragging') {
        let image = document.getElementById(data.id);
        //console.log("Moving image to position: ", data.position);
        image.style.left = data.x + 'px';
        image.style.top = data.y + 'px';
        image.setAttribute("data-x", data.x);
        image.setAttribute("data-y", data.y);
    } else if (data.type === "updateSizeOnServerResizing") {
        let image = document.getElementById(data.id);
        image.style.width = data.width + 'px';
        image.style.height = data.height + 'px';

        image.style.left = data.x + 'px';
        image.style.top = data.y + 'px';
        image.setAttribute('data-x', data.x);
        image.setAttribute('data-y', data.y);
    }
    else {
        console.error('Received unknown message type: ', data.type);
    }
});

socket.addEventListener('error', (error) => {
    console.error('WebSocket Error:', error);
});

let shouldSendUpdateMove = true;
let shouldSendUpdateResize = true;

document.addEventListener("DOMContentLoaded", function() { 
    // Make all images inside the #imageArea draggable
    interact("#imageArea img")
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
  
                event.target.style.left = x + "px";
                event.target.style.top = y + "px";

                // Update the position attributes
                event.target.setAttribute("data-x", x);
                event.target.setAttribute("data-y", y);

                if (shouldSendUpdateMove) {
                    socket.send(JSON.stringify({
                        type: 'updatePositionOnSocketDragging',
                        id: event.target.id,
                        x: x,
                        y: y  
                    }));
                    shouldSendUpdateMove = false;
                    setTimeout(() => {
                        shouldSendUpdateMove = true;
                    }, 25);
                }
            },
            end(event) {
                const target = event.target;
                const id = target.id;
                const x = parseFloat(target.getAttribute("data-x")) || 0;
                const y = parseFloat(target.getAttribute("data-y")) || 0;

                socket.send(JSON.stringify({
                    type: 'updatePositionInDatabase',
                    id: id,
                    x: x,
                    y: y
                }));

                // Broadcast the final position to all clients to ensure sync
                socket.send(JSON.stringify({
                    type: 'broadcastFinalPosition',
                    id: id,
                    x: x,
                    y: y
                }));

          }
        }
      })
    .resizable({
        preserveAspectRatio: true,
        edges: { left: true, right: true, bottom: true, top: true },
        modifiers: [
            // // Maintain the aspect ratio.
            // interact.modifiers.aspectRatio({
            //     ratio: 'preserve', // Preserve the aspect ratio
            // }),
            // Restrict the size.
            interact.modifiers.restrictSize({
                min: { width: 25, height: 25 } // Minimum width and height
            }),
            // Restrict the edges.
            interact.modifiers.restrictEdges({
                outer: 'parent'
            })
        ],
        listeners: {
            move(event) {
                var target = event.target,
                    x = (parseFloat(target.getAttribute('data-x')) || 0),
                    y = (parseFloat(target.getAttribute('data-y')) || 0);

                target.style.width = event.rect.width + 'px';
                target.style.height = event.rect.height + 'px';

                x += event.deltaRect.left;
                y += event.deltaRect.top;

                target.style.left = x + 'px';
                target.style.top = y + 'px';
                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);

                if (shouldSendUpdateResize) {
                    socket.send(JSON.stringify({
                        type: 'updateSizeOnSocketResizing',
                        id: event.target.id,
                        x: x,
                        y: y,
                        width: event.rect.width,
                        height: event.rect.height  
                    }));
                    shouldSendUpdateResize = false;
                    setTimeout(() => {
                        shouldSendUpdateResize = true;
                    }, 25);
                }
            },
            end(event) {
                const target = event.target;
                const id = target.id;
                const width = target.style.width;
                const height = target.style.height;

                // socket.send(JSON.stringify({
                //     type: 'updateImageSize',
                //     id: id,
                //     width: width,
                //     height: height
                // }));
            }
        }
    });
});