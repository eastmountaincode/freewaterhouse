<html>
<head>
    <title>Virtual Lending Library</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style type="text/css">
        table {
            border-collapse: collapse;
            width: 100%;
            margin: auto
        }

        th, td {
            border: 1px solid black;
            padding: 15px;
            text-align: left;
        }

        #uploadArea1, #uploadArea2, #uploadArea3, #uploadArea4 {
            padding: 10px;
        }

        h1 {
            text-align: center;
            /*font-family: courier; */
        }

        h3 {
            text-align: center;
        }

        .library {
            position: relative;
            width: 100%;
            padding-top: 50px; /* provide space for the triangle */
            padding-bottom: 0px; /* provide space for the trunk */
        }

        .roof {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 0;
            z-index: 1;
        }

        .roof::before {
            content: "";
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            border-left: 50vw solid transparent;
            border-right: 50vw solid transparent;
            border-bottom: 50px solid gray;
        }

        .trunk {
            position: relative;
            width: 260px;
            height: 500px;
            background-color: gray;
            margin: auto;
        }

        .library_wrapper {
            
        }


        .book_shelf {
            position: absolute;
            top: 50px; /* Adjust this value to move the image down */
            left: 30px;
            width: 40%; /* Adjust this value to control the width of the image */
            max-width: 100vw;
            height: auto;
            z-index: -1;
        }

        /* Style changes for screens larger than 600px */
        @media screen and (min-width: 601px) {
            table {
                /* padding: 0 20px; /* Add padding to the left and right sides */
                width: 90%;
            }
        }

        /* Style changes when the viewport is 600px or less */
        @media screen and (max-width: 600px) {
            table, thead, tbody, th, td, tr { 
                display: block; 
            }
            /* Hide table headers (but not display: none;, for accessibility) */
            thead tr { 
                position: absolute;
                top: -9999px;
                left: -9999px;
            }
            tr { 
                /* border: 1px solid #ccc; */
            }
            
            td { 
                /* Behave like a "row" */
                border: 1px solid black;
                text-align: left;
                padding: 15px;
                /* border-bottom: 1px solid #eee; */
                position: relative;
                /* padding-left: 50%; */
            }
        }
    </style>
</head>
<body>

    <h3>
        <pre>

  ______               _      _ _   _   _        _      _ _                          
 |  ____|             | |    (_) | | | | |      | |    (_) |                         
 | |__ _ __ ___  ___  | |     _| |_| |_| | ___  | |     _| |__  _ __ __ _ _ __ _   _ 
 |  __| '__/ _ \/ _ \ | |    | | __| __| |/ _ \ | |    | | '_ \| '__/ _` | '__| | | |
 | |  | | |  __/  __/ | |____| | |_| |_| |  __/ | |____| | |_) | | | (_| | |  | |_| |
 |_|  |_|  \___|\___| |______|_|\__|\__|_|\___| |______|_|_.__/|_|  \__,_|_|   \__, |
                                                                                __/ |
                                                                               |___/ 

        </pre>
    </h3>
    <br>
    <h3>
        <pre>
        (                  
 )\ )               
(()/( (     (   (   
 /(_)))(   ))\ ))\  
(_))_(()\ /((_)((_) 
| |_  ((_|_))(_))   
| __|| '_/ -_) -_)  
|_|  |_| \___\___|            
        </pre>
    </h3>
    <br>
    <h3>
        <pre>
 (                              
 )\ )      )                    
(()/((  ( /( (      ) (   (     
 /(_))\ )\()))(  ( /( )(  )\ )  
(_))((_|(_)\(()\ )(_)|()\(()/(  
| |  (_) |(_)((_|(_)_ ((_))(_)) 
| |__| | '_ \ '_/ _` | '_| || | 
|____|_|_.__/_| \__,_|_|  \_, | 
                          |__/  
        </pre>
    </h3>

    
    <!-- <img class="book_shelf" src="../images/book_shelf.png" alt="some books"> -->
    <br>
    <div class="library_wrapper">
        <div class="library">
            <div class="roof"></div>
            <table>
                <tr>
                    <td>
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
                    </td>
                    <td>
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
                    </td>
                </tr>
                <tr>
                    <td>
                        <div id = "uploadArea3">
                            <h1>Box 3</h1>
                            <div id="fileInfo3"></div>
                            <input type="file" id="fileSelect3" name="attachments[]">
                            <button id="uploadButton3" disabled>Upload</button>
                            <button id="downloadButton3" disabled>Download</button>
                            <div id="uploadProgressBar3" style="width: 0%; height: 20px; background: green;"></div>
                            <p id="progressPercent3"></p>
                            <p id="uploadSuccessMessage3"></p>
                            <p id="error3"></p>
                        </div>
                    </td>
                    <td>
                        <div id = "uploadArea4">
                            <h1>Box 4</h1>
                            <div id="fileInfo4"></div>
                            <input type="file" id="fileSelect4" name="attachments[]">
                            <button id="uploadButton4" disabled>Upload</button>
                            <button id="downloadButton4" disabled>Download</button>
                            <div id="uploadProgressBar4" style="width: 0%; height: 20px; background: green;"></div>
                            <p id="progressPercent4"></p>
                            <p id="uploadSuccessMessage4"></p>
                            <p id="error4"></p>
                        </div>
                    </td>

                </tr>
            </table>
            <div class="trunk"></div>
        </div>
    </div>

    <script src="main.js"></script>

</body>
</html>



