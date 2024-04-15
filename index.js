let nextBtn = document.getElementById("next-btn");
let prevBtn = document.getElementById("prev-btn");
let slideContainer = document.getElementById("slideshow-container");
const slides = document.getElementById("slides");
let dotContainer=document.getElementById("dot-container");


var imageIndex = 0;

const imgData={
    "images":[
        "./images/img1.jpeg",
        "./images/img2.jpeg",
        "./images/img3.jpeg",
        "./images/img4.jpeg",
        "./images/img5.jpeg",
        "./images/img6.jpeg",
        "./images/img7.jpeg",
    ]
}

const createImages = () => {
    for (let i = 0; i < imgData.images.length; i++) {
        const image = document.createElement("img");
        image.src = imgData.images[i];
        image.classList.add("image");
        slides.appendChild(image);
    }
};

createImages();

const createDots=()=>{
    for(let i=0;i<imgData.images.length;i++){
        const sliderDot=document.createElement("div");
        sliderDot.classList.add('dot')
        dotContainer.appendChild(sliderDot)
    }
}
createDots()
let slideImages = document.querySelectorAll(".image");
let dots = document.querySelectorAll(".dot");
console.log(dots);
slideImages.forEach((slide, index) => {
  slide.style.left = `${index * 100}%`;
});

const showBtn = () => {
  imageIndex === 0
    ? prevBtn.classList.add("hide")
    : prevBtn.classList.remove("hide");
  imageIndex === slideImages.length - 1
    ? nextBtn.classList.add("hide")
    : nextBtn.classList.remove("hide");
};
showBtn();

const dotHandler = () => {
  dots.forEach((dot, index) => {
    imageIndex === index
      ? dot.classList.add("active")
      : dot.classList.remove("active");
  });
};
dotHandler();

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    imageIndex = i;
    changeSlide();
  });
});

const changeSlide = () => {
  //   console.log("change slide called");
  slideImages.forEach((slide) => {
    slide.style.transform = `translateX(-${imageIndex * 100}%)`;
  });
  dotHandler();
  showBtn();
};

nextBtn.addEventListener("click", () => {
  //   console.log("nextBtn called");
  if (imageIndex === slideImages.length - 1) return imageIndex;
  imageIndex++;
  changeSlide();
});

prevBtn.addEventListener("click", () => {
  //   console.log("prevBtn called");
  if (imageIndex === 0) return imageIndex;
  imageIndex--;
  changeSlide();
});

let autoSlideInterval = null;
const autoPlaySlide = () => {
  autoSlideInterval = setInterval(() => {
    if (imageIndex === slideImages.length - 1) imageIndex = -1;
    imageIndex++;
    changeSlide();
    showBtn();
  }, 3000);
};
autoPlaySlide();

slideContainer.addEventListener("mouseenter", () => {
  clearInterval(autoSlideInterval);
});

slideContainer.addEventListener("mouseleave", () => {
  autoPlaySlide();
});
