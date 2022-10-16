export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


export function random(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
}


export function sequence_getRandom(sequence) {
  return sequence[random(0, sequence.length - 1)];
}
