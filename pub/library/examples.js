/* Image Upload Libraries Drag and Drop Example JS File*/
"use strict";
const log = console.log
log('----------')
log('SCRIPT: ImUpload library examples')

// Create a new image upload in html
const imUpload = new ImUploadGenerator()

function examples() {

    imUpload.selectWithPreview()

    imUpload.dragWithPreview
    imUpload.preventDefaul
    imUpload.dragEnter
    imUpload.dragLeave
    imUpload.autoDragUpload

    imUpload.autoSelectUpload()
    imUpload.changeSpeed()
    imUpload.deleteAuto()

    imUpload.fileProgress()
}


var dropRegion = document.getElementById("drop-region")
dropRegion.addEventListener('dragenter', imUpload.preventDefault, false);
dropRegion.addEventListener('dragleave', imUpload.preventDefault, false);
dropRegion.addEventListener('dragover', imUpload.preventDefault, false);
dropRegion.addEventListener('drop', imUpload.preventDefault, false);
dropRegion.addEventListener('drop', imUpload.dragWithPreview, false);//  // drag and drop image to upload
dropRegion.addEventListener('dragenter', imUpload.dragEnter, false); //drag enter change background color
dropRegion.addEventListener("dragleave", imUpload.dragLeave, false); // drag leave change background back


examples()