function sumSalary(obj) {
  let result = 0;
  for (const key in obj) {
    if (Number.isFinite(obj[key])) result += obj[key];
  }
  return result;
}
