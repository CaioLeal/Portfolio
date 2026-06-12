import gsap from 'gsap';
import * as THREE from 'three';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initOcean } from './ocean.js'; 
import { initTechBubbles } from './bubbles.js';
import './holidays.js';

// Registra os plugins e inicia as bolhas de tecnologias
gsap.registerPlugin(ScrollTrigger);
initTechBubbles();

// ==========================================
// 1. OCEANO & TEMA
// ==========================================
const htmlTag = document.documentElement;
const themeToggleBtn = document.getElementById('theme-toggle');
const moodText = document.getElementById('ocean-mood');
const timeText = document.getElementById('ocean-time');

// Inicia o Oceano
initOcean((palette, time, mood) => {
  if(moodText) moodText.innerText = mood;
  if(timeText) timeText.innerText = time;
  htmlTag.style.setProperty('--accent', `rgb(${palette.skyHor[0]}, ${palette.skyHor[1]}, ${palette.skyHor[2]})`);
  htmlTag.style.setProperty('--glass-color', `rgb(${palette.wNear[0]}, ${palette.wNear[1]}, ${palette.wNear[2]})`);
});

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
    // Atualiza a cor do nome em 3D
    if(typeof window.reloadNameTexture === 'function') window.reloadNameTexture();
  });
}

// ==========================================
// 2. IDIOMA E ANIMAÇÃO DA NAVBAR
// ==========================================
const langToggleBtn = document.getElementById('lang-toggle');
if (langToggleBtn) {
  langToggleBtn.addEventListener('click', () => {
    langToggleBtn.innerText = langToggleBtn.innerText === 'PT' ? 'EN' : 'PT';
    gsap.fromTo(langToggleBtn, { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(2)" });
  });
}

window.addEventListener('DOMContentLoaded', () => {
  const tl = gsap.timeline();
  tl.from(".navbar-border-anim", { y: -100, opacity: 0, duration: 1.2, ease: "power4.out" })
    .from([".logo-box", ".nav-links li", ".lang-btn", ".time-widget", ".btn-neon"], {
      y: 20, opacity: 0, duration: 0.6, stagger: 0.05, ease: "back.out(1.5)"
    }, "-=0.8");
});

// ==========================================
// 3. MENU MOBILE
// ==========================================
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
const mobileBtn = document.querySelector('.mobile-btn');

if (hamburger && mobileMenu) {
  let isMenuOpen = false;
  const menuTl = gsap.timeline({ paused: true });

  menuTl.to(mobileMenu, { autoAlpha: 1, duration: 0.4, ease: "power2.inOut" })
        .to([mobileLinks, mobileBtn], { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "back.out(1.5)" }, "-=0.2");

  hamburger.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    hamburger.classList.toggle('active');
    if (isMenuOpen) {
      menuTl.play();
      document.body.style.overflow = 'hidden';
    } else {
      menuTl.reverse();
      document.body.style.overflow = '';
    }
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      isMenuOpen = false;
      hamburger.classList.remove('active');
      menuTl.reverse();
      document.body.style.overflow = '';
    });
  });
}

// ==========================================
// 4. MÁQUINA DE ESCREVER E ENTRADA DA HERO
// ==========================================
async function typeText(element, text, speed = 30) {
  element.innerHTML = '';
  const cursor = document.createElement('span');
  cursor.className = 'typing-cursor';
  element.parentNode.insertBefore(cursor, element.nextSibling);

  for (let i = 0; i < text.length; i++) {
    element.innerHTML += text.charAt(i);
    await new Promise(r => setTimeout(r, speed));
  }
  cursor.remove();
}

