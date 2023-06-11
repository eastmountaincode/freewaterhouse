<html>
<head>
    <title>Virtual Lending Library</title>
    <style type="text/css">
    </style>
</head>
<body>
    <h1>Virtual Lending Library</h1>
    <br>
    <h1>Box 1</h1>
    <div id = "uploadArea">
        <div id="fileInfo"></div>
        <input type="file" id="fileSelect" name="attachments[]">
        <button id="uploadButton" disabled>Upload</button>
        <button id="downloadButton" disabled>Download</button>
        <div id="uploadProgress" style="width: 0%; height: 20px; background: green;"></div>
        <p id="progressPercent"></p>
        <p id="uploadSuccessMessage"></p>
        <h1 id="progress1"></h1>
        <h1 id="error"></h1>
        <h1 id="files"></h1>
    </div>

    <script src="main.js"></script>

</body>
</html>



