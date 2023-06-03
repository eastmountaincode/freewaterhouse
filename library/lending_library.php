<html>
<head>
    <title>Virtual Lending Library</title>
    <style type="text/css">
    </style>
</head>
<body>
    <h1>Virtual Lending Library</h1>
    <br>
    <h1>New one</h1>
    <div id = "uploadArea">
        <input type="file" id="fileSelect" name="attachments[]">
        <button id="uploadButton" disabled>Upload</button>
        <button id="downloadButton" disabled>Download</button>
        <div id="uploadProgress" style="width: 0%; height: 20px; background: green;"></div>
        <p id="progressPercent"></p>
        <h1 id="progress1"></h1>
        <h1 id="error"></h1>
        <h1 id="files"></h1>
    </div>

    <script type="text/javascript">
        // Declare a variable to store the selected file
        var selectedFile;

        // Listen for a file selection in the file input
        document.getElementById("fileSelect").addEventListener("change", function(e) {
            // Get the first selected file
            var file = e.target.files[0];

            // If there is no file, log a message and return
            if (!file) {
                console.log("No file chosen");
                return;
            }

            // Check file size
            if (file.size > 209715200) { // 200MB in bytes
                document.getElementById("error").innerText = 'Your file is too big.'
                return;
            } else {
                // If the file size is acceptable, clear any previous error messages
                document.getElementById("error").innerText = '';
            }

            // Store the selected file in the selectedFile variable
            selectedFile = file;

            // Enable the Upload button
            document.getElementById("uploadButton").disabled = false;
        });

        // Listen for a click on the Upload button
        document.getElementById("uploadButton").addEventListener("click", function() {
            // Create new formData instance
            var formData = new FormData();
            // Add the selected file to the formData
            formData.append("attachments[]", selectedFile);

            // Create new XMLHttpRequest
            var xhr = new XMLHttpRequest();

            // Open the connection
            xhr.open('POST', 'upload_handler.php', true);

            // Set the upload progress event
            xhr.upload.addEventListener("progress", function(e) {
                if (e.lengthComputable) {
                    // Calculate the percentage of upload completed
                    var percentComplete = e.loaded / e.total * 100;
                    document.getElementById('uploadProgress').style.width = percentComplete + '%';
                    document.getElementById('progressPercent').textContent = percentComplete.toFixed(2) + '%';

                    // After reaching 100%, wait for 1 second and then reset the progress bar and percentage text
                    if (percentComplete === 100) {
                        setTimeout(function() {
                            document.getElementById('uploadProgress').style.width = '0%';
                            document.getElementById('progressPercent').textContent = '';
                        }, 1000);
                    }
                }
            }, false);

            // Set the callback for when the request completes
            xhr.onload = function() {
                if (this.status == 200) {
                    var data = JSON.parse(this.response);
                    var status = data.status;
                    var msg = data.msg;

                    // The data object contains the data returned by the server.
                    // If the status is 1, the upload was successful.
                    if (status == 1) {
                        document.getElementById("files").innerText = 'got one';
                    } else {
                        // If the status is not 1, an error occurred, so display an error message.
                        document.getElementById("error").innerText = 'error message down below!!';
                    }

                    // Reset the selected file and disable the Upload button again
                    selectedFile = null;
                    document.getElementById("uploadButton").disabled = true;

                    // Call the checkFileStatus function after upload is done.
                    checkFileStatus("1"); // Replace with the desired box number
                } else {
                    console.log('File upload failed');
                    console.log(error);
                }
            };

            // Send the request with the formData
            xhr.send(formData);
        });

        // Function to check file status and adjust visibility of the upload and download buttons
        function checkFileStatus(boxNumber) {
            fetch(`upload_handler.php?checkFile=true&boxNumber=${boxNumber}`)
                .then(response => response.json())
                .then(data => {
                    var status = data.status;

                    var fileSelect = document.getElementById("fileSelect");
                    var uploadButton = document.getElementById("uploadButton");
                    var downloadButton = document.getElementById("downloadButton");

                    if (status == 0) {
                        // No file exists, so enable the file selection and upload buttons and hide the download button
                        fileSelect.disabled = false;

                        // Only enable the Upload button if a file is selected
                        uploadButton.disabled = selectedFile ? false : true;

                        downloadButton.disabled = true;
                        downloadButton.onclick = null; // Remove any onclick event
                    } else {
                        // A file exists, so disable the file selection and upload buttons and show the download button
                        fileSelect.disabled = true;
                        uploadButton.disabled = true;
                        downloadButton.disabled = false;
                        downloadButton.onclick = function() { window.location.href = "download_handler.php?filename=" + data.filename + "&boxNumber=" + boxNumber; };

                    }
                })
                .catch(error => console.error('Error:', error));
        }

        // Check the file status when the page loads
        window.onload = function() {
            var boxNumber = "1"; // Replace with the desired box number
            checkFileStatus(boxNumber);
        };

    </script>
</body>
</html>



