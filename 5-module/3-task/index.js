

function initCarousel() {

  let carousel = document.querySelector(".carousel");
  let arrowRight = document.querySelector(".carousel__arrow_right");
  let arrowLeft = document.querySelector(".carousel__arrow_left");
  let inner = document.querySelector(".carousel__inner");
  let carouselImgCount = document.querySelectorAll(".carousel__img").length
  
  let innerIndex = 0;
  let innerWidth = inner.offsetWidth;
  
  arrowLeft.style.display = "none";

  carousel.addEventListener("click", function (event) {
    if (event.target.closest(".carousel__arrow_right")) {
      innerIndex++;

      innerIndex == carouselImgCount - 1 ? (arrowRight.style.display = "none") : (arrowRight.style.display = "");
      innerIndex == 0 ? (arrowLeft.style.display = "none") : (arrowLeft.style.display = "");

      inner.style.transform = `translateX(-${innerWidth * innerIndex}px)`;
    } 
    else if (event.target.closest(".carousel__arrow_left")) {
      innerIndex--;

      innerIndex == 3 ? (arrowRight.style.display = "none") : (arrowRight.style.display = "");
      innerIndex == 0 ? (arrowLeft.style.display = "none") : (arrowLeft.style.display = "");

      inner.style.transform = `translateX(-${innerWidth * innerIndex}px)`;
    }
  });
}
