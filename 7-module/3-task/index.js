import createElement from "../../assets/lib/create-element.js";
export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.render();
    this.addEventListener();
  }

  render() {
    this.elem = createElement(`
    <div class="slider">
    <div class="slider__thumb" style="left: 0%;">
      <span class="slider__value">${this.value}</span>
    </div>
    <div class="slider__progress" style="width: 0%;"></div>
    <div class="slider__steps">
    <span class="slider__step-active"></span>
    </div>
  </div>
    `);
    let sliderSteps = this.elem.querySelector(".slider__steps");

    for (let i = 0; i < this.steps - 1; i++) {
      sliderSteps.append(document.createElement("span"));
    }
  }

  addEventListener() {
    let sliderValue = this.elem.querySelector(".slider__value");
    let spans = this.elem.querySelectorAll(".slider__steps > span");
    let thumb = this.elem.querySelector(".slider__thumb");
    let progress = this.elem.querySelector(".slider__progress");

    this.elem.addEventListener("click", (event) => {
      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let segments = this.steps - 1;
      let approxValue = (left / this.elem.offsetWidth) * segments;
      let value = Math.round(approxValue);
      let valuePercents = (Math.round(approxValue) / segments) * 100;

      this.value = value
      sliderValue.innerHTML = value;

      spans.forEach((span, index) =>
        index == value
          ? span.classList.add("slider__step-active")
          : span.classList.remove("slider__step-active")
      );

      thumb.style.left = `${valuePercents}%`;
      progress.style.width = `${valuePercents}%`;

      this.elem.dispatchEvent(
        new CustomEvent("slider-change", {
          detail: this.value,
          bubbles: true,
        })
      );
    });
  }
}
