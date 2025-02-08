function getQueryParams() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
        exam: urlParams.get('exam')
    };
}


window.onload = function () {
    const queryParams = getQueryParams(); 
    console.log("Query Parameters:", queryParams);
    const examNameElement = document.getElementById('exam-name');
    examNameElement.textContent = queryParams.exam || 'No exam selected';
};



// Global variables
let currentImageIndex = 0;
let imageList = [];
let likedImages = {}; // Store liked images

function displaySummary() {
// Get selected values
const selectedClass = document.getElementById("class").value;
const selectedChapter = document.getElementById("chapter").value;
const selectedSubject = document.getElementById("subject").value;
const selectedTopic = document.getElementById("topic").value;

// Get the exam value from the page (this comes from the URL query)
const examName = document.getElementById("exam-name").textContent;

// Check if all fields are selected
if (!selectedClass || !selectedChapter || !selectedSubject || !selectedTopic) {
alert("Please select all fields before submitting.");
return;
}

// Update summary section
document.getElementById("class-summary").textContent = selectedClass;
document.getElementById("chapter-summary").textContent = selectedChapter;
document.getElementById("subject-summary").textContent = selectedSubject;
document.getElementById("topic-summary").textContent = selectedTopic;
document.getElementById("exam-summary").textContent = examName || 'No exam selected';

// Show the summary container
document.getElementById("summary-container").style.display = "block";

// Load images based on the selected topic
loadImages(selectedTopic); // Load images for the selected topic
}


function loadImages(topic) {
// List images related to the selected topic
imageList = [
`assets/images/${topic}-1.jpg`,  // Example: images/algebra-1.jpg, images/calculus-1.jpg, etc.
`assets/images/${topic}-2.jpg`,
`assets/images/${topic}-3.jpg`
];

// Check if images are available
if (imageList.length > 0) {
currentImageIndex = 0;  // Start with the first image
updateImage();  // Function to update the image
document.getElementById("image-slider-container").style.display = "block";  // Show the image slider
document.getElementById("image-actions-container").style.display = "block";  // Show like/share actions
} else {
alert("No images found for this topic.");
document.getElementById("image-slider-container").style.display = "none";  // Hide the image slider if no images
document.getElementById("image-actions-container").style.display = "none";  // Hide actions
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
sliderImage.style.opacity = 0;  // Fade out effect before updating the image
setTimeout(() => {
sliderImage.src = imageList[currentImageIndex];  // Change the image source
sliderImage.style.opacity = 1;  // Fade in effect
updateLikeStatus();  // Update the like button status for the new image
}, 300);
}


// Like Button Functionality
// Like Button Functionality
function likeImage() {
let currentImage = imageList[currentImageIndex];
let likeBtn = document.getElementById("like-btn");

// Toggle like status
if (likedImages[currentImage]) {
likedImages[currentImage] = false;
likeBtn.innerHTML = `<i class="far fa-heart"></i> Like`;
likeBtn.classList.remove("liked");
} else {
likedImages[currentImage] = true;
likeBtn.innerHTML = `<i class="fas fa-heart"></i> Liked`;
likeBtn.classList.add("liked");
}

updateLikeCount();  // Update the like count display
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
// Share Button Functionality
function shareImage() {
let currentImage = imageList[currentImageIndex];
let shareUrl = window.location.origin + "/" + currentImage;  // URL of the current image

// Use the native sharing functionality if available
if (navigator.share) {
navigator.share({
    title: "Check this out!",
    text: "Look at this image from VBest Education!",
    url: shareUrl
}).then(() => console.log("Shared successfully"))
  .catch((error) => console.log("Error sharing:", error));
} else {
// If native sharing isn't available, prompt to copy the link
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



