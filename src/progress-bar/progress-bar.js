document.querySelector('.add-btn').addEventListener('click', () => {
  const container = document.createElement('div');
  container.className = 'progress-container';

  const fill = document.createElement('div');
  fill.className = 'progress-fill';
  fill.setAttribute('role', 'progressbar');
  fill.setAttribute('aria-label', 'Animation progress');
  fill.setAttribute('aria-valuemin', '0');
  fill.setAttribute('aria-valuemax', '100');
  fill.setAttribute('aria-valuenow', '0');
  container.appendChild(fill);

  document.querySelector('.wrapper').appendChild(container);

  requestAnimationFrame(() => {
    fill.style.width = '100%';
  });

  fill.addEventListener('transitionend', () => {
    fill.setAttribute('aria-valuenow', '100');
  }, { once: true });
});
