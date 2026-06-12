import { initOcean } from './ocean.js';

window.addEventListener('DOMContentLoaded', () => {
  const htmlTag = document.documentElement;
  const themeToggleBtn = document.getElementById('theme-toggle');

  // 1. Inicia o Fundo Oceânico (igual do site principal)
  initOcean((palette) => {
    htmlTag.style.setProperty('--accent', `rgb(${palette.skyHor[0]}, ${palette.skyHor[1]}, ${palette.skyHor[2]})`);
    htmlTag.style.setProperty('--glass-color', `rgb(${palette.wNear[0]}, ${palette.wNear[1]}, ${palette.wNear[2]})`);
  });

  // 2. Lógica do botão de Sol/Lua
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isDark = htmlTag.getAttribute('data-theme') === 'dark';
      if (!isDark) {
        htmlTag.setAttribute('data-theme', 'dark');
        themeToggleBtn.innerText = '🌙';
        window.forceOceanNight = true; 
      } else {
        htmlTag.setAttribute('data-theme', 'light');
        themeToggleBtn.innerText = '☀️';
        window.forceOceanNight = false; 
      }
    });
  }

  // 3. Galeria de Imagens (Troca a foto principal ao clicar na Thumb)
  const mainImg = document.getElementById('main-gallery-img');
  const thumbs = document.querySelectorAll('.gallery-thumbnails .thumb');

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', function() {
      // Tira o "active" de todas e bota só na clicada
      thumbs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');

      // Troca a fonte da imagem principal
      const newSrc = this.getAttribute('data-full');
      mainImg.style.opacity = 0; // Efeito de piscar
      
      setTimeout(() => {
        mainImg.src = newSrc;
        mainImg.style.opacity = 1;
      }, 200);
    });
  });

  // 4. Atualiza ano do rodapé
  const yearSpan = document.getElementById('current-year');
  if(yearSpan) yearSpan.textContent = new Date().getFullYear();
});