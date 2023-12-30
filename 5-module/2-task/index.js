function toggleText() {
  document.body.addEventListener("click", function (event) {
    if (event.target.className == "toggle-text-button") {
      let text = document.querySelector("#text");
      text.hidden = !text.hidden;
    }
    });
}
