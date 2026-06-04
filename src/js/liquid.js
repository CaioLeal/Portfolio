import * as THREE from 'three';

let mat, bgCtx, bgCanvas, bgTexture, renderer;

// Função para atualizar as cores se o tema mudar
export function updateLiquidTheme() {
  if(!mat) return;
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  mat.uniforms.uIsDark.value = isDark ? 1.0 : 0.0;
  drawBackground();
}

function drawBackground() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const w = renderer.domElement.width;
  const h = renderer.domElement.height;
  
  const grd = bgCtx.createLinearGradient(0, 0, w * 0.6, h);
  if (isDark) {
    grd.addColorStop(0, "#030610");
    grd.addColorStop(0.5, "#0a1930");
    grd.addColorStop(1, "#0f387a");
  } else {
    grd.addColorStop(0, "#e8dbc8");
    grd.addColorStop(0.35, "#5b8cdb");
    grd.addColorStop(0.6, "#2d6fd4");
    grd.addColorStop(1, "#1a3fa0");
  }
  
  bgCtx.fillStyle = grd;
  bgCtx.fillRect(0, 0, w, h);

  bgCtx.save();
  bgCtx.globalAlpha = isDark ? 0.15 : 0.35;
  for (let i = 0; i < 5; i++) {
    const cx = w * (0.2 + i * 0.18);
    const cy = h * (0.3 + Math.sin(i * 1.3) * 0.25);
    const rg = bgCtx.createRadialGradient(cx, cy, 0, cx, cy, w * 0.35);
    const hue = isDark ? 210 + i * 10 : 200 + i * 25;
    rg.addColorStop(0, `hsla(${hue}, 80%, ${isDark ? 40 : 65}%, 0.6)`);
    rg.addColorStop(1, `hsla(${hue}, 60%, 40%, 0)`);
    bgCtx.fillStyle = rg;
    bgCtx.fillRect(0, 0, w, h);
  }
  bgCtx.restore();

  bgCtx.fillStyle = isDark ? "rgba(255, 255, 255, 0.03)" : "#ffffff";
  bgCtx.textAlign = "center";
  bgCtx.textBaseline = "middle";
  const titleSize = Math.round(w * 0.13);
  bgCtx.font = `800 ${titleSize}px 'Space Grotesk', sans-serif`;
  bgCtx.fillText("Liquid", w * 0.5, h * 0.38);
  bgCtx.fillText("Glass", w * 0.5, h * 0.38 + titleSize * 1.05);

  bgTexture.needsUpdate = true;
}

