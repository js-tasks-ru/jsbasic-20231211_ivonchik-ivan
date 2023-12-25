function makeFriendsList(friends) {
  let ul = document.createElement("ul");
  friends.forEach((friend) => {
    ul.insertAdjacentHTML("beforeend", `<li>${friend.firstName} ${friend.lastName}</li>`);
  });
  return ul;
}
