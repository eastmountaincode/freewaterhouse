// Create WebSocket connection.
const socket = new WebSocket((window.location.protocol === "https:" ? "wss://" : "ws://") + window.location.host + "/ws");
    
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
    } else if (data.type === 'updatePositionOnServerDragging') {
        let image = document.getElementById(data.id);
        //console.log("Moving image to position: ", data.position);
        image.style.left = data.x + 'px';
        image.style.top = data.y + 'px';
    } else {
        console.error('Received unknown message type: ', data.type);
    }
});

// Make the image draggable
const images = document.querySelectorAll("img");
const imageArea = document.querySelector("#imageArea");
const imageAreaRect = imageArea.getBoundingClientRect();

let mouseX = 0;
let mouseY = 0;
let imgOffsetX = 0;
let imgOffsetY = 0;
let isDragging = false;
let draggedImage = null;

images.forEach(image => {
    image.addEventListener("mousedown", (event) => {
        isDragging = true;
        draggedImage = event.target;  // Store the dragged image
        imgOffsetX = draggedImage.offsetLeft - event.clientX;
        imgOffsetY = draggedImage.offsetTop - event.clientY;
    });
});

document.addEventListener("mouseup", () => {
    //console.log('mouseup occur!');
    if (draggedImage) {
        socket.send(JSON.stringify({
                type: 'updatePositionInDatabase',
                id: draggedImage.id, 

                // should probably fix this
                x: confirmedNewX,
                y: confirmedNewY     
            }));
        isDragging = false;
        draggedImage = null;  // Clear the dragged image
    }
});

document.addEventListener("mousemove", (event) => {
    event.preventDefault();
    if (isDragging && draggedImage) {
        // Position of the mouse pointer within the browser's viewport
        mouseX = event.clientX;
        mouseY = event.clientY;

        let prospectiveNewX = mouseX + imgOffsetX;
        let prospectiveNewY = mouseY + imgOffsetY;

        //let imageAreaRect = imageArea.getBoundingClientRect();
        let draggedImageRect = draggedImage.getBoundingClientRect();

        let maxPosX = imageAreaRect.width - draggedImageRect.width;
        let maxPosY = imageAreaRect.height - draggedImageRect.height;

        // LEFT WALL
        if (prospectiveNewX < 0) {
            prospectiveNewX = 0;
        }
        // TOP WALL
        if (prospectiveNewY < 0) {
            prospectiveNewY = 0;
        }
        // RIGHT WALL
        if (prospectiveNewX > maxPosX) {
            prospectiveNewX = maxPosX;
        }
        // BOTTOM WALL
        if (prospectiveNewY > maxPosY) {
            prospectiveNewY = maxPosY;
        }

        confirmedNewX = prospectiveNewX;
        confirmedNewY = prospectiveNewY;

        draggedImage.style.left = confirmedNewX + 'px';
        draggedImage.style.top = confirmedNewY + 'px';

        socket.send(JSON.stringify({
            type: 'updatePositionOnSocketDragging',
            id: draggedImage.id,  // include the ID in the message
            x: confirmedNewX,
            y: confirmedNewY  
            
        }));
    }
});