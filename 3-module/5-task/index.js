function getMinMax(str) {
  let number = str.split(" ").filter((i) => isFinite(i));
  let result = {};
  result.max = Math.max(...number);
  result.min = Math.min(...number);
  return result;
}
