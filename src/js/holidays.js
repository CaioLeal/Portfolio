document.addEventListener("DOMContentLoaded", () => {
    // =======================================================
    // 1. CONFIGURAÇÃO DOS FERIADOS
    // =======================================================
    const feriados = {
        saoJoao: {
            ativo: true, // Ativo para você testar as fogueiras agora!
            inicio: { mes: 7, dia: 1 },
            fim: { mes: 7, dia: 31 },
            novoAvatar: "", // Ex: "/img/caio-caipira.png"
            imagemNavbar: "", // Ex: "/img/bandeirinhas-navbar.png" (Recomendado: 1200x100)
            imagemFooter: "", 
            imagemVoadora: "", 
            intervaloVoo: 180000,
            icone: ["fa-solid fa-fire", "fa-solid fa-star"], // Fogueira e estrelas
            cores: ["#ff5722", "#ff9800", "#ffc107", "#f44336"],
            fisica: { gravidade: 1.5, vento: 3, rotacao: 10, tamanhoBase: 10, intensidade: 0.05 } 
        },
        natal: {
            ativo: true, 
            inicio: { mes: 11, dia: 15 }, 
            fim: { mes: 12, dia: 26 },
            novoAvatar: "/img/caio-natal.png", 
            imagemNavbar: "/img/luzes-natal-navbar.png", 
            imagemFooter: "/img/neve-footer.png", 
            imagemVoadora: "", 
            intervaloVoo: 180000, 
            icone: ["fa-solid fa-snowflake"], // Floco de neve
            cores: ["#ffffff", "#e0e0e0", "#aadaff"],
            fisica: { gravidade: 1, vento: 0.5, rotacao: 2, tamanhoBase: 8, intensidade: 0.08 }
        },
        carnaval: {
            ativo: true,
            inicio: { mes: 2, dia: 1 }, 
            fim: { mes: 2, dia: 28 }, 
            novoAvatar: "", 
            imagemNavbar: "", 
            imagemFooter: "", 
            imagemVoadora: "", 
            intervaloVoo: 180000,
            icone: ["fa-solid fa-certificate", "fa-solid fa-music"], 
            cores: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"],
            fisica: { gravidade: 3, vento: 1, rotacao: 15, tamanhoBase: 12, intensidade: 0.1 } 
        },
        pascoa: {
            ativo: true,
            inicio: { mes: 3, dia: 15 },
            fim: { mes: 4, dia: 5 },
            novoAvatar: "/img/caio-pascoa.png", 
            imagemNavbar: "", 
            imagemFooter: "", 
            imagemVoadora: "", 
            intervaloVoo: 180000,
            icone: ["fa-solid fa-egg", "fa-solid fa-carrot", "fa-solid fa-rabbit"], 
            cores: ["#ffb3ba", "#ffdfba", "#ffffba", "#baffc9", "#bae1ff"], // Cores pastéis
            fisica: { gravidade: 2, vento: 0.5, rotacao: 5, tamanhoBase: 12, intensidade: 0.05 } 
        },
        copaDoMundo: {
            ativo: true,
            anos: [2026, 2030, 2034, 2038], // Só ativa nestes anos!
            inicio: { mes: 6, dia: 1 },
            fim: { mes: 7, dia: 31 },
            novoAvatar: "/img/caio-copa.png", 
            imagemNavbar: "/img/copa.png", 
            imagemFooter: "", 
            imagemVoadora: "", 
            intervaloVoo: 180000,
            icone: ["fa-solid fa-futbol", "fa-solid fa-trophy"], // Bola e Troféu
            cores: ["#009c3b", "#ffdf00"], // Verde, Amarelo do Brasil
            fisica: { gravidade: 1, vento: 1.5, rotacao: 12, tamanhoBase: 8, intensidade: 0.04 } 
        },
        diaDosNamorados: {
            ativo: true,
            inicio: { mes: 6, dia: 1 },
            fim: { mes: 6, dia: 15 },
            novoAvatar: "/img/caio-cupido.png", 
            imagemNavbar: "", 
            imagemFooter: "", 
            imagemVoadora: "", 
            intervaloVoo: 180000,
            icone: ["fa-solid fa-heart"], // Coraçõezinhos
            cores: ["#ff4d4d", "#ffb3cc", "#ff1a1a", "#ffffff"], 
            fisica: { gravidade: 1.2, vento: 0.5, rotacao: 5, tamanhoBase: 10, intensidade: 0.05 } 
        },
        anoNovo: {
            ativo: true,
            inicio: { mes: 12, dia: 26 },
            fim: { mes: 1, dia: 5 },
            novoAvatar: "", 
            imagemNavbar: "", 
            imagemFooter: "", 
            imagemVoadora: "", 
            intervaloVoo: 180000,
            icone: ["fa-solid fa-star", "fa-solid fa-champagne-glasses"], 
            cores: ["#ffd700", "#ffffff", "#e6e6e6"], // Dourado, branco e prata
            fisica: { gravidade: 2, vento: 1, rotacao: 10, tamanhoBase: 8, intensidade: 0.06 } 
        },
        aniversario: {
            ativo: true,
            inicio: { mes: 10, dia: 1 }, 
            fim: { mes: 10, dia: 10 },
            novoAvatar: "", 
            imagemNavbar: "", 
            imagemFooter: "", 
            imagemVoadora: "", 
            intervaloVoo: 180000,
            icone: ["fa-solid fa-cake-candles", "fa-solid fa-gift", "fa-solid fa-gem"], 
            cores: ["#a259ff", "#00ffcc", "#ffea00", "#ff007f"], 
            fisica: { gravidade: 2.5, vento: 0.5, rotacao: 15, tamanhoBase: 12, intensidade: 0.06 } 
        },
        halloween: {
            ativo: true,
            inicio: { mes: 10, dia: 20 }, 
            fim: { mes: 10, dia: 31 },    
            novoAvatar: "/img/caio-vampiro.png", 
            imagemNavbar: "", 
            imagemFooter: "", 
            imagemVoadora: "", 
            intervaloVoo: 180000, 
            icone: ["fa-solid fa-ghost", "fa-solid fa-spider", "fa-solid fa-bat"], 
            cores: ["#ff7300", "#8a2be2", "#ffffff", "#555555"], 
            fisica: { gravidade: 1.5, vento: 1.5, rotacao: 8, tamanhoBase: 14, intensidade: 0.04 } 
        },
        blackFriday: {
            ativo: false,
            inicio: { mes: 11, dia: 20 }, 
            fim: { mes: 11, dia: 30 },
            novoAvatar: "", 
            imagemNavbar: "", 
            imagemFooter: "", 
            imagemVoadora: "", 
            intervaloVoo: 180000,
            icone: ["fa-solid fa-tag", "fa-solid fa-cart-shopping", "fa-solid fa-percent"], 
            cores: ["#000000", "#ffcc00", "#ffffff", "#ff0000"], 
            fisica: { gravidade: 2.5, vento: 0.2, rotacao: 15, tamanhoBase: 10, intensidade: 0.06 } 
        },
        diaDasCriancas: {
            ativo: true,
            inicio: { mes: 10, dia: 5 },
            fim: { mes: 10, dia: 12 },
            novoAvatar: "", 
            imagemNavbar: "", 
            imagemFooter: "", 
            imagemVoadora: "", 
            intervaloVoo: 180000,
            icone: ["fa-solid fa-puzzle-piece", "fa-solid fa-gamepad", "fa-solid fa-paper-plane"], 
            cores: ["#ff3366", "#33ccff", "#ffff00", "#00ffcc"], 
            fisica: { gravidade: 1.5, vento: 1, rotacao: 10, tamanhoBase: 10, intensidade: 0.05 } 
        }
    };

    // =======================================================
    // 2. LÓGICA DE DETECÇÃO DE DATAS
    // =======================================================
    const hoje = new Date();
    const anoAtual = hoje.getFullYear();
    const mesAtual = hoje.getMonth() + 1; 
    const diaAtual = hoje.getDate();

    let feriadoAtual = null;

    for (const [nome, config] of Object.entries(feriados)) {
        if (!config.ativo) continue;

        const anoPermitido = !config.anos || config.anos.includes(anoAtual);

        let taNoPeriodo = false;
        if (config.inicio.mes > config.fim.mes) {
            taNoPeriodo = (mesAtual === config.inicio.mes && diaAtual >= config.inicio.dia) || 
                          (mesAtual === config.fim.mes && diaAtual <= config.fim.dia);
        } else {
            const depoisDoInicio = (mesAtual > config.inicio.mes) || (mesAtual === config.inicio.mes && diaAtual >= config.inicio.dia);
            const antesDoFim = (mesAtual < config.fim.mes) || (mesAtual === config.fim.mes && diaAtual <= config.fim.dia);
            taNoPeriodo = depoisDoInicio && antesDoFim;
        }

        if (taNoPeriodo && anoPermitido) {
            feriadoAtual = config;
            break; 
        }
    }

    if (!feriadoAtual) return;

    // =======================================================
    // 3. INJEÇÃO DOS ELEMENTOS VISUAIS
    // =======================================================

    // 3.1 TROCA O AVATAR (Na Hero Section)
    if (feriadoAtual.novoAvatar && feriadoAtual.novoAvatar !== "") {
        const avatarImg = document.querySelector(".avatar-img");
        if (avatarImg) {
            avatarImg.src = feriadoAtual.novoAvatar;
        }
    }

    // 3.2 INJETA ENFEITE NA NAVBAR (Bandeirinhas/Luzes)
    if (feriadoAtual.imagemNavbar && feriadoAtual.imagemNavbar !== "") {
        const navbar = document.querySelector(".navbar-border-anim");
        if (navbar) {
            const enfeite = document.createElement("img");
            enfeite.src = feriadoAtual.imagemNavbar;
            enfeite.style.position = "absolute";
            enfeite.style.top = "70px"; // Levemente acima para parecer amarrado
            enfeite.style.left = "0";
            enfeite.style.width = "100%";
            enfeite.style.height = "auto";
            enfeite.style.pointerEvents = "none";
            enfeite.style.zIndex = "10"; // Fica por cima do vidro
            navbar.appendChild(enfeite);
        }
    }

    // 3.3 INJETA A IMAGEM TEMÁTICA NO FOOTER
    if (feriadoAtual.imagemFooter && feriadoAtual.imagemFooter !== "") {
        const footer = document.querySelector(".site-footer");
        if (footer) {
            const imgFooter = document.createElement("img");
            imgFooter.src = feriadoAtual.imagemFooter;
            imgFooter.style.position = "absolute";
            imgFooter.style.bottom = "0";
            imgFooter.style.left = "0";
            imgFooter.style.width = "100%";
            imgFooter.style.height = "auto";
            imgFooter.style.pointerEvents = "none"; 
            imgFooter.style.zIndex = "0"; 
            imgFooter.style.opacity = "0.7"; 
            
            footer.insertBefore(imgFooter, footer.firstChild);
        }
    }

    // 3.4 IMAGEM VOADORA CRUZANDO A TELA
    if (feriadoAtual.imagemVoadora && feriadoAtual.imagemVoadora !== "") {
        const voador = document.createElement("img");
        voador.src = feriadoAtual.imagemVoadora;
        voador.style.position = "fixed"; 
        voador.style.left = "-500px"; 
        voador.style.width = "250px"; 
        voador.style.zIndex = "9999"; 
        voador.style.pointerEvents = "none"; 
        voador.style.filter = "drop-shadow(0 10px 15px rgba(0,0,0,0.3))";
        
        document.body.appendChild(voador);

        const iniciarVoo = () => {
            voador.style.top = `${Math.floor(Math.random() * 20) + 10}%`;
            voador.style.transition = "none";
            voador.style.transform = `translateX(0px)`;
            
            setTimeout(() => {
                voador.style.transition = "transform 12s linear";
                voador.style.transform = `translateX(${window.innerWidth + 1000}px)`;
            }, 100);
        };

        setTimeout(iniciarVoo, 3000);
        setInterval(iniciarVoo, feriadoAtual.intervaloVoo);
    }

    // =======================================================
    // 4. MOTOR FÍSICO DE CHUVA DE ÍCONES (FontAwesome)
    // =======================================================
    const weatherContainer = document.createElement("div");
    weatherContainer.style.position = "fixed";
    weatherContainer.style.top = "0";
    weatherContainer.style.left = "0";
    weatherContainer.style.width = "100vw";
    weatherContainer.style.height = "100vh";
    weatherContainer.style.pointerEvents = "none";
    weatherContainer.style.zIndex = "9998"; 
    weatherContainer.style.overflow = "hidden";
    document.body.appendChild(weatherContainer);

    let mouseX = -1000;
    let mouseY = -1000;
    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    let particulas = [];

    class ParticulaSazonal {
        constructor() {
            this.element = document.createElement("i");
            const iconesPossiveis = feriadoAtual.icone;
            this.element.className = iconesPossiveis[Math.floor(Math.random() * iconesPossiveis.length)];
            this.element.style.color = feriadoAtual.cores[Math.floor(Math.random() * feriadoAtual.cores.length)];
            
            this.element.style.position = "absolute";
            this.element.style.fontSize = `${Math.random() * 10 + feriadoAtual.fisica.tamanhoBase}px`; 
            this.element.style.filter = "drop-shadow(0 2px 5px rgba(0,0,0,0.3))"; // Brilho suave nas partículas
            
            this.x = Math.random() * window.innerWidth;
            this.y = -30; 
            
            this.vy = Math.random() * 2 + feriadoAtual.fisica.gravidade; 
            this.vx = (Math.random() - 0.5) * feriadoAtual.fisica.vento; 
            this.rotacao = Math.random() * 360;
            this.velocidadeRotacao = (Math.random() - .5) * feriadoAtual.fisica.rotacao;

            weatherContainer.appendChild(this.element);
        }

        update() {
            // Efeito repulsão magnética do mouse
            const dx = this.x - mouseX;
            const dy = this.y - mouseY;
            const distancia = Math.sqrt(dx * dx + dy * dy);
            
            if (distancia < 50) { 
                const forcaImpacto = (50 - distancia) / 50;
                this.vx += (dx / distancia) * forcaImpacto * 1.5; 
                this.vy += (dy / distancia) * forcaImpacto * 1.5; 
                this.velocidadeRotacao += (Math.random() - .5) * 30; 
            }

            this.x += this.vx + Math.sin(this.y / 50) * (feriadoAtual.fisica.vento / 2);
            this.y += this.vy;
            this.rotacao += this.velocidadeRotacao;

            this.element.style.transform = `translate(${this.x}px, ${this.y}px) rotate(${this.rotacao}deg)`;
            return this.y < window.innerHeight + 50 && this.x > -50 && this.x < window.innerWidth + 50; 
        }
    }

    const animate = () => {
        if (Math.random() < feriadoAtual.fisica.intensidade) { 
            particulas.push(new ParticulaSazonal());
        }
        particulas = particulas.filter(particula => {
            const taViva = particula.update();
            if (!taViva) {
                particula.element.remove();
            }
            return taViva;
        });

        requestAnimationFrame(animate);
    };

    animate();
});