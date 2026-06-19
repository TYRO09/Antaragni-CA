(function () {
  'use strict';

  const cursorWrapper = document.createElement('div');
  cursorWrapper.id = 'custom-cursor';

  const dot  = document.createElement('div');
  dot.className = 'cursor-dot';

  const barH = document.createElement('div');
  barH.className = 'cursor-h';

  const barV = document.createElement('div');
  barV.className = 'cursor-v';

  cursorWrapper.append(dot, barH, barV);
  document.body.append(cursorWrapper);

  const spotlight = document.getElementById('spotlightOverlay');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  let currentOffsetX = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function tick() {
    const halfW = window.innerWidth / 2;
    const targetOffsetX = mouseX - halfW;

    currentOffsetX += (targetOffsetX - currentOffsetX) * 0.14;
    spotlight.style.transform = `translateX(${currentOffsetX}px)`;

    cursorWrapper.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  const hoverTargets = document.querySelectorAll('.item-column, a, button');
  hoverTargets.forEach((el) => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  const items = document.querySelectorAll('.item-column');
  items.forEach((item, i) => {
    item.style.opacity  = '0';
    item.style.transform = 'translateY(55px)';
    item.style.transition =
      `opacity 0.95s ${0.55 + i * 0.14}s cubic-bezier(0.16, 1, 0.3, 1),
       transform 0.95s ${0.55 + i * 0.14}s cubic-bezier(0.16, 1, 0.3, 1)`;

    requestAnimationFrame(() => requestAnimationFrame(() => {
      item.style.opacity   = '1';
      item.style.transform = 'translateY(0)';
    }));
  });

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    cursorWrapper.remove();
    document.body.style.cursor = 'auto';
  }
})();
