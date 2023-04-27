// Get references to the DOM elements we will be using
const lendingBox = $('#lending-box');
const fileInput = $('#file-input');
const uploadBtn = $('#upload-btn');

// Check if a file has been uploaded
if (localStorage.getItem('uploadedFile')) {
	// If a file has been uploaded, display an icon indicating that the box is not empty
	lendingBox.html('<p>File uploaded. <a href="#" id="download-link">Download</a></p>');
	
	// Add a click handler to the "Download" link
	$('#download-link').on('click', function() {
		// When the link is clicked, download the file and delete it from storage
		const fileUrl = localStorage.getItem('uploadedFile');
		window.location.href = fileUrl;
		localStorage.removeItem('uploadedFile');
		
		// Reset the lending box to its empty state
		lendingBox.html('<p>Box is empty.</p>');
		
		// Prevent the default link behavior (which is to navigate to a new page)
		return false;
	});
}

// Add a click handler to the "Upload" button
uploadBtn.on('click', function() {
	// When the button is clicked, trigger the file input click event
	fileInput.click();
});

// Add a change handler to the file input
fileInput.on('change', function() {
	// When a file is selected, upload it and store its URL in local storage
	const file = fileInput[0].files[0];
	const fileUrl = URL.createObjectURL(file);
	localStorage.setItem('uploadedFile', fileUrl);
	
	// Update the lending box to indicate that a file has been uploaded
	lendingBox.html('<p>File uploaded. <a href="#" id="download-link">Download</a></p>');
	
	// Add a click handler to the "Download" link
    $('#download-link').on('click', function() {
        // When the link is clicked, download the file and delete it from storage
        const fileUrl = localStorage.getItem('uploadedFile');
        window.location.href = fileUrl;
        localStorage.removeItem('uploadedFile');
        // Reset the lending box to its empty state
	    lendingBox.html('<p>Box is empty.</p>');
	
	    // Prevent the default link behavior (which is to navigate to a new page)
	    return false;
    });
});
