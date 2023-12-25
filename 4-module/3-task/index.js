function highlight(table) {
  for (const tr of table.children[1].rows) {
    let status = tr.cells[3].dataset.available;
    switch (status) {
      case "true":
        tr.classList.add("available");
        break;
      case "false":
        tr.classList.add("unavailable");
        break;
      default:
        tr.hidden = true;
        break;
    }

    let gender = tr.cells[2].textContent;
    switch (gender) {
      case "m":
        tr.classList.add("male");
        break;

      case "f":
        tr.classList.add("female");
        break;
    }

    let age = +tr.cells[1].textContent;
    age < 18 ? (tr.style.textDecoration = "line-through") : undefined;
  }
}

