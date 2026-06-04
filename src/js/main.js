import gsap from 'gsap';
import * as THREE from 'three';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initStars } from './stars.js';
// IMPORTANTE: Importamos a função de Update também!
import { initLiquid, updateLiquidTheme } from './liquid.js'; 
import { initTechBubbles } from './bubbles.js';

gsap.registerPlugin(ScrollTrigger);
initStars();
initLiquid();
initTechBubbles();

const themeToggleBtn = document.getElementById('theme-toggle');
const htmlTag = document.documentElement;
const wave = document.getElementById('theme-wave');

themeToggleBtn.addEventListener('click', (e) => {
  const rect = themeToggleBtn.getBoundingClientRect();
  const startX = rect.left + rect.width / 2;
  const startY = rect.top + rect.height / 2;

  const currentTheme = htmlTag.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.getElementById('star-container').style.opacity = newTheme === 'light' ? '0' : '1';
  wave.style.backgroundColor = newTheme === 'light' ? '#f0f0f5' : '#070709';
  wave.style.display = 'block';
  
  gsap.fromTo(wave, 
    { clipPath: `circle(0px at ${startX}px ${startY}px)` },
    { 
      clipPath: `circle(150vw at ${startX}px ${startY}px)`, 
      duration: 1, 
      ease: "power3.inOut",
      onComplete: () => {
        htmlTag.setAttribute('data-theme', newTheme);
        updateLiquidTheme(); // NOVO: Atualiza as cores do líquido!
        gsap.to(wave, {
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            wave.style.display = 'none';
            wave.style.opacity = 1;
          }
        });
      }
    }
  );
});

// Idioma
const langToggleBtn = document.getElementById('lang-toggle');
langToggleBtn.addEventListener('click', () => {
  langToggleBtn.innerText = langToggleBtn.innerText === 'PT' ? 'EN' : 'PT';
  gsap.fromTo(langToggleBtn, { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(2)" });
});

// Animação de Entrada
window.addEventListener('DOMContentLoaded', () => {
  const tl = gsap.timeline();
  tl.from(".navbar-border-anim", {
    y: -100,
    opacity: 0,
    duration: 1.2,
    ease: "power4.out"
  })
  .from([".logo-box", ".nav-links li", ".lang-btn", ".theme-switch", ".btn-neon"], {
    y: 20,
    opacity: 0,
    duration: 0.6,
    stagger: 0.05,
    ease: "back.out(1.5)"
  }, "-=0.8");
});

// --- Lógica do Menu Mobile com GSAP ---
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
const mobileBtn = document.querySelector('.mobile-btn');

let isMenuOpen = false;

// Criamos uma timeline pausada para ter controle total de ida e volta
const menuTl = gsap.timeline({ paused: true });

menuTl.to(mobileMenu, {
  autoAlpha: 1, // Faz a transição de visibility e opacity junta
  duration: 0.4,
  ease: "power2.inOut"
})
// Stagger faz os links surgirem um após o outro (efeito cascata)
.to([mobileLinks, mobileBtn], {
  y: 0,
  opacity: 1,
  duration: 0.5,
  stagger: 0.05,
  ease: "back.out(1.5)"
}, "-=0.2"); // Começa a animar os textos antes do fundo terminar de aparecer

hamburger.addEventListener('click', () => {
  isMenuOpen = !isMenuOpen;
  hamburger.classList.toggle('active');
  
  if (isMenuOpen) {
    menuTl.play();
    document.body.style.overflow = 'hidden'; // Trava o scroll da página atrás do menu
  } else {
    menuTl.reverse();
    document.body.style.overflow = ''; // Libera o scroll
  }
});

// Fechar menu suavemente se clicar em algum link
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    isMenuOpen = false;
    hamburger.classList.remove('active');
    menuTl.reverse();
    document.body.style.overflow = '';
  });
});

// ==========================================
// 1. EFEITO DE DIGITAÇÃO (TYPING EFFECT)
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
  
  // Remove o cursor após terminar de digitar
  cursor.remove();
}

async function initTyping() {
  const targets = document.querySelectorAll('.typing-target');
  for (let target of targets) {
    const textToType = target.getAttribute('data-text');
    await typeText(target, textToType, 25);
  }
  
  // 1. Anima os botões surgindo
  gsap.fromTo(".hero-buttons", 
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
  );

  // 2. Animação Épica da Carta!
  // Ela vem muito de baixo (y: 200), rotacionada pra esquerda e meio encolhida
  // E pousa levemente tombada para a direita (rotation: 6) no tamanho real (scale: 1)
  gsap.fromTo(".avatar-card-wrapper",
    { y: 200, opacity: 0, rotation: -15, scale: 0.8 }, 
    { y: 0, opacity: 1, rotation: 5, scale: 1, duration: 1.2, ease: "back.out(1.2)" } 
  );
}

// Inicia a digitação após o carregamento inicial da Navbar
setTimeout(initTyping, 1500);

// ==========================================
// 2. EFEITO SHADER NO NOME (Adapted Three.js)[cite: 14, 15, 16]
// ==========================================
const container = document.getElementById("name-shader-container");
let easeFactor = 0.02;
let scene, camera, renderer, planeMesh;
let mousePosition = { x: 0.5, y: 0.5 };
let targetMousePosition = { x: 0.5, y: 0.5 };
let prevPosition = { x: 0.5, y: 0.5 };

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform sampler2D u_texture;
  uniform vec2 u_mouse;
  uniform vec2 u_prevMouse;

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

