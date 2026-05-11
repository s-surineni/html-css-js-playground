document.querySelector('.add-btn').addEventListener('click', () => {
    const container = document.createElement('div');
    container.className = 'progress-container';

    const fill = document.createElement('div');
    fill.className = 'progress-fill';
    container.appendChild(fill);

    document.querySelector('.wrapper').appendChild(container);

    // Animate the progress bar
    requestAnimationFrame(() => {
    fill.style.width = '100%';
  });
});