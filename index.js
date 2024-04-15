const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const slideContainer = document.getElementById("slideshow-container");
const slides = document.getElementById("slides");
const slidingBulletContainer=document.getElementById("dot-container");

let imageIndex = 0;

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

const createBullets=()=>{
    for(let i=0;i<imgData.images.length;i++){
        const slideraBullet=document.createElement("div");
        slideraBullet.classList.add('dot')
        slidingBulletContainer.appendChild(slideraBullet)
    }
}
createBullets()

const slideImages = document.querySelectorAll(".image");
const imageSlidingbullets = document.querySelectorAll(".dot");
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

const bulletHandler = () => {
  imageSlidingbullets.forEach((dot, index) => {
    imageIndex === index
      ? dot.classList.add("active")
      : dot.classList.remove("active");
  });
};
bulletHandler();

imageSlidingbullets.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    imageIndex = i;
    imageSlide();
  });
});

const imageSlide = () => {
  slideImages.forEach((slide) => {
    slide.style.transform = `translateX(-${imageIndex * 100}%)`;
  });
  bulletHandler();
  showBtn();
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
