/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(arr) {
    this.arr = arr;
    this.elem = document.createElement("table");
    this.createTable();
  }
  createTable() {
    this.elem.insertAdjacentHTML(
      "afterbegin",
      `<thead>
      <tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
          <th></th>
      </tr>
  </thead>`
    );

    let tbody = document.createElement("tbody");
    this.elem.append(tbody);

    this.arr.forEach((obj) => {
      tbody.insertAdjacentHTML(
        "beforeend",
        `<tr>
      <td>${obj.name}</dh>
      <td>${obj.age}</dh>
      <td>${obj.salary}</dh>
      <td>${obj.city}</dh>
      <th><button>X</button></th>
  </tr>`
      );
    });

    let buttonsСlose = this.elem.querySelectorAll("button");
    for (const button of buttonsСlose) {
      button.addEventListener("click", (event) => event.target.closest("tr").remove() );
    }
  }
}
