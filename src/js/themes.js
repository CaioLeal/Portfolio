document.addEventListener("DOMContentLoaded", () => {
    // =======================================================
    // 1. CONFIGURAÇÃO DE TEMAS ESPECIAIS (OVERHAUL DO SITE)
    // =======================================================
    const temas = {
        gta6: {
            ativo: true, // Ativado para você testar
            inicio: { mes: 1, dia: 19 }, 
            fim: { mes: 12, dia: 31 },
            cores: {
                // O gradiente de background que você passou
                fundo: "linear-gradient(135deg,rgba(48, 63, 190, 1) 0%, rgba(105, 66, 180, 1) 15%, rgba(200, 142, 198, 1) 25%, rgba(206, 76, 169, 1) 35%)",
                // Ajuste de cores das variáveis do CSS
                accent: "#d04ba7",       // Laranja GTA para botões e detalhes
                glassColor: "#ab56b4",   // Roxo GTA
                neonPink: "#d39f9d",
                // Navbar e Cards mais escuros para dar leitura em cima do fundo colorido
                pillBg: "linear-gradient(to right, #3240c1, #913da7, #d04ba7, #6842b4)", 
                glassBorder: "rgba(255, 255, 255, 0.2)"
            },
            blobsAtivos: false, // Desliga as luzes de fundo (blobs)
            
            // =====================================
            // IMAGENS CUSTOMIZADAS (Se deixar "", mantém o padrão)
            // =====================================
            novoAvatar: "/img/caio-gta.png",           // Seu avatar da Hero
            aboutPortrait: "/img/caio-gta-about.png",  // Sua foto da seção Sobre
            favicon: "/img/gta-favicon.png",           // Ícone da aba do navegador
            navbarLogo: "/img/cd-logo.png",       // Imagem para substituir o "C ♠ D" na Navbar
            
            // Controle do Nome "Caio Leal" na Hero Section
            estiloNome: {
                ativo: true,
                tipo: "fonte", // "imagem" ou "fonte"
                valor: "'Pricedown', sans-serif" 
            }
        }
        // Você pode criar outros temas aqui!
    };

    // =======================================================
    // 2. LÓGICA DE DATAS
    // =======================================================
    const hoje = new Date();
    const mesAtual = hoje.getMonth() + 1; 
    const diaAtual = hoje.getDate();

    let temaAtual = null;

    for (const [nome, config] of Object.entries(temas)) {
        if (!config.ativo) continue;

        let taNoPeriodo = false;
        if (config.inicio.mes > config.fim.mes) {
            taNoPeriodo = (mesAtual === config.inicio.mes && diaAtual >= config.inicio.dia) || 
                          (mesAtual === config.fim.mes && diaAtual <= config.fim.dia);
        } else {
            const depoisDoInicio = (mesAtual > config.inicio.mes) || (mesAtual === config.inicio.mes && diaAtual >= config.inicio.dia);
            const antesDoFim = (mesAtual < config.fim.mes) || (mesAtual === config.fim.mes && diaAtual <= config.fim.dia);
            taNoPeriodo = depoisDoInicio && antesDoFim;
        }

        if (taNoPeriodo) {
            temaAtual = config;
            break; 
        }
    }

    if (!temaAtual) return;

    // =======================================================
    // 3. APLICANDO O NOVO TEMA
    // =======================================================

    // 3.1. Troca o Background e as Variáveis do CSS Global
    const root = document.documentElement;
    if (temaAtual.cores.fundo) document.body.style.background = temaAtual.cores.fundo;
    if (temaAtual.cores.accent) root.style.setProperty('--accent', temaAtual.cores.accent);
    if (temaAtual.cores.glassColor) root.style.setProperty('--glass-color', temaAtual.cores.glassColor);
    if (temaAtual.cores.neonPink) root.style.setProperty('--neon-pink', temaAtual.cores.neonPink);
    if (temaAtual.cores.pillBg) root.style.setProperty('--pill-bg', temaAtual.cores.pillBg);
    if (temaAtual.cores.glassBorder) root.style.setProperty('--glass-border', temaAtual.cores.glassBorder);

    // 3.2. Liga ou desliga os Blobs (Luzes de fundo)
    if (!temaAtual.blobsAtivos) {
        document.querySelectorAll('.blob').forEach(blob => blob.style.display = 'none');
    }

    // 3.3. Troca o Avatar da Hero Section
    if (temaAtual.novoAvatar && temaAtual.novoAvatar !== "") {
        const avatarImg = document.querySelector(".avatar-img");
        if (avatarImg) avatarImg.src = temaAtual.novoAvatar;
    }

    // 3.4. Troca a Foto da Seção Sobre
    if (temaAtual.aboutPortrait && temaAtual.aboutPortrait !== "") {
        const aboutImg = document.querySelector(".about-hero-portrait img");
        if (aboutImg) aboutImg.src = temaAtual.aboutPortrait;
    }

    // 3.5. Troca o Favicon (Ícone da Aba do Navegador)
    if (temaAtual.favicon && temaAtual.favicon !== "") {
        let linkFavicon = document.querySelector("link[rel~='icon']");
        // Se não existir a tag link do favicon, ele cria uma
        if (!linkFavicon) {
            linkFavicon = document.createElement('link');
            linkFavicon.rel = 'icon';
            document.head.appendChild(linkFavicon);
        }
        linkFavicon.href = temaAtual.favicon;
    }

    // 3.6. Troca a Logo da Navbar de Texto para Imagem
    if (temaAtual.navbarLogo && temaAtual.navbarLogo !== "") {
        const logoBox = document.querySelector(".logo-box");
        if (logoBox) {
            // Limpa o texto "C ♠ D" e insere a imagem com tamanho fixo
            logoBox.innerHTML = `<img src="${temaAtual.navbarLogo}" alt="Logo Temática" style="height: 30px; width: auto; object-fit: contain;">`;
        }
    }

    // 3.7. Altera o "Caio Leal" 3D para Fonte Customizada ou Imagem
    if (temaAtual.estiloNome && temaAtual.estiloNome.ativo) {
        const nameContainer = document.getElementById("name-shader-container");
        
        if (nameContainer) {
            setTimeout(() => {
                nameContainer.innerHTML = ''; 

                if (temaAtual.estiloNome.tipo === "imagem") {
                    const img = document.createElement("img");
                    img.src = temaAtual.estiloNome.valor;
                    img.style.width = "100%";
                    img.style.height = "100%";
                    img.style.objectFit = "contain";
                    img.style.filter = "drop-shadow(0 10px 15px rgba(0,0,0,0.4))";
                    nameContainer.appendChild(img);
                } 
                else if (temaAtual.estiloNome.tipo === "fonte") {
                    const h1 = document.createElement("h1");
                    h1.innerText = "Caio Leal";
                    h1.style.fontFamily = temaAtual.estiloNome.valor;
                    h1.style.fontSize = "clamp(3.5rem, 6vw, 5rem)"; 
                    h1.style.color = "#ffffff";
                    h1.style.margin = "0";
                    h1.style.textShadow = "2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 0 5px 15px rgba(0,0,0,0.5)";
                    nameContainer.appendChild(h1);
                }
            }, 150); 
        }
    }
});