function print(text) {
  console.log(text);
}

function isValid(name) {
  return name !== null && !name.includes(" ") && name.length > 3 ? true : false;
}

function sayHello() {
  let userName = prompt("Введите ваше имя");

  if (isValid(userName)) {
    print(`Welcome back, ${userName}!`);
  } else {
    print("Некорректное имя");
  }
}

sayHello();
