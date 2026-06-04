// --- stars.js ---
import Lenis from '@studio-freight/lenis';

export function initStars() {
  // 1. INICIALIZAÇÃO DO SCROLL SUAVE (LENIS)
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // 2. LÓGICA DO CONTAINER DE ESTRELAS
  const container = document.getElementById('star-container');
  if (!container) return; // Segurança caso a div não exista
  
  container.innerHTML = ''; // Limpa caso recarregue

  const count = 80;
  const stars = [];

  // Geração das estrelas
  for (let i = 0; i < count; i++) {
    const s = document.createElement('div');
    s.className = 'star';

    const x = Math.random() * 100;
    const y = Math.random() * 100; 
    const isStatic = Math.random() < 0.3;
    const z = isStatic ? 0 : 0.2 + Math.random() * 0.6; 
    const size = isStatic ? 1 + Math.random() : 1 + Math.random() * 2; 

    s.style.left = x + '%';
    s.style.top = y + '%';
    s.style.width = size + 'px';
    s.style.height = size + 'px';
    s.style.setProperty('--duration', (2 + Math.random() * 4) + 's');
    s.style.animationDelay = (Math.random() * 5) + 's';

    container.appendChild(s);
    stars.push({ el: s, initialY: y, speed: z });
  }

  // 3. EFEITO WARP SPEED LIGADO AO SCROLL
  lenis.on('scroll', ({ scroll, velocity }) => {
    // Calcula o quanto as estrelas vão esticar baseado na velocidade da rolagem
    const stretch = Math.max(1, Math.min(1 + Math.abs(velocity) * 0.15, 4));

    stars.forEach(star => {
      if (star.speed === 0) {
        star.el.style.transform = 'scaleY(1)';
        return;
      }
      
      let pos = (star.initialY - (scroll * star.speed * 0.05)) % 100;
      if (pos < 0) pos += 100; 

      star.el.style.top = pos + '%';
      star.el.style.transform = `scaleY(${stretch})`;
    });
  });
}