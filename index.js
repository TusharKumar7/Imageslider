const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const slideContainer = document.getElementById("slideshow-container");
const slides = document.getElementById("slides");
const slidingDotContainer = document.getElementById("dot-container");

let imageIndex = 0;

const imgData = [
  "./images/img1.jpeg",
  "./images/img2.jpeg",
  "./images/img3.jpeg",
  "./images/img4.jpeg",
  "./images/img5.jpeg",
  "./images/img6.jpeg",
  "./images/img7.jpeg",
];

const createImages = () => {
  for (let i = 0; i < imgData.length; i++) {
    const image = document.createElement("img");
    image.src = imgData[i];
    image.classList.add("image");
    slides.appendChild(image);
  }
};

createImages();

const createSliderDots = () => {
  for (let i = 0; i < imgData.length; i++) {
    const imageSliderDot = document.createElement("div");
    imageSliderDot.classList.add("dot");
    slidingDotContainer.appendChild(imageSliderDot);
  }
};
createSliderDots();

const slideImages = document.querySelectorAll(".image");
const imageSliderDots = document.querySelectorAll(".dot");

slideImages.forEach((slide, index) => {
  slide.style.left = `${index * 100}%`;
});

const showArrowButton = () => {
  imageIndex === 0
    ? prevBtn.classList.add("hide")
    : prevBtn.classList.remove("hide");
  imageIndex === slideImages.length - 1
    ? nextBtn.classList.add("hide")
    : nextBtn.classList.remove("hide");
};
showArrowButton();

const sliderDotHandler = () => {
  imageSliderDots.forEach((dot, index) => {
    imageIndex === index
      ? dot.classList.add("active")
      : dot.classList.remove("active");
  });
};
sliderDotHandler();

imageSliderDots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    imageIndex = i;
    imageSlide();
  });
});

const imageSlide = () => {
  slideImages.forEach((slide) => {
    slide.style.transform = `translateX(-${imageIndex * 100}%)`;
  });
  sliderDotHandler();
  showArrowButton();
};

nextBtn.addEventListener("click", () => {
  if (imageIndex === slideImages.length - 1) return imageIndex;
  imageIndex++;
  imageSlide();
});

prevBtn.addEventListener("click", () => {
  if (imageIndex === 0) return imageIndex;
  imageIndex--;
  imageSlide();
});

let autoSlideInterval = null;
const autoPlaySlide = () => {
  autoSlideInterval = setInterval(() => {
    if (imageIndex === slideImages.length - 1) imageIndex = -1;
    imageIndex++;
    imageSlide();
    showArrowButton();
  }, 3000);
};
autoPlaySlide();

slideContainer.addEventListener("mouseenter", () => {
  clearInterval(autoSlideInterval);
});

slideContainer.addEventListener("mouseleave", () => {
  autoPlaySlide();
});
