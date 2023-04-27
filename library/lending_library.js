$(document).ready(function() {
	// Check if there is a file uploaded already
	if (localStorage.getItem('file_uploaded') !== null) {
		showFileIcon();
	}
	
	// Handle file upload
	$('#upload-btn').on('click', function() {
		$('#file-input').trigger('click');
	});
	
	$('#file-input').on('change', function() {
		var file = this.files[0];
		uploadFile(file);
	});
	
	function uploadFile(file) {
		var formData = new FormData();
		formData.append('file', file);
		
		$.ajax({
			url: 'upload.php',
			type: 'POST',
			data: formData,
			processData: false,
			contentType: false,
			success: function(response) {
				localStorage.setItem('file_uploaded', response);
				showFileIcon();
			},
			error: function(jqXHR, textStatus, errorMessage) {
				alert('Upload failed: ' + errorMessage);
			}
		});
	}
	
	function showFileIcon() {
		var downloadLink = $('#download-link');
		var filename = localStorage.getItem('file_uploaded');
		downloadLink.attr('href', 'uploaded_files/' + filename);
		downloadLink.html('Download ' + filename);
		
		$('#lending-box p').hide();
		$('#lending-box button').hide();
		downloadLink.show();
		
		// Handle file download
		downloadLink.on('click', function() {
			deleteFile(filename);
			localStorage.removeItem('file_uploaded');
			$('#lending-box p').show();
			$('#lending-box button').show();
			downloadLink.hide();
		});
	}
	
	function deleteFile(filename) {
		$.ajax({
			url: 'delete.php',
			type: 'POST',
			data: {'filename': filename},
			success: function(response) {},
			error: function(jqXHR, textStatus, errorMessage) {
				alert('Failed to delete file: ' + errorMessage);
			}
		});
	}
});

