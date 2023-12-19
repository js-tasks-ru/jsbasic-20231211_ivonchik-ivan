function showSalary(users, age) {
  let name_balance = [];
  users.forEach((user) => user.age <= age ? name_balance.push(`${user.name}, ${user.balance}`) : undefined)

  return name_balance.join("\n")
}
