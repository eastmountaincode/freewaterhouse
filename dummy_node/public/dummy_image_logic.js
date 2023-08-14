// Create WebSocket connection.
const socket = new WebSocket('wss://freewaterhouse.com/ws2');
 
// Connection opened
socket.addEventListener("open", (event) => {
    console.log("Connected to websocket server dummy time");
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
          }
        }
      });
});
