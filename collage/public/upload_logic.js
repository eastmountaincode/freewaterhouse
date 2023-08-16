const imageInput = document.getElementById('imageInput');
const uploadButton = document.getElementById('uploadButton');
const uploadProgress = document.getElementById('uploadProgress');

imageInput.addEventListener('change', function () {
    if (this.files && this.files[0]) {
        uploadButton.disabled = false;
    }
});

uploadButton.addEventListener('click', function () {
    const formData = new FormData();
    formData.append('image', imageInput.files[0]);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/collage/upload', true);

    xhr.upload.onprogress = function (e) {
        if (e.lengthComputable) {
            const percent = (e.loaded / e.total) * 100;
            uploadProgress.value = percent;
        }
    };

    xhr.onload = function () {
        if (this.status === 200) {
            alert('Image uploaded successfully!');
    
            const imageName = imageInput.files[0].name;
    
            const imgElement = document.createElement("img");
            imgElement.src = `/collage/uploaded_images/${imageName}`;
            imgElement.alt = imageName;
            imgElement.id = imageName;
    
            // This function will resize the image according to its aspect ratio
            imgElement.onload = function() {
                const originalWidth = this.naturalWidth;
                const originalHeight = this.naturalHeight;
                let newWidth, newHeight;
                console.log(originalWidth);
                console.log(originalHeight);
    
                if (originalWidth > originalHeight) {
                    newWidth = 150;
                    newHeight = (originalHeight / originalWidth) * 150;
                } else if (originalWidth < originalHeight) {
                    newHeight = 150;
                    newWidth = (originalWidth / originalHeight) * 150;
                } else {
                    newWidth = 150;
                    newHeight = 150;
                }
                console.log(newWidth);
                console.log(newHeight);

                let image = document.getElementById(imageName);
    
                image.style.width = newWidth;
                image.style.height = newHeight;

                image.style.left = 0 + 'px';
                image.style.top = 0 + 'px';

                image.setAttribute("data-x", 0);
                image.setAttribute("data-y", 0);
            };
    
            // Append to the image area or any container you want
            imageArea.appendChild(imgElement);
        } else {
            alert('Error uploading image.');
        }
    };

    xhr.send(formData);
});
