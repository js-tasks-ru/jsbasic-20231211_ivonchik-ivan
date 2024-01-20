import createElement from "../../assets/lib/create-element.js";
export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    // this.value = value;
    this.segments = steps - 1;

    this.render();
    this.addEventListener();
    this.setValue(value);
    this.dragAndDrop();
  }

  render() {
    this.elem = createElement(`
    <div class="slider">
    <div class="slider__thumb">
      <span class="slider__value"></span>
    </div>
    <div class="slider__progress"></div>
    <div class="slider__steps">
    </div>
  </div>
    `);
    let sliderSteps = this.elem.querySelector(".slider__steps");

    for (let i = 0; i < this.steps; i++) {
      sliderSteps.append(document.createElement("span"));
    }
  }
  setValue(value) {
    this.value = value;

    let sliderValue = this.elem.querySelector(".slider__value");
    let spans = this.elem.querySelectorAll(".slider__steps > span");
    let thumb = this.elem.querySelector(".slider__thumb");
    let progress = this.elem.querySelector(".slider__progress");

    let valuePercents = (value / this.segments) * 100;

    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;

    sliderValue.innerHTML = value;

    spans.forEach((span, index) =>
    index == value
      ? span.classList.add("slider__step-active")
      : span.classList.remove("slider__step-active")
  );
  }

  addEventListener() {

    this.elem.addEventListener("click", (event) => {
      let newLeft = (event.clientX - this.elem.getBoundingClientRect().left) / this.elem.offsetWidth;

      this.setValue(Math.round(this.segments * newLeft));
  
      this.elem.dispatchEvent(
        new CustomEvent("slider-change", {
          detail: this.value,
          bubbles: true,
        })
      );
    });
  }

  dragAndDrop() {
    let sliderValue = this.elem.querySelector(".slider__value");
    let thumb = this.elem.querySelector(".slider__thumb");
    let progress = this.elem.querySelector(".slider__progress");
    let spans = this.elem.querySelectorAll(".slider__steps > span");

    thumb.ondragstart = () => false;

    thumb.addEventListener("pointerdown", () => {
      thumb.style.position = "absolute";
      thumb.style.zIndex = 1000;
      this.elem.classList.add("slider_dragging");

      this.onMouseMove = (event) => {
        let left = event.clientX - this.elem.getBoundingClientRect().left;
        let leftRelative = left / this.elem.offsetWidth;

        if (leftRelative < 0) {
          leftRelative = 0;
        }

        if (leftRelative > 1) {
          leftRelative = 1;
        }

        let leftPercents = leftRelative * 100;

        thumb.style.left = `${leftPercents}%`;
        progress.style.width = `${leftPercents}%`;

        this.segments = this.steps - 1;
        this.approximateValue = leftRelative * this.segments;
        let value = Math.round(this.approximateValue);

        this.value = value;
        sliderValue.innerHTML = value;
        spans.forEach((span, index) =>
          index == value
            ? span.classList.add("slider__step-active")
            : span.classList.remove("slider__step-active")
        );
      };

      document.addEventListener("pointermove", this.onMouseMove);

      document.addEventListener("pointerup", () => {
        this.elem.classList.remove("slider_dragging");
        document.removeEventListener("pointermove", this.onMouseMove);

        let valuePercents =
          (Math.round(this.approximateValue) / this.segments) * 100;
        thumb.style.left = `${valuePercents}%`;
        progress.style.width = `${valuePercents}%`;

        this.elem.dispatchEvent(
          new CustomEvent("slider-change", {
            detail: this.value,
            bubbles: true,
          })
        );

        thumb.onmouseup = null;
      });
    });
  }
}
