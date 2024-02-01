import createElement from "../../assets/lib/create-element.js";
export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.segments = steps - 1;

    this._render();
    this._addEventClickSlider();
    this._setValue(value);
    this._dragAndDropSlider();
  }

  _render() {
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

    this.sliderValue = this.elem.querySelector(".slider__value");
    this.spans = this.elem.querySelectorAll(".slider__steps > span");
    this.thumb = this.elem.querySelector(".slider__thumb");
    this.progress = this.elem.querySelector(".slider__progress");
  }

  _setValue(sliderValue) {
    this.value = sliderValue;

    const valuePercents = (sliderValue / this.segments) * 100;

    this._sliderMovement(valuePercents);

    this.sliderValue.innerHTML = sliderValue;

    this.spans.forEach((span, index) =>
      index == sliderValue
        ? span.classList.add("slider__step-active")
        : span.classList.remove("slider__step-active")
    );
  }

  _addEventClickSlider() {
    this.elem.addEventListener("click", (event) => {
      const newLeft =
        (event.clientX - this.elem.getBoundingClientRect().left) /
        this.elem.offsetWidth;

      this._setValue(Math.round(this.segments * newLeft));

      this.elem.dispatchEvent(
        new CustomEvent("slider-change", {
          detail: this.value,
          bubbles: true,
        })
      );
    });
  }

  _dragAndDropSlider() {
    this.thumb.ondragstart = () => false;

    this.thumb.addEventListener("pointerdown", () => {
      this.thumb.style.position = "absolute";
      this.thumb.style.zIndex = 1000;
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

        this._sliderMovement(leftPercents);

        this.segments = this.steps - 1;
        this.approximateValue = leftRelative * this.segments;
        const value = Math.round(this.approximateValue);

        this.value = value;
        this.sliderValue.innerHTML = value;
        this.spans.forEach((span, index) =>
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

        this._sliderMovement(valuePercents);

        this.elem.dispatchEvent(
          new CustomEvent("slider-change", {
            detail: this.value,
            bubbles: true,
          })
        );
      });
    });
  }

  _sliderMovement(params) {
    this.thumb.style.left = `${params}%`;
    this.progress.style.width = `${params}%`;
  }
}
