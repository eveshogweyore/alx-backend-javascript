export default function appendToEachArrayValue(array, appendString) {
  let idx = -1;
  for (const value of array) {
    array[idx += 1] = appendString + value; // eslint-disable-line no-param-reassign
  }

  return array;
}
