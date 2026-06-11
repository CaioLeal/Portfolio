export function initTechBubbles() {
  const container = document.getElementById('tech-pool');
  if (!container) return;

  // As 15 tecnologias que você pediu
  const techs = [
    'html5/html5-original.svg', 'css3/css3-original.svg', 'javascript/javascript-original.svg',
    'java/java-original.svg', 'php/php-original.svg', 'python/python-original.svg',
    'c/c-original.svg', 'git/git-original.svg', 'firebase/firebase-plain.svg',
    'supabase/supabase-original.svg', 'vitejs/vitejs-original.svg', 'tailwindcss/tailwindcss-original.svg', 
    'nodejs/nodejs-original.svg', 'bootstrap/bootstrap-original.svg', 'mysql/mysql-original.svg'
  ];

  const bubbles = [];
  techs.forEach(tech => {
    const b = document.createElement('div');
    b.className = 'tech-bubble';
    b.innerHTML = `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${tech}" alt="Tech">`;
    container.appendChild(b);

    bubbles.push({
      el: b,
      x: 50 + Math.random() * (container.clientWidth - 100),
      y: 50 + Math.random() * (container.clientHeight - 100),
      vx: (Math.random() - 0.5) * 3,
      vy: (Math.random() - 0.5) * 3,
      radius: 50 // Metade do tamanho da bolha
    });
  });

  let mouse = { x: -1000, y: -1000 };
  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  container.addEventListener('mouseleave', () => {
    mouse.x = -1000; mouse.y = -1000;
  });

  function update() {
    bubbles.forEach(b => {
      b.x += b.vx;
      b.y += b.vy;

      // Colisão com as paredes
      if(b.x <= b.radius || b.x >= container.clientWidth - b.radius) b.vx *= -1;
      if(b.y <= b.radius || b.y >= container.clientHeight - b.radius) b.vy *= -1;

      // Repulsão do mouse
      const dx = b.x - mouse.x;
      const dy = b.y - mouse.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if(dist < 120) {
        b.vx += (dx / dist) * 0.8;
        b.vy += (dy / dist) * 0.8;
      }

      // Limite de velocidade
      const speed = Math.sqrt(b.vx*b.vx + b.vy*b.vy);
      if(speed > 2.5) {
        b.vx = (b.vx/speed) * 2.5;
        b.vy = (b.vy/speed) * 2.5;
      }

      b.el.style.transform = `translate(${b.x - b.radius}px, ${b.y - b.radius}px)`;
    });
    requestAnimationFrame(update);
  }
  update();
}