function getQueryParams() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
        exam: urlParams.get('grade')
    };
}


window.onload = function () {
    const queryParams = getQueryParams(); 
    console.log("Query Parameters:", queryParams);
    const examNameElement = document.getElementById('class');
    examNameElement.textContent = queryParams.exam || 'No class selected';
};

// Global variables
let currentImageIndex = 0;
let imageList = [];
let likedImages = {}; // Store liked images

function displaySummary() {
// Get selected values
const selectedClass = document.getElementById("class").textContent;
const selectedSyllabus = document.getElementById("syllabus").value;
const selectedSubject = document.getElementById("subject").value;
const selectedChapter = document.getElementById("chapter").value;
const selectedTopic = document.getElementById("topic").value;

// Check if all fields are selected
if (!selectedClass || !selectedSyllabus || !selectedSubject || !selectedChapter || !selectedTopic) {
alert("Please select all fields before submitting.");
return;
}

// Update summary section
document.getElementById("class-summary").textContent = selectedClass;
document.getElementById("syllabus-summary").textContent = selectedSyllabus;
document.getElementById("subject-summary").textContent = selectedSubject;
document.getElementById("chapter-summary").textContent = selectedChapter;
document.getElementById("topic-summary").textContent = selectedTopic;

// Show the summary container
document.getElementById("summary-container").style.display = "block";

// Load images based on the selected topic
loadImages(selectedTopic);
}

function loadImages(topic) {
imageList = [
`assets/images/${topic}-1.jpg`,
`assets/images/${topic}-2.jpg`,
`assets/images/${topic}-3.jpg`
];

if (imageList.length > 0) {
currentImageIndex = 0;
updateImage();
document.getElementById("image-slider-container").style.display = "block";
document.getElementById("image-actions-container").style.display = "block"; // Show like & share
} else {
alert("No images found for this topic.");
document.getElementById("image-slider-container").style.display = "none";
document.getElementById("image-actions-container").style.display = "none";
}
}

function prevImage() {
currentImageIndex = (currentImageIndex > 0) ? currentImageIndex - 1 : imageList.length - 1;
updateImage();
}

function nextImage() {
currentImageIndex = (currentImageIndex < imageList.length - 1) ? currentImageIndex + 1 : 0;
updateImage();
}

function updateImage() {
let sliderImage = document.getElementById("slider-image");
sliderImage.style.opacity = 0; // Fade out effect
setTimeout(() => {
sliderImage.src = imageList[currentImageIndex];
sliderImage.style.opacity = 1; // Fade in effect
updateLikeStatus(); // Update like status on image change
}, 300);
}

// Like Button Functionality
function likeImage() {
let currentImage = imageList[currentImageIndex];
let likeBtn = document.getElementById("like-btn");

if (likedImages[currentImage]) {
likedImages[currentImage] = false;
likeBtn.innerHTML = `<i class="far fa-heart"></i> Like`;
likeBtn.classList.remove("liked");
} else {
likedImages[currentImage] = true;
likeBtn.innerHTML = `<i class="fas fa-heart"></i> Liked`;
likeBtn.classList.add("liked");
}

updateLikeCount();
}

// Update Like Count Display
function updateLikeCount() {
let likedCount = Object.values(likedImages).filter(val => val).length;
document.getElementById("like-count").textContent = `${likedCount} Likes`;
}

// Ensure like status remains on image change
function updateLikeStatus() {
let currentImage = imageList[currentImageIndex];
let likeBtn = document.getElementById("like-btn");

if (likedImages[currentImage]) {
likeBtn.innerHTML = `<i class="fas fa-heart"></i> Liked`;
likeBtn.classList.add("liked");
} else {
likeBtn.innerHTML = `<i class="far fa-heart"></i> Like`;
likeBtn.classList.remove("liked");
}
}

// Share Button Functionality
function shareImage() {
let currentImage = imageList[currentImageIndex];
let shareUrl = window.location.origin + "/" + currentImage;

if (navigator.share) {
navigator.share({
    title: "Check this out!",
    text: "Look at this image from VBest Education!",
    url: shareUrl
}).then(() => console.log("Shared successfully"))
  .catch((error) => console.log("Error sharing:", error));
} else {
alert("Copy this link to share: " + shareUrl);
}
}


function clearSelection() {
// Reset the select elements
document.getElementById("syllabus").selectedIndex = 0;
document.getElementById("subject").selectedIndex = 0;
document.getElementById("chapter").selectedIndex = 0;
document.getElementById("topic").selectedIndex = 0;

// Hide summary container, image slider, and image actions container
document.getElementById("summary-container").style.display = "none";
document.getElementById("image-slider-container").style.display = "none";
document.getElementById("image-actions-container").style.display = "none";

// Clear the like count
document.getElementById("like-count").textContent = "0 Likes";

// Reset the like button text to "Like"
let likeBtn = document.getElementById("like-btn");
likeBtn.innerHTML = `<i class="far fa-heart"></i> Like`;
likeBtn.classList.remove("liked");

// Reset the image slider to an empty state
let sliderImage = document.getElementById("slider-image");
sliderImage.src = ""; // Optional: Clear the image
}