async function initTyping() {
  const targets = document.querySelectorAll('.typing-target');
  for (let target of targets) {
    const textToType = target.getAttribute('data-text');
    if (textToType) await typeText(target, textToType, 25);
  }
  
  gsap.fromTo(".hero-buttons", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" });
  gsap.fromTo(".avatar-card-wrapper", { y: 200, opacity: 0, rotation: -15, scale: 0.8 }, { y: 0, opacity: 1, rotation: 5, scale: 1, duration: 1.2, ease: "back.out(1.2)" });
}
setTimeout(initTyping, 1500);

// ==========================================
// 5. NOME 3D (WEBGL) COM EFEITO MOUSE
// ==========================================
const container = document.getElementById("name-shader-container");
if (container) {
  let easeFactor = 0.02;
  let scene, camera, renderer, planeMesh;
  let mousePosition = { x: 0.5, y: 0.5 };
  let targetMousePosition = { x: 0.5, y: 0.5 };
  let prevPosition = { x: 0.5, y: 0.5 };

  const vertexShader = `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;
  const fragmentShader = `
    varying vec2 vUv; uniform sampler2D u_texture; uniform vec2 u_mouse; uniform vec2 u_prevMouse;
    void main() {
      vec2 gridUV = floor(vUv * vec2(40.0, 40.0)) / vec2(40.0, 40.0);
      vec2 centerOfPixel = gridUV + vec2(1.0/40.0, 1.0/40.0);
      vec2 mouseDirection = u_mouse - u_prevMouse;
      vec2 pixelToMouseDirection = centerOfPixel - u_mouse;
      float pixelDistanceToMouse = length(pixelToMouseDirection);
      float strength = smoothstep(0.3, 0.0, pixelDistanceToMouse);
      vec2 uvOffset = strength * -mouseDirection * 0.4;
      vec2 uv = vUv - uvOffset;
      vec4 color = texture2D(u_texture, uv);
      gl_FragColor = color;
    }
  `;

  function createTextTexture(text, font, size, color) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const rect = container.getBoundingClientRect();
    const canvasWidth = rect.width * 2;
    const canvasHeight = rect.height * 2;
    canvas.width = canvasWidth; canvas.height = canvasHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const fontSize = size || Math.floor(canvasHeight * 0.7);
    ctx.fillStyle = color || "#070709";
    ctx.font = `800 ${fontSize}px "${font || "Space Grotesk"}"`;
    const isMobile = window.innerWidth <= 992;
    if (isMobile) {
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText(text, canvasWidth / 2, canvasHeight / 2);
    } else {
      ctx.textAlign = "left"; ctx.textBaseline = "middle";
      ctx.fillText(text, 10, canvasHeight / 2);
    }
    return new THREE.CanvasTexture(canvas);
  }

  function initializeScene(texture) {
    scene = new THREE.Scene();
    const rect = container.getBoundingClientRect();
    const aspectRatio = rect.width / rect.height;
    camera = new THREE.OrthographicCamera(-1, 1, 1 / aspectRatio, -1 / aspectRatio, 0.1, 1000);
    camera.position.z = 1;
    let shaderUniforms = { u_mouse: { type: "v2", value: new THREE.Vector2() }, u_prevMouse: { type: "v2", value: new THREE.Vector2() }, u_texture: { type: "t", value: texture } };
    planeMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2 / aspectRatio), new THREE.ShaderMaterial({ uniforms: shaderUniforms, vertexShader, fragmentShader, transparent: true }));
    scene.add(planeMesh);
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0); 
    renderer.setSize(rect.width, rect.height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
  }

  window.reloadNameTexture = function() {
    const rect = container.getBoundingClientRect();
    renderer.setSize(rect.width, rect.height);
    const aspectRatio = rect.width / rect.height;
    camera.top = 1 / aspectRatio; camera.bottom = -1 / aspectRatio; camera.updateProjectionMatrix();
    planeMesh.geometry.dispose();
    planeMesh.geometry = new THREE.PlaneGeometry(2, 2 / aspectRatio);
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const textColor = isDark ? "#ffffff" : "#070709";
    const newTexture = createTextTexture("Caio Leal", "Space Grotesk", null, textColor);
    planeMesh.material.uniforms.u_texture.value = newTexture;
  }

  setTimeout(() => {
    initializeScene(createTextTexture("Caio Leal", "Space Grotesk", null, document.documentElement.getAttribute('data-theme') === 'dark' ? '#ffffff' : '#070709'));
    animateScene();
  }, 100);

  function animateScene() {
    requestAnimationFrame(animateScene);
    mousePosition.x += (targetMousePosition.x - mousePosition.x) * easeFactor;
    mousePosition.y += (targetMousePosition.y - mousePosition.y) * easeFactor;
    planeMesh.material.uniforms.u_mouse.value.set(mousePosition.x, 1.0 - mousePosition.y);
    planeMesh.material.uniforms.u_prevMouse.value.set(prevPosition.x, 1.0 - prevPosition.y);
    renderer.render(scene, camera);
  }

  container.addEventListener("mousemove", (event) => {
    easeFactor = 0.035;
    let rect = container.getBoundingClientRect();
    prevPosition = { ...targetMousePosition };
    targetMousePosition.x = (event.clientX - rect.left) / rect.width;
    targetMousePosition.y = (event.clientY - rect.top) / rect.height;
  });

  container.addEventListener("mouseenter", (event) => {
    easeFactor = 0.01;
    let rect = container.getBoundingClientRect();
    mousePosition.x = targetMousePosition.x = (event.clientX - rect.left) / rect.width;
    mousePosition.y = targetMousePosition.y = (event.clientY - rect.top) / rect.height;
  });

  container.addEventListener("mouseleave", () => { easeFactor = 0.01; targetMousePosition = { ...prevPosition }; });
  window.addEventListener("resize", window.reloadNameTexture);
}

// ==========================================
// 6. ANIMAÇÕES DA SEÇÃO SOBRE (SCROLL)
// ==========================================
window.addEventListener("DOMContentLoaded", () => {
  gsap.to(".about-hero-portrait", {
    y: -150, rotation: -15, 
    scrollTrigger: { trigger: ".about-hero", start: "top top", end: "bottom top", scrub: 1 }
  });

  gsap.set([".stats-item-1", ".stats-item-2", ".stats-item-3"], { scale: 0, opacity: 0 });
  gsap.to([".stats-item-1", ".stats-item-2", ".stats-item-3"], {
    scale: 1, opacity: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.5)",
    scrollTrigger: { trigger: ".stats", start: "top 75%", toggleActions: "play none none none" }
  });
});



// ==========================================
// 7. ANIMAÇÕES DA SEÇÃO FORMAÇÕES (APPLE STYLE)
// ==========================================
window.addEventListener("DOMContentLoaded", () => {
  const eduCards = document.querySelectorAll('.edu-card');
  
  if (eduCards.length > 0) {
    // 1. Anima os Cards subindo (Stagger)
    gsap.from(eduCards, {
      scrollTrigger: {
        trigger: ".education-container",
        start: "top 80%", // Dispara quando a seção chegar em 80% da tela
      },
      y: 80,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out"
    });

    // 2. Anima as Barras de Progresso e os Números
    ScrollTrigger.create({
      trigger: ".education-container",
      start: "top 70%",
      onEnter: () => {
        // Enche a barrinha colorida
        document.querySelectorAll('.progress-bar-fill').forEach(bar => {
          bar.style.width = bar.getAttribute('data-width');
        });
        
        // Faz a contagem animada do texto de 0% até a % alvo
        document.querySelectorAll('.progress-percent').forEach(el => {
          const targetStr = el.getAttribute('data-target');
          if(!targetStr) return;
          const target = parseInt(targetStr);
          
          let counter = { val: 0 };
          gsap.to(counter, {
            val: target,
            duration: 2,
            ease: "power3.out",
            onUpdate: () => {
              el.innerText = Math.round(counter.val) + "%";
            }
          });
        });
      }
    });
  }
});

// ==========================================
// 8. FUNCIONALIDADES DO FOOTER MÁGICO
// ==========================================
window.addEventListener("DOMContentLoaded", () => {
  // 1. Atualiza o ano automaticamente
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // 2. Efeito de Explosão para TODOS os botões mágicos
  const magicBadges = document.querySelectorAll('.magic-badge');
  magicBadges.forEach(badge => {
    badge.addEventListener('mouseenter', () => {
      // Se já estiver animando, ignora para não interromper a física
      if(badge.classList.contains('is-animating')) return;
      
      // Coloca a classe que dispara as partículas
      badge.classList.add('is-animating');
      
      // O show dura 4 segundos. Depois removemos a classe para poder explodir de novo!
      setTimeout(() => {
        badge.classList.remove('is-animating');
      }, 4000); 
    });
  });
});

// ==========================================
// 9. CARROSSEL DE PROJETOS
// ==========================================
window.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById('projects-track');
  const btnPrev = document.querySelector('.prev-btn');
  const btnNext = document.querySelector('.next-btn');

  if(track && btnPrev && btnNext) {
    // Rola para a direita
    btnNext.addEventListener('click', () => {
      // Pega a largura do primeiro card + o gap(30px) para rolar a medida exata
      const cardWidth = track.querySelector('.project-card-glass').offsetWidth + 30;
      track.scrollBy({ left: cardWidth, behavior: 'smooth' });
    });

    // Rola para a esquerda
    btnPrev.addEventListener('click', () => {
      const cardWidth = track.querySelector('.project-card-glass').offsetWidth + 30;
      track.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    });
  }
});