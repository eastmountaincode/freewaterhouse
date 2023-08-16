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
            // TODO: Handle successful upload logic,
            // like adding the new image to the image area dynamically.
        } else {
            alert('Error uploading image.');
        }
    };

    xhr.send(formData);
});
