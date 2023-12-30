function hideSelf() {
  document.addEventListener("click", function (event) {
    if (event.target.className != "hide-self-button") return;
    event.target.hidden = true;
  });
}