//[cite: 15]
function createTextTexture(text, font, size, color) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  
  // Pega o tamanho exato da div do nome
  const rect = container.getBoundingClientRect();
  const canvasWidth = rect.width * 2;
  const canvasHeight = rect.height * 2;

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  // Fundo transparente (alteração fundamental para o Dark Mode)
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const fontSize = size || Math.floor(canvasHeight * 0.7);

  ctx.fillStyle = color || "#ffffff";
  ctx.font = `800 ${fontSize}px "${font || "Space Grotesk"}"`;
  
  // Alinhamento para a esquerda como na referência
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  // Identifica se estamos em uma tela menor (Mobile/Tablet)
  const isMobile = window.innerWidth <= 992;
  
  if (isMobile) {
    // No mobile, escreve no meio exato do canvas
    ctx.textAlign = "center";
    ctx.fillText(text, canvasWidth / 2, canvasHeight / 2);
  } else {
    // No Desktop, mantém encostado na esquerda
    ctx.textAlign = "left";
    ctx.fillText(text, 10, canvasHeight / 2);
  }

  return new THREE.CanvasTexture(canvas);
}

//[cite: 15]
function initializeScene(texture) {
  scene = new THREE.Scene();
  const rect = container.getBoundingClientRect();
  const aspectRatio = rect.width / rect.height;
  
  camera = new THREE.OrthographicCamera(-1, 1, 1 / aspectRatio, -1 / aspectRatio, 0.1, 1000);
  camera.position.z = 1;

  let shaderUniforms = {
    u_mouse: { type: "v2", value: new THREE.Vector2() },
    u_prevMouse: { type: "v2", value: new THREE.Vector2() },
    u_texture: { type: "t", value: texture },
  };

  planeMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2 / aspectRatio), // Ajusta a geometria à proporção
    new THREE.ShaderMaterial({
      uniforms: shaderUniforms,
      vertexShader,
      fragmentShader,
      transparent: true // Permite ver o fundo do site[cite: 15]
    })
  );

  scene.add(planeMesh);

  // Fundo transparente no WebGL
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setClearColor(0x000000, 0); 
  renderer.setSize(rect.width, rect.height);
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);
}

//[cite: 15]
function reloadTexture() {
  const rect = container.getBoundingClientRect();
  renderer.setSize(rect.width, rect.height);
  const aspectRatio = rect.width / rect.height;
  
  camera.top = 1 / aspectRatio;
  camera.bottom = -1 / aspectRatio;
  camera.updateProjectionMatrix();
  
  planeMesh.geometry.dispose();
  planeMesh.geometry = new THREE.PlaneGeometry(2, 2 / aspectRatio);

  const newTexture = createTextTexture("Caio Leal", "Space Grotesk", null, "#ffffff");
  planeMesh.material.uniforms.u_texture.value = newTexture;
}

// Inicializa passando o seu nome[cite: 13, 15]
setTimeout(() => {
  initializeScene(createTextTexture("Caio Leal", "Space Grotesk", null, "#ffffff"));
  animateScene();
}, 100); // Pequeno delay para garantir que o CSS renderizou os tamanhos

//[cite: 15]
function animateScene() {
  requestAnimationFrame(animateScene);
  mousePosition.x += (targetMousePosition.x - mousePosition.x) * easeFactor;
  mousePosition.y += (targetMousePosition.y - mousePosition.y) * easeFactor;

  planeMesh.material.uniforms.u_mouse.value.set(mousePosition.x, 1.0 - mousePosition.y);
  planeMesh.material.uniforms.u_prevMouse.value.set(prevPosition.x, 1.0 - prevPosition.y);

  renderer.render(scene, camera);
}

// Eventos de Mouse confinados à div do nome[cite: 15]
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

container.addEventListener("mouseleave", () => {
  easeFactor = 0.01;
  targetMousePosition = { ...prevPosition };
});

window.addEventListener("resize", reloadTexture);

// ==========================================
// 3. ANIMAÇÕES DA SEÇÃO SOBRE (ScrollTrigger)
// ==========================================
window.addEventListener("DOMContentLoaded", () => {
  // Animação da Foto flutuando
  gsap.to(".about-hero-portrait", {
    y: -150, 
    rotation: -15, 
    scrollTrigger: {
      trigger: ".about-hero",
      start: "top top", 
      end: "bottom top", 
      scrub: 1, // Faz a animação seguir a roda do mouse suavemente
    },
  });

  // Configuração das Tags Flutuantes
  const tags = [
    { id: "#tag-1", y: -200, rot: -30 },
    { id: "#tag-2", y: -100, rot: 50 },
    { id: "#tag-3", y: -250, rot: 90 },
    { id: "#tag-4", y: -180, rot: -40 },
    { id: "#tag-5", y: -150, rot: 80 }
  ];

  tags.forEach(tag => {
    if (document.querySelector(tag.id)) {
      gsap.to(tag.id, {
        y: tag.y,
        rotation: tag.rot,
        scrollTrigger: {
          trigger: ".about-copy",
          start: "top bottom",
          end: "bottom+=50% top",
          scrub: 1,
        },
      });
    }
  });

  // Animação das Estatísticas (Cards pulando na tela)
  gsap.set([".stats-item-1", ".stats-item-2", ".stats-item-3"], { scale: 0, opacity: 0 });
  
  gsap.to([".stats-item-1", ".stats-item-2", ".stats-item-3"], {
    scale: 1,
    opacity: 1,
    duration: 0.8,
    stagger: 0.15,
    ease: "back.out(1.5)",
    scrollTrigger: {
      trigger: ".stats",
      start: "top 75%", 
      toggleActions: "play none none none",
    },
  });
});