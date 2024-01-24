import createElement from "../../assets/lib/create-element.js";
export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
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
    const sliderSteps = this.elem.querySelector(".slider__steps");

    for (let i = 0; i < this.steps; i++) {
      sliderSteps.append(document.createElement("span"));
    }
  }
  
  setValue(value) {
    this.value = value;

    const sliderValue = this.elem.querySelector(".slider__value");
    const spans = this.elem.querySelectorAll(".slider__steps > span");
    const thumb = this.elem.querySelector(".slider__thumb");
    const progress = this.elem.querySelector(".slider__progress");

    const valuePercents = (value / this.segments) * 100;

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
      const newLeft = (event.clientX - this.elem.getBoundingClientRect().left) / this.elem.offsetWidth;

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
    const sliderValue = this.elem.querySelector(".slider__value");
    const thumb = this.elem.querySelector(".slider__thumb");
    const progress = this.elem.querySelector(".slider__progress");
    const spans = this.elem.querySelectorAll(".slider__steps > span");

    thumb.ondragstart = () => false;

    function sliderMovement(params) {
      thumb.style.left = `${params}%`;
      progress.style.width = `${params}%`;
    }

    thumb.addEventListener("pointerdown", () => {
      thumb.style.position = "absolute";
      thumb.style.zIndex = 1000;
      this.elem.classList.add("slider_dragging");

      this.onMouseMove = (event) => {
        const left = event.clientX - this.elem.getBoundingClientRect().left;
        let leftRelative = left / this.elem.offsetWidth;

        if (leftRelative < 0) {
          leftRelative = 0;
        }

        if (leftRelative > 1) {
          leftRelative = 1;
        }

        const leftPercents = leftRelative * 100;

        sliderMovement(leftPercents)

        this.segments = this.steps - 1;
        this.approximateValue = leftRelative * this.segments;
        const value = Math.round(this.approximateValue);

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

        const valuePercents =
          (Math.round(this.approximateValue) / this.segments) * 100;
          
          sliderMovement(valuePercents)

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
