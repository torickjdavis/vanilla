export function randomInt(min, max) {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

export function unhandledError(error) {
  alert('An Unhandled Error Occurred');
  console.error(error);
}

export function jsonDeepCopy(object) {
  return JSON.parse(JSON.stringify(object));
}
