const queue = [];
let activeCount = 0;
const LIMIT = 3;
const addBtn = document.querySelector('.add-btn');
const wrapper = document.querySelector('.wrapper');

// Attach the handler
addBtn.addEventListener('click', handleButtonClick);
function handleButtonClick() {
  // Create the UI element immediately
  const bar = createBarUI(); 
  
  // Wrap the 'work' in a function and push to queue
  queue.push(() => startWork(bar));
  
  processQueue();
}

function processQueue() {
  if (activeCount < LIMIT && queue.length > 0) {
    activeCount++;
    const nextTask = queue.shift();
    nextTask();
  }
}

function startWork(bar) {
  requestAnimationFrame(() => {
    bar.style.width = '100%';
  });
  
  // Use timeout to simulate work completion
  setTimeout(() => {
    activeCount--;
    processQueue(); // Try to start the next one in the queue
  }, 3000); // Must match CSS transition time
}

function createBarUI() {
  const container = document.createElement('div');
  container.className = 'progress-container';
  
  const bar = document.createElement('div');
  bar.className = 'progress-bar';
  
  container.appendChild(bar);
  wrapper.appendChild(container);
  
  return bar; // Return the bar so startWork can animate it
}