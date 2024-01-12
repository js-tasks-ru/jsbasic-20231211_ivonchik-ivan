import createElement from "../../assets/lib/create-element.js";

export default class Carousel {
  constructor(slides) {
    this.slides = slides;

    this.makeCarouselInner();
    this.initCarousel();
    this.addEvenet();
  }

  makeCarouselInner() {
    this.elem = createElement(`
<div class="carousel">
<div class="carousel__arrow carousel__arrow_right">
  <img src="/assets/images/icons/angle-icon.svg" alt="icon">
</div>
<div class="carousel__arrow carousel__arrow_left">
  <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
 </div>
</div>
`);

    this.carouselInner = createElement(`<div class="carousel__inner"></div>`);
    this.elem.append(this.carouselInner);

    this.slides.forEach((slide) => {
      this.carouselInner.append(
        createElement(`
<div class="carousel__slide" data-id=${slide.id}>
  <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
  <div class="carousel__caption">
    <span class="carousel__price">€${Number(slide.price).toFixed(2)}</span>
    <div class="carousel__title">${slide.name}</div>
    <button type="button" class="carousel__button">
      <img src="/assets/images/icons/plus-icon.svg" alt="icon">
    </button>
  </div>
</div>
`)
      );
    });
  }

  initCarousel() {
    let carousel = this.elem;
    let innerIndex = 0;
    let carouselImgCount = carousel.querySelectorAll(".carousel__slide").length;

    let arrowRight = carousel.querySelector(".carousel__arrow_right");
    let arrowLeft = carousel.querySelector(".carousel__arrow_left");
    let inner = carousel.querySelector(".carousel__inner");

    flipping();

    carousel.addEventListener("click", function (event) {
      if (event.target.closest(".carousel__arrow_right")) {
        innerIndex++;
        flipping();
      } else if (event.target.closest(".carousel__arrow_left")) {
        innerIndex--;
        flipping();
      }
    });

    function flipping() {
      let innerWidth = inner.offsetWidth;

      innerIndex == carouselImgCount - 1 ? (arrowRight.style.display = "none") : (arrowRight.style.display = "");
      innerIndex == 0 ? (arrowLeft.style.display = "none") : (arrowLeft.style.display = "");

      inner.style.transform = `translateX(-${innerWidth * innerIndex}px)`;
    }
  }

  addEvenet() {
    const cardButtons = this.elem.querySelectorAll(".carousel__button");

    for (const cardButton of cardButtons) {
      cardButton.addEventListener("click", (event) => {
        let currentSlide = event.target.closest(".carousel__slide");

        const сustomEventCart = new CustomEvent("product-add", {
          detail: currentSlide.dataset.id,
          bubbles: true,
        });

        this.elem.dispatchEvent(сustomEventCart);
      });
    }
  }
}
