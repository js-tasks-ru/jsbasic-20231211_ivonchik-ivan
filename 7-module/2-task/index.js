import createElement from "../../assets/lib/create-element.js";

export default class Modal {
  constructor() {
    this.modalWindow();
    this.addEventClick();
  }

  modalWindow() {
    this.elem = createElement(`
    <div class="container">

    <div class="modal">

      <div class="modal__overlay"></div>
  
      <div class="modal__inner">
        <div class="modal__header">

          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>
  
          <h3 class="modal__title">
            Вот сюда нужно добавлять заголовок
          </h3>
        </div>
  
        <div class="modal__body">
          A сюда нужно добавлять содержимое тела модального окна
        </div>
      </div>
    </div>
  </div>
    `);
  }

  open() {
    document.body.append(this.elem);
    document.body.classList.add("is-modal-open");

    this.keydownEventListener = (event) => this.onDocumentKeyDown(event);
    document.addEventListener("keydown", this.keydownEventListener);
  }

  setTitle(title) {
    let modalTitle = this.elem.querySelector(".modal__title");
    modalTitle.textContent = title;
  }

  setBody(node) {
    let modalBody = this.elem.querySelector(".modal__body");
    modalBody.innerHTML = "";
    modalBody.insertAdjacentElement("beforeend", node);
  }

  close() {
    this.elem.remove();
    document.body.classList.remove("is-modal-open");
    document.removeEventListener("keydown", this.keydownEventListener);
  }

  addEventClick() {
    let modalClose = this.elem.querySelector(".modal__close");

    modalClose.addEventListener("click", () => {
      this.close();
    });
  }

  onDocumentKeyDown(event) {
    if (event.code === "Escape") {
      this.close();
    }
  }
}