export function initLiquid() {
  const bgContainer = document.getElementById("liquid-bg");
  if (!bgContainer) return;

  const MAX_DROPLETS = 40;
  renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
  renderer.setSize(window.innerWidth, window.innerHeight);
  bgContainer.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  bgCanvas = document.createElement("canvas");
  bgCtx = bgCanvas.getContext("2d");
  bgTexture = new THREE.CanvasTexture(bgCanvas);
  bgTexture.minFilter = THREE.LinearFilter;
  bgTexture.magFilter = THREE.LinearFilter;
  
  bgCanvas.width = window.innerWidth;
  bgCanvas.height = window.innerHeight;
  drawBackground();

  const MAX_ENTRIES = MAX_DROPLETS * 2;
  const dropletBuf = new Float32Array(MAX_ENTRIES * 4);
  const dropletTex = new THREE.DataTexture(dropletBuf, MAX_ENTRIES, 1, THREE.RGBAFormat, THREE.FloatType);
  dropletTex.minFilter = THREE.NearestFilter;
  dropletTex.magFilter = THREE.NearestFilter;
  
  let drops = [];
  function spawn(x, y, r) {
    if (drops.length >= 15) return; // Limita gotas soltas para não poluir
    drops.push({ x, y, r, vx: (Math.random()-0.5)*0.002, vy: (Math.random()-0.5)*0.002, softOffX: 0, softOffY: 0 });
  }

  for (let i = 0; i < 8; i++) spawn((Math.random()-0.5)*0.7, (Math.random()-0.5)*0.5, 0.04);

  const vertSrc = `void main(){ gl_Position = vec4(position, 1.0); }`;
  const fragSrc = `
    precision highp float;
    #define MAX_N ${MAX_ENTRIES}
    uniform vec2 uRes; uniform sampler2D uData; uniform sampler2D uBg; 
    uniform int uCount; uniform float uIsDark;
    
    void main(){
      vec2 uv = gl_FragCoord.xy / uRes;
      float asp = uRes.x / uRes.y;
      vec2 p = (uv - 0.5) * vec2(asp, 1.0);
      float field = 0.0; vec2 grad = vec2(0.0); vec2 lens = vec2(0.0); float lensW = 0.0;

      for(int i = 0; i < MAX_N; i++){
        if(i >= uCount) break;
        vec4 d = texture2D(uData, vec2((float(i)+0.5)/float(MAX_N), 0.5));
        if(d.z < 0.001) continue;
        vec2 delta = p - d.xy; float dSq = dot(delta, delta) + 1e-5; float contrib = d.z * d.z / dSq;
        field += contrib; grad += -2.0 * contrib / dSq * delta;
        float w = d.z * d.z / (dSq + d.z * d.z); lens += (d.xy - p) * w; lensW += w;
      }
      
      lens /= (lensW + 0.001); float lensLen = length(lens);
      float thr = 1.0; float edge = smoothstep(thr - 0.08, thr + 0.03, field);
      vec2 refractDir = (lensLen > 1e-5) ? lens / lensLen : vec2(0.0);
      vec2 refractedUV = clamp(uv + refractDir * atan(lensLen * 6.0) * 0.035 * smoothstep(thr - 0.2, thr + 1.5, field), 0.001, 0.999);
      
      float gradLen = length(grad); vec2 nGrad = (gradLen > 1e-4) ? (grad / gradLen) * atan(gradLen * 0.5) * 0.3 : vec2(0.0);
      vec3 N = normalize(vec3(-nGrad, 1.0)); vec3 L = normalize(vec3(0.3, 0.6, 1.0)); vec3 V = vec3(0.0, 0.0, 1.0);
      float diff = max(dot(N, L), 0.0); float spec = pow(max(dot(N, normalize(L + V)), 0.0), 180.0);
      float fresnel = 0.04 + 0.96 * pow(1.0 - max(dot(N, V), 0.0), 4.0);
      
      float ca = 0.0018 * edge;
      vec3 bgCA = vec3(texture2D(uBg, refractedUV + ca).r, texture2D(uBg, refractedUV).g, texture2D(uBg, refractedUV - ca).b);
      
      vec3 glassColor = bgCA * mix(vec3(1.0), vec3(0.93, 0.96, 1.0), smoothstep(thr, thr + 3.0, field) * 0.45) * (0.92 + 0.08 * diff) 
                      + vec3(1.0) * spec * 0.85 + vec3(0.9, 0.95, 1.0) * smoothstep(thr + 0.6, thr, field) * edge * 0.22 + vec3(1.0) * fresnel * 0.10;
      
      vec3 bg = texture2D(uBg, uv).rgb * (1.0 - smoothstep(thr - 0.35, thr - 0.05, field) * 0.06);
      vec3 col = mix(bg, glassColor, edge) + vec3(1.0) * (smoothstep(thr - 0.10, thr - 0.01, field) * (1.0 - smoothstep(thr, thr + 0.06, field)) * 0.28);
      
      // MÁGICA DO TEMA: No escuro, o fundo vazio é transparente para as estrelas aparecerem!
      float alpha = mix(1.0, max(0.0, edge * 1.5), uIsDark);
      gl_FragColor = vec4(col, alpha);
    }
  `;

  mat = new THREE.ShaderMaterial({
    vertexShader: vertSrc, fragmentShader: fragSrc, transparent: true,
    uniforms: {
      uRes: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uData: { value: dropletTex }, uBg: { value: bgTexture }, 
      uCount: { value: MAX_ENTRIES },
      uIsDark: { value: document.documentElement.getAttribute('data-theme') === 'dark' ? 1.0 : 0.0 }
    }
  });
  scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat));

  let aspect = window.innerWidth / window.innerHeight;
  const mouse = { x: 999, y: 999, active: false };

  window.addEventListener("pointermove", (e) => {
    mouse.x = (e.clientX / window.innerWidth - 0.5) * aspect;
    mouse.y = 0.5 - e.clientY / window.innerHeight;
    mouse.active = true;
  });

  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    aspect = window.innerWidth / window.innerHeight;
    mat.uniforms.uRes.value.set(window.innerWidth, window.innerHeight);
    drawBackground();
  });

  function sync() {
    dropletBuf.fill(0);
    let index = 0;
    
    // Gotas do Mouse
    for (const d of drops) {
      d.x += d.vx; d.y += d.vy; d.vx *= 0.99; d.vy *= 0.99;
      if (mouse.active) {
        const dx = d.x - mouse.x; const dy = d.y - mouse.y; const dSq = dx*dx + dy*dy;
        if (dSq < 0.05 && dSq > 1e-5) { const dist = Math.sqrt(dSq); d.vx += (dx/dist)*0.002; d.vy += (dy/dist)*0.002; }
      }
      if (d.x < -aspect/2 || d.x > aspect/2) d.vx *= -1;
      if (d.y < -0.5 || d.y > 0.5) d.vy *= -1;

      dropletBuf[index*4] = d.x; dropletBuf[index*4+1] = d.y; dropletBuf[index*4+2] = d.r;
      dropletBuf[(MAX_DROPLETS+index)*4] = d.x; dropletBuf[(MAX_DROPLETS+index)*4+1] = d.y; dropletBuf[(MAX_DROPLETS+index)*4+2] = d.r * 0.6;
      index++;
    }

    // INJEÇÃO DAS LOGOS DO HTML NO 3D!
    const techBubbles = document.querySelectorAll('.tech-bubble');
    techBubbles.forEach(b => {
      if (index >= MAX_DROPLETS) return;
      const rect = b.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      
      const shaderX = (cx / window.innerWidth - 0.5) * aspect;
      const shaderY = 0.5 - (cy / window.innerHeight);
      const shaderR = (rect.width / 2.2) / window.innerHeight;

      dropletBuf[index*4] = shaderX; dropletBuf[index*4+1] = shaderY; dropletBuf[index*4+2] = shaderR;
      // Sem rastro fantasma para as logos ficarem nítidas
      dropletBuf[(MAX_DROPLETS+index)*4+2] = 0; 
      index++;
    });

    dropletTex.needsUpdate = true;
  }

  (function loop() {
    sync();
    renderer.render(scene, camera);
    requestAnimationFrame(loop);
  })();
}