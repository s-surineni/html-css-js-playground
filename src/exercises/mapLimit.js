// Implement mapLimit, which is a utility function that produces a list of outputs by mapping each input through an asynchronous iteratee function. The provided limit dictates how many operations can occur at once.



// Inputs

// inputs: An array of inputs.

// limit: The maximum number of operations at any one time.

// iterateeFn: The async function that should be called with each input to generate the corresponding output. It will have two arguments:

// input: The input being processed.

// callback: A function that will be called when the input is finished processing. It will be provided one argument, the processed output.

// callback: A function that should be called with the array of outputs once all the inputs have been processed.



function getNameById(id, callback) {

  // simulating async request

  const randomRequestTime = Math.floor(Math.random() * 100) + 200;



  setTimeout(() => {

    callback("User" + id);

  }, randomRequestTime);

}



function mapLimit(inputs, limit, iterateeFn, callback) {
  const results = [];
  let nextIndex = 0;
  let completedCount = 0;

  // Edge case: empty input
  if (inputs.length === 0) {
    callback([]);
    return;
  }

  function runTask() {
    // 1. If all items have been processed, stop spawning new tasks
    if (nextIndex >= inputs.length) {
      return;
    }

    // 2. Capture the current index and increment global counter
    // We store the index locally so the callback knows where to put the result
    // todo: why are we storing current index here separatedly
    const currentIndex = nextIndex;
    const currentInput = inputs[currentIndex];
    nextIndex++;

    iterateeFn(currentInput, (output) => {
      results[currentIndex] = output;
      completedCount++;

      // 3. Check if we are totally finished
      if (completedCount === inputs.length) {
        callback(results);
      } else {
        // 4. As soon as one task finishes, pick up the next available one
        runTask();
      }
    });
  }

  // 5. Initially fire off tasks up to the limit (or input length, whichever is smaller)
  const initialBatchSize = Math.min(inputs.length, limit);
  for (let i = 0; i < initialBatchSize; i++) {
    runTask();
  }
}

//example:

mapLimit([1, 2, 3, 4, 5], 2, getNameById, (allResults) => {

  console.log("output", allResults); // ["User1", "User2", "User3", "User4", "User5"]

});