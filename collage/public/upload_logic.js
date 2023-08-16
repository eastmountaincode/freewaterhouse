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

            // Append to the image area or any container you want
            imageArea.appendChild(imgElement);
        } else {
            alert('Error uploading image.');
        }
    };

    xhr.send(formData);
});
