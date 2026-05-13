const addButton = document.querySelector(".add-progress-bar");
addButton.addEventListener("click", handleButtonClick);
const que = [];
let activeCount = 0;
const MAX_LIMIT = 3;
function handleButtonClick() {
    const progressFill = createProgressUI();
    que.push(() => startTrans(progressFill))
    processQueue();
}

function processQueue() {
    if (activeCount < MAX_LIMIT && que.length > 0) {
        activeCount++;
        const startTrans = que.shift();
        startTrans();
    }
}

function startTrans(progressFill) {
    requestAnimationFrame(() => {
        progressFill.style.width = "100%";
    })

    progressFill.addEventListener('transitionend', ()=> {
        activeCount--;
        processQueue();
    }, { once: true })
}

function createProgressUI() {
    const progressBar = document.createElement("div");
    progressBar.className = "progress-bar";
    document.body.appendChild(progressBar);

    const progressFill = document.createElement("div");
    progressFill.className = "progress-fill";
    progressBar.appendChild(progressFill);
    return progressFill;
}