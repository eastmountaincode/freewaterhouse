<html>
<head>
    <title>Virtual Lending Library</title>
    <style type="text/css">
    </style>
</head>
<body>
    <h1>Virtual Lending Library</h1>
    <br>
    <div id = "uploadArea1">
        <h1>Box 1</h1>
        <div id="fileInfo1"></div>
        <input type="file" id="fileSelect1" name="attachments[]">
        <button id="uploadButton1" disabled>Upload</button>
        <button id="downloadButton1" disabled>Download</button>
        <div id="uploadProgressBar1" style="width: 0%; height: 20px; background: green;"></div>
        <p id="progressPercent1"></p>
        <p id="uploadSuccessMessage1"></p>
        <p id="error1"></p>
    </div>

    <div id = "uploadArea2">
        <h1>Box 2</h1>
        <div id="fileInfo2"></div>
        <input type="file" id="fileSelect2" name="attachments[]">
        <button id="uploadButton2" disabled>Upload</button>
        <button id="downloadButton2" disabled>Download</button>
        <div id="uploadProgressBar2" style="width: 0%; height: 20px; background: green;"></div>
        <p id="progressPercent2"></p>
        <p id="uploadSuccessMessage2"></p>
        <p id="error2"></p>
    </div>

    <script src="main.js"></script>

</body>
</html>



