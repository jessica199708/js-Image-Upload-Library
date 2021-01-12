/* Image Upload Libraries Exapmle JS File*/
"use strict";

////////////////// Drag and drop
// var imagePreviewRegion = document.getElementById("image-preview")
// var dropRegion = document.getElementById("drop-region")

(function (global, document) {
    const log = console.log
    log('----------')
    log('SCRIPT: Creating ImUpload libraries')


    function ImUploadGenerator(e) {
        this.e = e
    }

    ////////////////// Global variable
    var image_url = [];  //store upload image url
    var slideIndex = 1;  //initialize slider
    var totalCounter = 0;
    var previewWidth = "500";
    var previewHeight = "300";

    var autoSlideIndex = 0; // auto slideshow
    var autoCounter = 0;
    var autoClock;
    var time = 3000;
    var autoPreviewWidth = "500";
    var autoPreviewHeight = "300";


    var imgFile // progress bar

    var animate;
    var progressInnerBar;
    var windowWidth;
    var barLength;

    window.onload = init;


    ////////////////// Slider
    // Slider function 1: display the slide that indicate by the input sliseIndex
    // Input: display silde index
    function showSlides(n) {
        var slides = document.getElementsByClassName("mySlides");
        var dots = document.getElementsByClassName("dot");
        if (n > slides.length) {
            slideIndex = 1
        }
        if (n < 1) {
            slideIndex = slides.length
        }
        for (var i = 0; i < slides.length; i++) {
            //hide and show elements without deleting and recreating them
            slides[i].style.display = "none";
        }
        for (var i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex - 1].style.display = "block";
        // log('current image label', imgLabel)
        dots[slideIndex - 1].className += " active";
    }

    // Slider function 2: display the previous or next slide for the given slideIndex
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    // Slider function 3: jump to the input slideIndex slide
    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    // Slider function 4: display how much images upload totally
    function countBar(n) {
        var countBar = document.getElementById("countBar")
        countBar.innerHTML = `Upload ${n} images`
    }

    // Slider function 5: delete the first image that user uploaded
    function deleteFirstSlide(div) {
        var wholeArea = div.nextSibling.parentNode
        if (wholeArea.querySelectorAll(".mySlides").length == 1) {
            var newMySlide = document.createElement('div')
            newMySlide.className = 'mySlides'
            newMySlide.id = 'backSlides'
            newMySlide.style.display = 'block'
            // newMySlide.style.background = 'url("img/001_IMG.png")'
            newMySlide.style.backgroundSize = "500px, 650px"
            wholeArea.appendChild(newMySlide)
            div.remove()
            totalCounter -= 1
            countBar(totalCounter)

        } else {
            div.style.display = 'none'
            wholeArea.querySelectorAll(".mySlides")[1].style.display = 'block'
            div.remove()
            totalCounter -= 1
            countBar(totalCounter)
        }

    }
    //Slider function 6: delete the other images that user uploaded
    function deleteSlide(div) {
        var wholeDiv = div.parentNode

        if (wholeDiv.querySelectorAll(".mySlides").length == 1) {
            var newMySlide2 = document.createElement('div')
            newMySlide2.className = 'mySlides'
            newMySlide2.id = "backSlides"
            newMySlide2.style.display = 'block'
            newMySlide2.style.backgroundSize = "500px, 650px"
            wholeDiv.appendChild(newMySlide2)
            div.remove()
            totalCounter -= 1
            countBar(totalCounter)

        } else if (wholeDiv.querySelectorAll(".mySlides").length == 2) {
            div.style.display = 'none'
            div.remove()
            totalCounter -= 1
            countBar(totalCounter)
            wholeDiv.querySelectorAll(".mySlides")[0].style.display = 'block'

        } else {
            if (div.nextSibling == null) {
                div.style.display = 'none'
                div.previousSibling.style.display = 'block'
            } else {
                div.nextSibling.style.display = 'block'
            }
            div.remove()
            totalCounter -= 1
            countBar(totalCounter)
        }

    }

    ////////////////// Automatic Slide show
    function autoSlide() {
        autoCounter += 1
        var slides = document.getElementsByClassName("automySlides");
        if (autoCounter == 1) {
            slides[0].remove()
        }
        for (var i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        autoSlideIndex++;
        if (autoSlideIndex > slides.length) {
            autoSlideIndex = 1
        }
        slides[autoSlideIndex - 1].style.display = "block";
        var numberBar = document.getElementsByClassName("numberDisplay")[0];
        numberBar.innerHTML = `${autoSlideIndex} / ${slides.length}`
        autoClock = setTimeout(autoSlide, time);
    }


    ////////////////// Progress Bar # 1
    // Progress bar function 1: initialize the bar
    function init() {
        const imgServer = document.getElementById('serverImage');
        imgFile = document.getElementById('fileImage');
        const progressBar = document.getElementById('myProgress');
        progressInnerBar = document.getElementById('myBar');
        imgFile.style.width = "100px"
        imgFile.style.height = "100px"
        imgFile.style.display = 'block'
        imgFile.style.position = 'relative';
        imgFile.style.left = '300px';
        imgFile.style.top = '20px';

        imgServer.style.width = "140px"
        imgServer.style.height = "140px"
        imgServer.style.position = 'absolute';
        imgServer.style.right = '300px';
        imgServer.style.top = '20px';

        windowWidth = window.innerWidth - parseInt(imgFile.style.left) - parseInt(imgServer.style.right)

        barLength = windowWidth - 200 // two images width

        progressBar.style.width = barLength + 'px'
        progressBar.style.left = (parseInt(imgFile.style.left) + 110) + 'px'
        progressInnerBar.style.width = '0px'
        progressInnerBar.innerHTML = '0%'
    }

    // Progress bar function 2: when the bar reach to the end stop it
    function stop() {
        clearTimeout(animate);
        setTimeout(function () {
            init();
        }, 2000)
    }

    // Progress bar function 3: repeat the animation
    function barOne() {
        const imgFileWidth = parseInt(imgFile.style.left) + 5
        imgFile.style.left = imgFileWidth + 'px';
        const barWidth = parseInt(progressInnerBar.style.width) + 5
        progressInnerBar.style.width = barWidth + 'px';
        if (barWidth >= barLength) {
            progressInnerBar.innerHTML = "100%"
        } else {
            progressInnerBar.innerHTML = parseInt((barWidth / (barLength)) * 100) + "%"
        }
        animate = setTimeout(barOne, 25);
        if (imgFileWidth >= windowWidth + 200 || barWidth >= barLength) {
            imgFile.style.display = 'none';
            stop()
        }
    }


    ////////////////// Constructor function for the ImUpload library
    ImUploadGenerator.prototype = {
        // Image Upload 1: select images to upload and display in slider
        selectWithPreview: function () {
            var fileUpload = document.getElementById("fileupload");
            var sliderArea = document.getElementById("slideshow-container")
            for (var i = 0; i < fileUpload.files.length; i++) {
                // First upload image
                if (i == 0 && image_url.length == 0) {
                    var firstFile = fileUpload.files[0]
                    firstFile.src = URL.createObjectURL(firstFile)
                    image_url.push(firstFile.src)
                    // display images in slider
                    const firstSlide = document.getElementsByClassName('mySlides fade')[0]
                    const firstSlideImage = document.createElement('img')
                    firstSlideImage.className = 'uploadImage'
                    firstSlideImage.src = firstFile.src
                    firstSlideImage.width = previewWidth
                    firstSlideImage.height = previewHeight
                    firstSlide.appendChild(firstSlideImage)

                    totalCounter += 1
                    countBar(totalCounter)

                    // Delete image
                    const deleteButton = document.createElement('a')
                    deleteButton.className = "delete"
                    deleteButton.innerHTML = "&#8855;"
                    firstSlide.appendChild(deleteButton)
                    deleteButton.onclick = function () { deleteFirstSlide(firstSlide) }

                    // Not the first upload one
                } else {
                    var file = fileUpload.files[i];
                    file.src = URL.createObjectURL(file)  //creates a DOMString containing a URL
                    image_url.push(file.src)

                    // display images in slider
                    const nextSlide = document.createElement('div')
                    nextSlide.className = "mySlides fade"
                    const nextSlideImage = document.createElement('img')
                    nextSlideImage.className = 'uploadImage'
                    nextSlideImage.src = file.src
                    nextSlideImage.width = previewWidth
                    nextSlideImage.height = previewHeight

                    nextSlide.appendChild(nextSlideImage)
                    sliderArea.appendChild(nextSlide)
                    totalCounter += 1
                    countBar(totalCounter)

                    // Delete image
                    const deleteButton = document.createElement('a')
                    deleteButton.className = "delete"
                    deleteButton.innerHTML = "&#8855;"
                    nextSlide.appendChild(deleteButton)
                    deleteButton.onclick = function () { deleteSlide(nextSlide) }

                    // Previous button and slide to previous page
                    const prevButton = document.getElementById("prev")
                    prevButton.onclick = function () { plusSlides(-1) }
                    const nextButton = document.getElementById("next")
                    nextButton.onclick = function () { plusSlides(1) }
                    
                    // Next button and slide to next page
                    var firstDot = document.getElementsByClassName('dot')[0]
                    firstDot.onclick = function () { currentSlide(1) }
                    const secondDot = document.getElementsByClassName('dot')[1]
                    secondDot.onclick = function () { currentSlide(2) }
                    const thirdDot = document.getElementsByClassName('dot')[2]
                    thirdDot.onclick = function () { currentSlide(3) }
                    const forthdDot = document.getElementsByClassName('dot')[3]
                    forthdDot.onclick = function () { currentSlide(4) }
                    const fivethDot = document.getElementsByClassName('dot')[4]
                    fivethDot.onclick = function () { currentSlide(5) }
                    const sixthDot = document.getElementsByClassName('dot')[5]
                    sixthDot.onclick = function () { currentSlide(6) }

                }
            }

            alert(`Please check the ${fileUpload.files.length} upload images through Preview`)

            const backSlide = document.getElementById("backSlides")
            const allSlide = document.getElementsByClassName('mySlides fade')
            log(fileUpload.files.length)

            if (backSlide !== null) {
                if (fileUpload.files.length !== 0){
                    backSlide.remove()
                    allSlide[0].style.display = 'block'
                }
            }
        },



        //Image upload 2: drag and drop
        dragWithPreview: function (e) {
            var fileUpload = e.dataTransfer
            var sliderArea = document.getElementById("slideshow-container")
            for (var i = 0; i < fileUpload.files.length; i++) {

                // First upload image
                if (i == 0 && image_url.length == 0) {
                    var firstFile = fileUpload.files[0]
                    firstFile.src = URL.createObjectURL(firstFile)
                    image_url.push(firstFile.src)
                    // display images in slider
                    const firstSlide = document.getElementsByClassName('mySlides fade')[0]
                    const firstSlideImage = document.createElement('img')
                    firstSlideImage.className = 'uploadImage'
                    firstSlideImage.src = firstFile.src
                    firstSlideImage.width = "500"
                    firstSlideImage.height = "300"
                    firstSlide.appendChild(firstSlideImage)

                    totalCounter += 1
                    countBar(totalCounter)

                    // Delete image
                    const deleteButton = document.createElement('a')
                    deleteButton.className = "delete"
                    deleteButton.innerHTML = "&#8855;"
                    firstSlide.appendChild(deleteButton)
                    deleteButton.onclick = function () { deleteFirstSlide(firstSlide) }

                    // Not the first upload one
                } else {
                    var file = fileUpload.files[i];
                    file.src = URL.createObjectURL(file)  //creates a DOMString containing a URL
                    image_url.push(file.src)

                    // display images in slider
                    const nextSlide = document.createElement('div')
                    nextSlide.className = "mySlides fade"
                    const nextSlideImage = document.createElement('img')
                    nextSlideImage.className = 'uploadImage'
                    nextSlideImage.src = file.src
                    nextSlideImage.width = "500"
                    nextSlideImage.height = "300"

                    nextSlide.appendChild(nextSlideImage)
                    sliderArea.appendChild(nextSlide)
                    totalCounter += 1
                    countBar(totalCounter)

                    // Delete image
                    const deleteButton = document.createElement('a')
                    deleteButton.className = "delete"
                    deleteButton.innerHTML = "&#8855;"
                    nextSlide.appendChild(deleteButton)
                    deleteButton.onclick = function () { deleteSlide(nextSlide) }

                    // Previous button and slide to previous page
                    const prevButton = document.getElementById("prev")
                    prevButton.onclick = function () { plusSlides(-1) }
                    const nextButton = document.getElementById("next")
                    nextButton.onclick = function () { plusSlides(1) }

                    // Next button and slide to next page
                    var firstDot = document.getElementsByClassName('dot')[0]
                    firstDot.onclick = function () { currentSlide(1) }
                    const secondDot = document.getElementsByClassName('dot')[1]
                    secondDot.onclick = function () { currentSlide(2) }
                    const thirdDot = document.getElementsByClassName('dot')[2]
                    thirdDot.onclick = function () { currentSlide(3) }
                    const forthdDot = document.getElementsByClassName('dot')[3]
                    forthdDot.onclick = function () { currentSlide(4) }
                    const fivethDot = document.getElementsByClassName('dot')[4]
                    fivethDot.onclick = function () { currentSlide(5) }
                    const sixthDot = document.getElementsByClassName('dot')[5]
                    sixthDot.onclick = function () { currentSlide(6) }

                }
            }

            alert(`Please check the ${fileUpload.files.length} upload images through Preview`)

            const backSlide = document.getElementById("backSlides")
            const allSlide = document.getElementsByClassName('mySlides fade')

            if (backSlide !== null) {
                backSlide.remove()
                allSlide[0].style.display = 'block'
            }
        },

        preventDefault: function (e) {
            e.preventDefault();
            e.stopPropagation();
        },

        // drag into specific area an pink border occur
        dragEnter: function (e) {
            if (e.target.id == 'drop-region') {
                e.target.style.border = "5px dashed pink"
            }
        },

        dragLeave: function (e) {
            if (e.target.id == 'drop-region') {
                e.target.style.border = "5px dashed #D8BFD8"
            }
        },

        // Image upload 3: Automatic slide show
        autoSelectUpload: function () {
            clearTimeout(autoClock)
            var fileUpload = document.getElementById("autofileupload");
            var sliderArea = document.getElementById("autoslideshow-container")
            for (var i = 0; i < fileUpload.files.length; i++) {
                var file = fileUpload.files[i];
                file.src = URL.createObjectURL(file)
                const nextSlide = document.createElement('div')
                nextSlide.className = "automySlides fade"
                const nextSlideImage = document.createElement('img')
                nextSlideImage.className = 'uploadImage'
                nextSlideImage.src = file.src
                nextSlide.appendChild(nextSlideImage)
                sliderArea.appendChild(nextSlide)
                nextSlideImage.width = autoPreviewWidth
                nextSlideImage.height = autoPreviewHeight
            }
            autoSlide()
        },

        // change the image switch speed
        changeSpeed: function () {
            var speed = document.getElementById("speedInput");
            time = (speed.value) * 1000
        },
        // delete select image
        deleteAuto: function () {
            var allSlides = document.getElementsByClassName("automySlides");
            var currentNum = allSlides.length
            var numberBar = document.getElementsByClassName("numberDisplay")[0];
            if (currentNum == 0) {
                alert('No image upload')
            } else {
                for (var i = 0; i < allSlides.length; i++) {
                    if (allSlides[i].style.display == "block") {
                        if (allSlides[i - 1] == null && allSlides[i + 1] !== null) {
                            log('no front, display back')
                            allSlides[i].remove()
                            numberBar.innerHTML = ''
                            allSlides[i + 1].style.display == "block"

                        } else if (allSlides[i + 1] == null && allSlides[i - 1] !== null) {
                            log('no back, display front')
                            allSlides[i].remove()
                            numberBar.innerHTML = ''
                            allSlides[i - 1].style.display == "block"
                        } else if (allSlides[i + 1] !== null && allSlides[i - 1] !== null) {
                            log('front and back both have, display back')
                            allSlides[i].remove()
                            numberBar.innerHTML = ''
                            allSlides[i - 1].style.display == "block"
                        }
                    }
                }
            }
            var afterDelete = document.getElementsByClassName("automySlides");
            clearTimeout(autoClock)

            if (currentNum > afterDelete.length) {
                autoSlide()
            }
        },

        // Progress bar #1
        fileProgress: function () {
            const imgFileWidth = parseInt(imgFile.style.left) + 5
            imgFile.style.left = imgFileWidth + 'px';
            const barWidth = parseInt(progressInnerBar.style.width) + 5
            progressInnerBar.style.width = barWidth + 'px';
            progressInnerBar.innerHTML = parseInt((barWidth / (barLength)) * 100) + "%"
            animate = setTimeout(barOne(), 25);
        }


    }

    global.ImUploadGenerator = global.ImUploadGenerator || ImUploadGenerator

})(window, window.document)