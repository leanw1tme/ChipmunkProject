const sliderWrapper = document.querySelector('.slider-wrapper');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const sliderItems = document.querySelectorAll('.slider-item');

let currentIndex = 0;

function showCurrentSlide() {
  sliderWrapper.style.transform = `translateX(-${currentIndex * sliderItems[0].offsetWidth}px)`;
}

function moveNext() {
  currentIndex = (currentIndex + 1) % sliderItems.length;
  showCurrentSlide();
}

function movePrev() {
  currentIndex = (currentIndex - 1 + sliderItems.length) % sliderItems.length;
  showCurrentSlide();
}

prevButton.addEventListener('click', movePrev);
nextButton.addEventListener('click', moveNext);

showCurrentSlide();
