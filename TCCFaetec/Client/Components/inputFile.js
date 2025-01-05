function showFileName() {
    var input = document.getElementById('fileInput');
    var fileName = document.getElementById('fileName');

    if (input.files.length > 0) {
        fileName.textContent = input.files[0].name;
    } else {
        fileName.textContent = "No file selected";
    }
}