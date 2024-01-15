import createElement from "../../assets/lib/create-element.js";

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.mekeRibbonMenu();
    this.mekeScroll();
    this.addEventListener();
  }

  mekeRibbonMenu() {
    this.elem = createElement(`
    <div class="ribbon">
    <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>

    <nav class="ribbon__inner"></nav>

    <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
  </div>
</div>
    `);

    this.ribbonInner = this.elem.querySelector(".ribbon__inner");

    this.categories.forEach((item) => {
      this.ribbonInner.append(
        createElement(`
    <a href="#" class="ribbon__item" data-id=${item.id}>${item.name}</a>
      `)
      );
    });
  }

  mekeScroll() {
    let ribbon = this.elem;

    let ribbonInner = ribbon.querySelector(".ribbon__inner");
    let ribbonArrowRight = ribbon.querySelector(".ribbon__arrow_right");
    let ribbonArrowLeft = ribbon.querySelector(".ribbon__arrow_left");

    ribbon.addEventListener("click", function (event) {
      if (event.target.closest(".ribbon__arrow_right")) {
        scroll("+");
      } else if (event.target.closest(".ribbon__arrow_left")) {
        scroll("-");
      }
    });

    function scroll(sign) {
      let step = Number(`${sign}350`);
      ribbonInner.scrollBy(step, 0);

      ribbonInner.addEventListener("scroll", function () {
        let scrollWidth = ribbonInner.scrollWidth;
        let clientWidth = ribbonInner.clientWidth;

        let scrollLeft = ribbonInner.scrollLeft;
        let scrollRight = scrollWidth - scrollLeft - clientWidth;

        scrollRight < 1
          ? ribbonArrowRight.classList.remove("ribbon__arrow_visible")
          : ribbonArrowRight.classList.add("ribbon__arrow_visible");
        scrollLeft == 0
          ? ribbonArrowLeft.classList.remove("ribbon__arrow_visible")
          : ribbonArrowLeft.classList.add("ribbon__arrow_visible");
      });
    }
  }

  addEventListener() {
    let ribbonItem = this.ribbonInner.querySelectorAll(".ribbon__item");
    for (const item of ribbonItem) {
      item.addEventListener("click", (event) => {
        
        event.preventDefault();

        for (const item of ribbonItem) {
          if (item.classList.contains("ribbon__item_active")) {
            item.classList.remove("ribbon__item_active");
          }
        }

        event.target.classList.add("ribbon__item_active");

        let customEventItem = new CustomEvent("ribbon-select", {
          detail: event.target.dataset.id,
          bubbles: true,
        });
        this.elem.dispatchEvent(customEventItem);
      });
    }
  }
}
