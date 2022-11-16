const MAX_RANDOM_RETRY_COUNT = 5;

export function selectRandomOptions(arr, correctIndex, field) {
  return [
    arr[randomOptionIndex(correctIndex, arr)][field],
    arr[randomOptionIndex(correctIndex, arr)][field],
    arr[correctIndex][field],
    arr[randomOptionIndex(correctIndex, arr)][field],
  ].sort((a, b) => 0.5 - Math.random());
}

//Randomizer index for RANDOM(incorrect) flag
let randomOptionIndex = (correctIndex, arr, retryCount = 0) => {
  let randomOptionIndex = Math.floor(Math.random() * arr.length);

  //Generate a randomOptionIndex again if duplicates are detected, stop a recursive function with retryCount.
  if (
    randomOptionIndex === correctIndex &&
    retryCount < MAX_RANDOM_RETRY_COUNT
  ) {
    return randomOptionIndex(correctIndex, retryCount++);
  } else if (retryCount >= MAX_RANDOM_RETRY_COUNT) {
    console.log(
      `Retry count has reached the limit of ${MAX_RANDOM_RETRY_COUNT}`
    );
    return 0;
  } else {
    return randomOptionIndex;
  }
};
