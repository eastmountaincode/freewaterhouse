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
// This is if we get a message from the server...
socket.addEventListener("message", (event) => {
    console.log("Received from server: ", event.data); 
    const data = JSON.parse(event.data);

    if (data.type === 'updateInitialPosition') {
        console.log("updating initial position for", data.id);
        let image = document.getElementById(data.id);
        image.style.left = data.x + 'px';
        image.style.top = data.y + 'px';
        image.setAttribute("data-x", data.x);
        image.setAttribute("data-y", data.y);
    } else if (data.type === 'updatePositionOnServerDragging') {
        let image = document.getElementById(data.id);
        //console.log("Moving image to position: ", data.position);
        image.style.left = data.x + 'px';
        image.style.top = data.y + 'px';
        image.setAttribute("data-x", data.x);
        image.setAttribute("data-y", data.y);
    } else {
        console.error('Received unknown message type: ', data.type);
    }
});

socket.addEventListener('error', (error) => {
    console.error('WebSocket Error:', error);
});

let updateTimer; // A variable to hold the timer for throttling
const throttleDelay = 100; // Delay of 100 milliseconds

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

            // // Throttle the position update messages
            // clearTimeout(updateTimer); // Clear any existing timer
            // updateTimer = setTimeout(() => {
            //     socket.send(JSON.stringify({
            //         type: 'updatePositionOnSocketDragging',
            //         id: event.target.id,
            //         x: x,
            //         y: y  
            //     }));
            // }, throttleDelay);

            socket.send(JSON.stringify({
              type: 'updatePositionOnSocketDragging',
              id: event.target.id,
              x: x,
              y: y  
            }));
          },
          end(event) {
            // Ensure the final position is sent immediately when dragging ends
            clearTimeout(updateTimer);

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
          }
        }
      });
});

// // Make the image draggable
// const images = document.querySelectorAll("img");
// const imageArea = document.querySelector("#imageArea");
// const imageAreaRect = imageArea.getBoundingClientRect();

// let mouseX = 0;
// let mouseY = 0;
// let imgOffsetX = 0;
// let imgOffsetY = 0;
// let isDragging = false;
// let draggedImage = null;

// images.forEach(image => {
//     image.addEventListener("mousedown", startDrag);
//     image.addEventListener("touchstart", startDrag);
// });

// document.addEventListener("mouseup", endDrag);
// document.addEventListener("touchend", endDrag);

// document.addEventListener("mousemove", drag);
// document.addEventListener("touchmove", drag);

// function startDrag(event) {
//     event.preventDefault();
//     if (event.type === 'touchstart') {
//         event = event.touches[0];  // get the first touch event
//     }

//     isDragging = true;
//     draggedImage = event.target;  // Store the dragged image
//     imgOffsetX = draggedImage.offsetLeft - event.clientX;
//     imgOffsetY = draggedImage.offsetTop - event.clientY;
// }

// function endDrag() {
//     if (draggedImage) {
//         socket.send(JSON.stringify({
//             type: 'updatePositionInDatabase',
//             id: draggedImage.id,
//             x: confirmedNewX,
//             y: confirmedNewY
//         }));
//         isDragging = false;
//         draggedImage = null;  // Clear the dragged image
//     }
// }

// function drag(event) {
//     if (event.type === 'touchmove') {
//         event = event.touches[0];  // get the first touch event
//     }

//     if (isDragging && draggedImage) {
//         // Position of the mouse pointer within the browser's viewport
//         mouseX = event.clientX;
//         mouseY = event.clientY;

//         let prospectiveNewX = mouseX + imgOffsetX;
//         let prospectiveNewY = mouseY + imgOffsetY;

//         //let imageAreaRect = imageArea.getBoundingClientRect();
//         let draggedImageRect = draggedImage.getBoundingClientRect();

//         let maxPosX = imageAreaRect.width - draggedImageRect.width;
//         let maxPosY = imageAreaRect.height - draggedImageRect.height;

//         // LEFT WALL
//         if (prospectiveNewX < 0) {
//             prospectiveNewX = 0;
//         }
//         // TOP WALL
//         if (prospectiveNewY < 0) {
//             prospectiveNewY = 0;
//         }
//         // RIGHT WALL
//         if (prospectiveNewX > maxPosX) {
//             prospectiveNewX = maxPosX;
//         }
//         // BOTTOM WALL
//         if (prospectiveNewY > maxPosY) {
//             prospectiveNewY = maxPosY;
//         }

//         confirmedNewX = prospectiveNewX;
//         confirmedNewY = prospectiveNewY;

//         draggedImage.style.left = confirmedNewX + 'px';
//         draggedImage.style.top = confirmedNewY + 'px';

//         socket.send(JSON.stringify({
//             type: 'updatePositionOnSocketDragging',
//             id: draggedImage.id,  // include the ID in the message
//             x: confirmedNewX,
//             y: confirmedNewY  
            
//         }));
//     }
// }
