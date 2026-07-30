import gsap from 'gsap';

export function initI18n() {
    try {
        const langBtn = document.getElementById('currentLangBtn');
        const langDropdown = document.getElementById('langDropdown');
        const langOptions = document.querySelectorAll('.lang-option');

        if (!langBtn || !langDropdown) return;

        // 1. Dicionário de Traduções
        const translations = {
            "pt-BR": {
                "nav-home": "Início",
                "nav-about": "Sobre",
                "nav-projects": "Projetos",
                "nav-services": "Serviços",
                "nav-contact": "Contato",
                "nav-contact-btn": "Fale Comigo",

                "hero-greeting": "OLÁ, EU SOU",
                "hero-role": "Desenvolvedor Full Stack & Web",
                "hero-bio": "Com 3 anos de experiência, crio soluções web completas com foco na experiência do usuário. Especialista na concepção de interfaces responsivas e implementação de funcionalidades dinâmicas para resolver problemas reais.",
                "hero-projects-btn": "Ver projetos",
                "hero-contact-btn": "Entre em contato",

                "about-title": "Olá, eu sou",
                "about-bio": "Sou um profissional apaixonado por desenvolvimento de software e focado em criar soluções digitais completas. Do planejamento arquitetônico de sistemas backend robustos à lapidação de interfaces pixel-perfect no frontend, vivo na interseção onde o design inteligente encontra o código limpo.",
                "about-stack": "Front-end / Back-end / Design / Repetir",
                "about-highlight": "Transformando ideias complexas em aplicações reais e experiências de alto impacto.",

                "stats-title": "Trajetória",
                "stats-desc": "Um resumo da minha jornada na tecnologia até agora.",
                "stats-years": "Anos de Experiência",
                "stats-projects": "Projetos Autorais e Freelancers",
                "stats-fullstack": "Domínio de ponta a ponta",

                "education-title": "Minhas Formações",
                "education-subtitle": "Aprendizado contínuo e aprimoramento técnico.",
                "education-progress": "Progresso Geral",
                "education-course-progress": "Progresso do Curso",
                "education-current": "Em Andamento",
                "education-almost": "Quase lá",
                "education-completed": "Concluído",

                "agency-role": "Criador e Fundador",
                "agency-btn": "Visite aqui",

                "services-title": "Como posso contribuir?",
                "services-subtitle": "Minhas principais áreas de atuação.",

                "service1-title": "Frontend Development",
                "service1-desc": "Criação de interfaces imersivas, responsivas e de alta performance utilizando HTML, CSS, JavaScript, React e animações fluidas com GSAP.",

                "service2-title": "Backend Development",
                "service2-desc": "Desenvolvimento de APIs seguras e escaláveis, arquitetura de banco de dados e lógica de servidores utilizando Python, Java e PHP.",

                "service3-title": "UI/UX Design",
                "service3-desc": "Prototipação de interfaces focadas na experiência do usuário, aliando estética e usabilidade para reter a atenção do cliente final.",

                "service4-title": "Web Applications",
                "service4-desc": "Soluções Full Stack de ponta a ponta. Da concepção do banco de dados até o deploy na nuvem da sua aplicação web completa.",

                "contact-small": "Vamos construir algo incrível juntos.",
                "contact-large": "Entre em contato",

                "projects-title": "Projetos Recentes",
                "projects-subtitle": "Um pouco do meu portfólio e trabalhos anteriores.",

                "project1-category": "Sistema web",
                "project1-desc": "Plataforma de análise esportiva com cadastro, edição e gerenciamento de atletas integrada ao Supabase.",

                "project2-category": "Landing Page",
                "project2-desc": "Landing page inspirada na Apple com animações fluidas, troca dinâmica de cores e experiência visual premium desenvolvida em React.",

                "project3-category": "Landing Page Premium",
                "project3-desc": "Landing page inspirada na Porsche com animações cinematográficas, navegação imersiva e experiência visual de alto padrão.",

                "project4-category": "Interativo",
                "project4-desc": "Experiência digital interativa com sistema de pacotinhos de figurinhas e animações WebGL.",

                "footer-home": "Home",
                "footer-about": "Sobre",
                "footer-education": "Formações",
                "footer-questions": "Dúvidas",
                "footer-services": "Serviços",
                "footer-contact": "Contato"
            },

            "en": {
                "nav-home": "Home",
                "nav-about": "About",
                "nav-projects": "Projects",
                "nav-services": "Services",
                "nav-contact": "Contact",
                "nav-contact-btn": "Contact Me",

                "hero-greeting": "HELLO, I AM",
                "hero-role": "Full Stack & Web Developer",
                "hero-bio": "With 3 years of experience, I create complete web solutions focused on user experience. Specialized in designing responsive interfaces and implementing dynamic features to solve real-world problems.",
                "hero-projects-btn": "View Projects",
                "hero-contact-btn": "Get in Touch",

                "about-title": "Hello, I am",
                "about-bio": "I am a professional passionate about software development and focused on creating complete digital solutions. From the architectural planning of robust backend systems to crafting pixel-perfect frontend interfaces, I live at the intersection where intelligent design meets clean code.",
                "about-stack": "Front-end / Back-end / Design / Repeat",
                "about-highlight": "Transforming complex ideas into real applications and high-impact experiences.",

                "stats-title": "Journey",
                "stats-desc": "A summary of my journey in technology so far.",
                "stats-years": "Years of Experience",
                "stats-projects": "Personal and Freelance Projects",
                "stats-fullstack": "End-to-end expertise",

                "education-title": "My Education",
                "education-subtitle": "Continuous learning and technical improvement.",
                "education-progress": "Overall Progress",
                "education-course-progress": "Course Progress",
                "education-current": "In Progress",
                "education-almost": "Almost There",
                "education-completed": "Completed",

                "agency-role": "Creator and Founder",
                "agency-btn": "Visit Here",

                "services-title": "How can I contribute?",
                "services-subtitle": "My main areas of expertise.",

                "service1-title": "Frontend Development",
                "service1-desc": "Creation of immersive, responsive, and high-performance interfaces using HTML, CSS, JavaScript, React, and smooth GSAP animations.",

                "service2-title": "Backend Development",
                "service2-desc": "Development of secure and scalable APIs, database architecture, and server logic using Python, Java, and PHP.",

                "service3-title": "UI/UX Design",
                "service3-desc": "Interface prototyping focused on user experience, combining aesthetics and usability to capture the attention of the end user.",

                "service4-title": "Web Applications",
                "service4-desc": "End-to-end Full Stack solutions. From database design to cloud deployment of your complete web application.",

                "contact-small": "Let's build something amazing together.",
                "contact-large": "Get in Touch",

                "projects-title": "Recent Projects",
                "projects-subtitle": "A glimpse of my portfolio and previous work.",

                "project1-category": "Web System",
                "project1-desc": "Sports analysis platform with athlete registration, editing, and management integrated with Supabase.",

                "project2-category": "Landing Page",
                "project2-desc": "Apple-inspired landing page with smooth animations, dynamic color changes, and a premium visual experience developed in React.",

                "project3-category": "Premium Landing Page",
                "project3-desc": "Porsche-inspired landing page with cinematic animations, immersive navigation, and a high-end visual experience.",

                "project4-category": "Interactive",
                "project4-desc": "Interactive digital experience with a sticker pack system and WebGL animations.",

                "footer-home": "Home",
                "footer-about": "About",
                "footer-education": "Education",
                "footer-questions": "Questions",
                "footer-services": "Services",
                "footer-contact": "Contact" },
            "es": {
                "nav-home": "Inicio",
                "nav-about": "Sobre mí",
                "nav-projects": "Proyectos",
                "nav-services": "Servicios",
                "nav-contact": "Contacto",
                "nav-contact-btn": "Contáctame",

                "hero-greeting": "HOLA, SOY",
                "hero-role": "Desarrollador Full Stack & Web",
                "hero-bio": "Con 3 años de experiencia, creo soluciones web completas enfocadas en la experiencia del usuario. Especializado en la creación de interfaces responsivas y la implementación de funcionalidades dinámicas para resolver problemas reales.",
                "hero-projects-btn": "Ver proyectos",
                "hero-contact-btn": "Ponerse en contacto",

                "about-title": "Hola, soy",
                "about-bio": "Soy un profesional apasionado por el desarrollo de software y enfocado en crear soluciones digitales completas. Desde la planificación arquitectónica de sistemas backend robustos hasta la creación de interfaces frontend pixel-perfect, vivo en la intersección donde el diseño inteligente se encuentra con el código limpio.",
                "about-stack": "Front-end / Back-end / Diseño / Repetir",
                "about-highlight": "Transformando ideas complejas en aplicaciones reales y experiencias de alto impacto.",

                "stats-title": "Trayectoria",
                "stats-desc": "Un resumen de mi camino en la tecnología hasta ahora.",
                "stats-years": "Años de Experiencia",
                "stats-projects": "Proyectos Personales y Freelance",
                "stats-fullstack": "Dominio de principio a fin",

                "education-title": "Mi Formación",
                "education-subtitle": "Aprendizaje continuo y mejora técnica.",
                "education-progress": "Progreso General",
                "education-course-progress": "Progreso del Curso",
                "education-current": "En Curso",
                "education-almost": "Casi terminado",
                "education-completed": "Completado",

                "agency-role": "Creador y Fundador",
                "agency-btn": "Visitar aquí",

                "services-title": "¿Cómo puedo contribuir?",
                "services-subtitle": "Mis principales áreas de actuación.",

                "service1-title": "Desarrollo Frontend",
                "service1-desc": "Creación de interfaces inmersivas, responsivas y de alto rendimiento utilizando HTML, CSS, JavaScript, React y animaciones fluidas con GSAP.",

                "service2-title": "Desarrollo Backend",
                "service2-desc": "Desarrollo de APIs seguras y escalables, arquitectura de bases de datos y lógica de servidores utilizando Python, Java y PHP.",

                "service3-title": "Diseño UI/UX",
                "service3-desc": "Prototipado de interfaces centradas en la experiencia del usuario, combinando estética y usabilidad para captar la atención del cliente final.",

                "service4-title": "Aplicaciones Web",
                "service4-desc": "Soluciones Full Stack de principio a fin. Desde el diseño de la base de datos hasta el despliegue en la nube de tu aplicación web completa.",

                "contact-small": "Construyamos algo increíble juntos.",
                "contact-large": "Ponte en contacto",

                "projects-title": "Proyectos Recientes",
                "projects-subtitle": "Una muestra de mi portafolio y trabajos anteriores.",

                "project1-category": "Sistema web",
                "project1-desc": "Plataforma de análisis deportivo con registro, edición y gestión de atletas integrada con Supabase.",

                "project2-category": "Landing Page",
                "project2-desc": "Landing page inspirada en Apple con animaciones fluidas, cambio dinámico de colores y una experiencia visual premium desarrollada en React.",

                "project3-category": "Landing Page Premium",
                "project3-desc": "Landing page inspirada en Porsche con animaciones cinematográficas, navegación inmersiva y una experiencia visual de alto nivel.",

                "project4-category": "Interactivo",
                "project4-desc": "Experiencia digital interactiva con sistema de paquetes de cromos y animaciones WebGL.",

                "footer-home": "Inicio",
                "footer-about": "Sobre mí",
                "footer-education": "Formación",
                "footer-questions": "Preguntas",
                "footer-services": "Servicios",
                "footer-contact": "Contacto" },
            "fr": {
                "nav-home": "Accueil",
                "nav-about": "À propos",
                "nav-projects": "Projets",
                "nav-services": "Services",
                "nav-contact": "Contact",
                "nav-contact-btn": "Parlez-moi",

                "hero-greeting": "BONJOUR, JE SUIS",
                "hero-role": "Développeur Full Stack & Web",
                "hero-bio": "Avec 3 ans d'expérience, je crée des solutions web complètes axées sur l'expérience utilisateur. Spécialisé dans la conception d'interfaces responsives et la mise en œuvre de fonctionnalités dynamiques pour résoudre des problèmes réels.",
                "hero-projects-btn": "Voir les projets",
                "hero-contact-btn": "Me contacter",

                "about-title": "Bonjour, je suis",
                "about-bio": "Je suis un professionnel passionné par le développement logiciel et concentré sur la création de solutions numériques complètes. De la planification architecturale de systèmes backend robustes à la création d'interfaces frontend pixel-perfect, j'évolue à l'intersection où le design intelligent rencontre le code propre.",
                "about-stack": "Front-end / Back-end / Design / Répéter",
                "about-highlight": "Transformer des idées complexes en applications réelles et en expériences à fort impact.",

                "stats-title": "Parcours",
                "stats-desc": "Un résumé de mon parcours dans la technologie jusqu'à présent.",
                "stats-years": "Années d'expérience",
                "stats-projects": "Projets personnels et Freelance",
                "stats-fullstack": "Maîtrise de bout en bout",

                "education-title": "Mes Formations",
                "education-subtitle": "Apprentissage continu et perfectionnement technique.",
                "education-progress": "Progression générale",
                "education-course-progress": "Progression du cours",
                "education-current": "En cours",
                "education-almost": "Presque terminé",
                "education-completed": "Terminé",

                "agency-role": "Créateur et Fondateur",
                "agency-btn": "Visiter ici",

                "services-title": "Comment puis-je contribuer ?",
                "services-subtitle": "Mes principaux domaines d'expertise.",

                "service1-title": "Développement Frontend",
                "service1-desc": "Création d'interfaces immersives, responsives et performantes utilisant HTML, CSS, JavaScript, React et des animations fluides avec GSAP.",

                "service2-title": "Développement Backend",
                "service2-desc": "Développement d'API sécurisées et évolutives, architecture de bases de données et logique serveur utilisant Python, Java et PHP.",

                "service3-title": "Design UI/UX",
                "service3-desc": "Création de prototypes d'interfaces centrées sur l'expérience utilisateur, combinant esthétique et ergonomie pour retenir l'attention du client final.",

                "service4-title": "Applications Web",
                "service4-desc": "Solutions Full Stack de bout en bout. De la conception de la base de données jusqu'au déploiement cloud de votre application web complète.",

                "contact-small": "Construisons quelque chose d'incroyable ensemble.",
                "contact-large": "Contactez-moi",

                "projects-title": "Projets Récents",
                "projects-subtitle": "Un aperçu de mon portfolio et de mes travaux précédents.",

                "project1-category": "Système web",
                "project1-desc": "Plateforme d'analyse sportive avec inscription, édition et gestion des athlètes intégrée à Supabase.",

                "project2-category": "Landing Page",
                "project2-desc": "Landing page inspirée d'Apple avec des animations fluides, un changement dynamique des couleurs et une expérience visuelle premium développée avec React.",

                "project3-category": "Landing Page Premium",
                "project3-desc": "Landing page inspirée de Porsche avec des animations cinématographiques, une navigation immersive et une expérience visuelle haut de gamme.",

                "project4-category": "Interactif",
                "project4-desc": "Expérience numérique interactive avec un système de paquets d'autocollants et des animations WebGL.",

                "footer-home": "Accueil",
                "footer-about": "À propos",
                "footer-education": "Formations",
                "footer-questions": "Questions",
                "footer-services": "Services",
                "footer-contact": "Contact" },
            "it": {
                "nav-home": "Home",
                "nav-about": "Chi sono",
                "nav-projects": "Progetti",
                "nav-services": "Servizi",
                "nav-contact": "Contatti",
                "nav-contact-btn": "Parlami",

                "hero-greeting": "CIAO, SONO",
                "hero-role": "Sviluppatore Full Stack & Web",
                "hero-bio": "Con 3 anni di esperienza, creo soluzioni web complete con particolare attenzione all'esperienza utente. Specializzato nella progettazione di interfacce responsive e nell'implementazione di funzionalità dinamiche per risolvere problemi reali.",
                "hero-projects-btn": "Vedi progetti",
                "hero-contact-btn": "Contattami",

                "about-title": "Ciao, sono",
                "about-bio": "Sono un professionista appassionato di sviluppo software e focalizzato sulla creazione di soluzioni digitali complete. Dalla progettazione architetturale di sistemi backend robusti alla realizzazione di interfacce frontend pixel-perfect, vivo nel punto d'incontro tra design intelligente e codice pulito.",
                "about-stack": "Front-end / Back-end / Design / Ripetere",
                "about-highlight": "Trasformare idee complesse in applicazioni reali ed esperienze ad alto impatto.",

                "stats-title": "Percorso",
                "stats-desc": "Un riepilogo del mio percorso nel mondo della tecnologia fino ad oggi.",
                "stats-years": "Anni di esperienza",
                "stats-projects": "Progetti personali e Freelance",
                "stats-fullstack": "Competenza completa end-to-end",

                "education-title": "La mia formazione",
                "education-subtitle": "Apprendimento continuo e miglioramento tecnico.",
                "education-progress": "Progresso generale",
                "education-course-progress": "Progresso del corso",
                "education-current": "In corso",
                "education-almost": "Quasi terminato",
                "education-completed": "Completato",

                "agency-role": "Creatore e Fondatore",
                "agency-btn": "Visita qui",

                "services-title": "Come posso contribuire?",
                "services-subtitle": "Le mie principali aree di competenza.",

                "service1-title": "Sviluppo Frontend",
                "service1-desc": "Creazione di interfacce immersive, responsive e ad alte prestazioni utilizzando HTML, CSS, JavaScript, React e animazioni fluide con GSAP.",

                "service2-title": "Sviluppo Backend",
                "service2-desc": "Sviluppo di API sicure e scalabili, architettura di database e logica server utilizzando Python, Java e PHP.",

                "service3-title": "Design UI/UX",
                "service3-desc": "Prototipazione di interfacce incentrate sull'esperienza utente, combinando estetica e usabilità per catturare l'attenzione del cliente finale.",

                "service4-title": "Applicazioni Web",
                "service4-desc": "Soluzioni Full Stack complete. Dalla progettazione del database fino al deployment cloud della tua applicazione web.",

                "contact-small": "Costruiamo insieme qualcosa di incredibile.",
                "contact-large": "Contattami",

                "projects-title": "Progetti Recenti",
                "projects-subtitle": "Una panoramica del mio portfolio e dei lavori precedenti.",

                "project1-category": "Sistema web",
                "project1-desc": "Piattaforma di analisi sportiva con registrazione, modifica e gestione degli atleti integrata con Supabase.",

                "project2-category": "Landing Page",
                "project2-desc": "Landing page ispirata ad Apple con animazioni fluide, cambio dinamico dei colori ed esperienza visiva premium sviluppata con React.",

                "project3-category": "Landing Page Premium",
                "project3-desc": "Landing page ispirata a Porsche con animazioni cinematografiche, navigazione immersiva ed esperienza visiva di alto livello.",

                "project4-category": "Interattivo",
                "project4-desc": "Esperienza digitale interattiva con sistema di pacchetti di figurine e animazioni WebGL.",

                "footer-home": "Home",
                "footer-about": "Chi sono",
                "footer-education": "Formazione",
                "footer-questions": "Domande",
                "footer-services": "Servizi",
                "footer-contact": "Contatti" },
            "de": {
                "nav-home": "Startseite",
                "nav-about": "Über mich",
                "nav-projects": "Projekte",
                "nav-services": "Dienstleistungen",
                "nav-contact": "Kontakt",
                "nav-contact-btn": "Kontakt aufnehmen",

                "hero-greeting": "HALLO, ICH BIN",
                "hero-role": "Full Stack & Web Entwickler",
                "hero-bio": "Mit 3 Jahren Erfahrung entwickle ich umfassende Weblösungen mit Fokus auf Benutzererfahrung. Spezialisiert auf die Erstellung responsiver Benutzeroberflächen und die Umsetzung dynamischer Funktionen zur Lösung realer Probleme.",
                "hero-projects-btn": "Projekte ansehen",
                "hero-contact-btn": "Kontakt aufnehmen",

                "about-title": "Hallo, ich bin",
                "about-bio": "Ich bin ein Softwareentwickler aus Leidenschaft und konzentriere mich darauf, vollständige digitale Lösungen zu entwickeln. Von der architektonischen Planung robuster Backend-Systeme bis zur Gestaltung pixelgenauer Frontend-Oberflächen bewege ich mich an der Schnittstelle zwischen intelligentem Design und sauberem Code.",
                "about-stack": "Front-end / Back-end / Design / Wiederholen",
                "about-highlight": "Komplexe Ideen in reale Anwendungen und wirkungsvolle Erfahrungen verwandeln.",

                "stats-title": "Werdegang",
                "stats-desc": "Eine Zusammenfassung meiner bisherigen Reise in der Technologie.",
                "stats-years": "Jahre Erfahrung",
                "stats-projects": "Eigene Projekte und Freelance-Arbeiten",
                "stats-fullstack": "Kompetenz von Anfang bis Ende",

                "education-title": "Meine Ausbildungen",
                "education-subtitle": "Kontinuierliches Lernen und technische Weiterentwicklung.",
                "education-progress": "Gesamtfortschritt",
                "education-course-progress": "Kursfortschritt",
                "education-current": "In Bearbeitung",
                "education-almost": "Fast abgeschlossen",
                "education-completed": "Abgeschlossen",

                "agency-role": "Gründer und Geschäftsführer",
                "agency-btn": "Hier besuchen",

                "services-title": "Wie kann ich beitragen?",
                "services-subtitle": "Meine wichtigsten Fachbereiche.",

                "service1-title": "Frontend-Entwicklung",
                "service1-desc": "Erstellung immersiver, responsiver und leistungsstarker Benutzeroberflächen mit HTML, CSS, JavaScript, React und flüssigen Animationen mit GSAP.",

                "service2-title": "Backend-Entwicklung",
                "service2-desc": "Entwicklung sicherer und skalierbarer APIs, Datenbankarchitektur und Serverlogik mit Python, Java und PHP.",

                "service3-title": "UI/UX Design",
                "service3-desc": "Prototyping von Benutzeroberflächen mit Fokus auf die Nutzererfahrung, wobei Ästhetik und Benutzerfreundlichkeit kombiniert werden, um die Aufmerksamkeit des Endkunden zu gewinnen.",

                "service4-title": "Webanwendungen",
                "service4-desc": "Vollständige Full-Stack-Lösungen. Von der Datenbankkonzeption bis zum Cloud-Deployment Ihrer kompletten Webanwendung.",

                "contact-small": "Lassen Sie uns gemeinsam etwas Unglaubliches schaffen.",
                "contact-large": "Kontakt aufnehmen",

                "projects-title": "Aktuelle Projekte",
                "projects-subtitle": "Ein Einblick in mein Portfolio und meine bisherigen Arbeiten.",

                "project1-category": "Websystem",
                "project1-desc": "Sportanalyse-Plattform mit Registrierung, Bearbeitung und Verwaltung von Athleten, integriert mit Supabase.",

                "project2-category": "Landing Page",
                "project2-desc": "Von Apple inspirierte Landing Page mit flüssigen Animationen, dynamischem Farbwechsel und einer hochwertigen visuellen Erfahrung, entwickelt mit React.",

                "project3-category": "Premium Landing Page",
                "project3-desc": "Von Porsche inspirierte Landing Page mit filmischen Animationen, immersiver Navigation und einer hochwertigen visuellen Erfahrung.",

                "project4-category": "Interaktiv",
                "project4-desc": "Interaktive digitale Erfahrung mit einem Sticker-Paket-System und WebGL-Animationen.",

                "footer-home": "Startseite",
                "footer-about": "Über mich",
                "footer-education": "Ausbildung",
                "footer-questions": "Fragen",
                "footer-services": "Dienstleistungen",
                "footer-contact": "Kontakt" },
            "pl": {
                "nav-home": "Strona główna",
                "nav-about": "O mnie",
                "nav-projects": "Projekty",
                "nav-services": "Usługi",
                "nav-contact": "Kontakt",
                "nav-contact-btn": "Skontaktuj się ze mną",

                "hero-greeting": "CZEŚĆ, JESTEM",
                "hero-role": "Programista Full Stack & Web",
                "hero-bio": "Mam 3 lata doświadczenia i tworzę kompleksowe rozwiązania webowe skupione na doświadczeniu użytkownika. Specjalizuję się w projektowaniu responsywnych interfejsów oraz wdrażaniu dynamicznych funkcjonalności do rozwiązywania rzeczywistych problemów.",
                "hero-projects-btn": "Zobacz projekty",
                "hero-contact-btn": "Skontaktuj się",

                "about-title": "Cześć, jestem",
                "about-bio": "Jestem profesjonalistą z pasją do tworzenia oprogramowania, skupionym na budowaniu kompletnych rozwiązań cyfrowych. Od projektowania architektury solidnych systemów backendowych po dopracowane interfejsy frontendowe pixel-perfect, działam na styku inteligentnego designu i czystego kodu.",
                "about-stack": "Front-end / Back-end / Design / Powtórz",
                "about-highlight": "Przekształcanie złożonych pomysłów w rzeczywiste aplikacje i doświadczenia o dużym wpływie.",

                "stats-title": "Ścieżka kariery",
                "stats-desc": "Podsumowanie mojej dotychczasowej drogi w świecie technologii.",
                "stats-years": "Lata doświadczenia",
                "stats-projects": "Projekty własne i Freelance",
                "stats-fullstack": "Kompetencje od początku do końca",

                "education-title": "Moje wykształcenie",
                "education-subtitle": "Ciągła nauka i rozwój techniczny.",
                "education-progress": "Ogólny postęp",
                "education-course-progress": "Postęp kursu",
                "education-current": "W trakcie",
                "education-almost": "Prawie ukończone",
                "education-completed": "Ukończone",

                "agency-role": "Twórca i Założyciel",
                "agency-btn": "Odwiedź tutaj",

                "services-title": "Jak mogę pomóc?",
                "services-subtitle": "Moje główne obszary działania.",

                "service1-title": "Programowanie Frontend",
                "service1-desc": "Tworzenie immersyjnych, responsywnych i wydajnych interfejsów przy użyciu HTML, CSS, JavaScript, React oraz płynnych animacji GSAP.",

                "service2-title": "Programowanie Backend",
                "service2-desc": "Tworzenie bezpiecznych i skalowalnych API, architektura baz danych oraz logika serwerowa z wykorzystaniem Python, Java i PHP.",

                "service3-title": "Projektowanie UI/UX",
                "service3-desc": "Projektowanie prototypów interfejsów skupionych na doświadczeniu użytkownika, łączących estetykę i użyteczność w celu przyciągnięcia uwagi klienta końcowego.",

                "service4-title": "Aplikacje Webowe",
                "service4-desc": "Kompletne rozwiązania Full Stack. Od projektowania bazy danych po wdrożenie w chmurze pełnej aplikacji internetowej.",

                "contact-small": "Stwórzmy razem coś niesamowitego.",
                "contact-large": "Skontaktuj się ze mną",

                "projects-title": "Najnowsze Projekty",
                "projects-subtitle": "Część mojego portfolio i wcześniejszych realizacji.",

                "project1-category": "System webowy",
                "project1-desc": "Platforma analizy sportowej z rejestracją, edycją i zarządzaniem zawodnikami zintegrowana z Supabase.",

                "project2-category": "Landing Page",
                "project2-desc": "Landing page inspirowany Apple z płynnymi animacjami, dynamiczną zmianą kolorów i wysokiej jakości doświadczeniem wizualnym stworzonym w React.",

                "project3-category": "Premium Landing Page",
                "project3-desc": "Landing page inspirowany Porsche z kinowymi animacjami, immersyjną nawigacją i doświadczeniem wizualnym najwyższej jakości.",

                "project4-category": "Interaktywny",
                "project4-desc": "Interaktywne doświadczenie cyfrowe z systemem paczek naklejek i animacjami WebGL.",

                "footer-home": "Strona główna",
                "footer-about": "O mnie",
                "footer-education": "Wykształcenie",
                "footer-questions": "Pytania",
                "footer-services": "Usługi",
                "footer-contact": "Kontakt" },
            "ja": {
                "nav-home": "ホーム",
                "nav-about": "私について",
                "nav-projects": "プロジェクト",
                "nav-services": "サービス",
                "nav-contact": "お問い合わせ",
                "nav-contact-btn": "連絡する",

                "hero-greeting": "こんにちは、私は",
                "hero-role": "フルスタック & Web 開発者",
                "hero-bio": "3年間の経験を活かし、ユーザー体験を重視した総合的なWebソリューションを開発しています。レスポンシブなインターフェース設計と、現実の問題を解決するための動的な機能実装を専門としています。",
                "hero-projects-btn": "プロジェクトを見る",
                "hero-contact-btn": "お問い合わせ",

                "about-title": "こんにちは、私は",
                "about-bio": "私はソフトウェア開発に情熱を持つプロフェッショナルで、完全なデジタルソリューションの創造に取り組んでいます。堅牢なバックエンドシステムの設計から、ピクセル単位で洗練されたフロントエンドインターフェースの制作まで、スマートなデザインとクリーンなコードが交わる領域で活動しています。",
                "about-stack": "フロントエンド / バックエンド / デザイン / 繰り返す",
                "about-highlight": "複雑なアイデアを現実のアプリケーションと高い価値を持つ体験へ変換します。",

                "stats-title": "キャリア",
                "stats-desc": "これまでのテクノロジー分野での歩みの概要です。",
                "stats-years": "経験年数",
                "stats-projects": "個人プロジェクトとフリーランス",
                "stats-fullstack": "エンドツーエンドの開発能力",

                "education-title": "学歴・研修",
                "education-subtitle": "継続的な学習と技術向上。",
                "education-progress": "全体の進捗",
                "education-course-progress": "コースの進捗",
                "education-current": "進行中",
                "education-almost": "まもなく完了",
                "education-completed": "完了",

                "agency-role": "クリエイター & 創設者",
                "agency-btn": "こちらを見る",

                "services-title": "どのように貢献できますか？",
                "services-subtitle": "私の主な専門分野です。",

                "service1-title": "フロントエンド開発",
                "service1-desc": "HTML、CSS、JavaScript、React、GSAPによる滑らかなアニメーションを使用して、没入感のあるレスポンシブで高性能なインターフェースを制作します。",

                "service2-title": "バックエンド開発",
                "service2-desc": "Python、Java、PHPを使用した安全で拡張可能なAPI開発、データベース設計、サーバーロジックの構築を行います。",

                "service3-title": "UI/UX デザイン",
                "service3-desc": "ユーザー体験を重視したインターフェースのプロトタイプを作成し、美しさと使いやすさを組み合わせて最終ユーザーの関心を引きます。",

                "service4-title": "Webアプリケーション",
                "service4-desc": "完全なフルスタックソリューション。データベース設計からWebアプリケーションのクラウドデプロイまで対応します。",

                "contact-small": "一緒に素晴らしいものを作りましょう。",
                "contact-large": "お問い合わせ",

                "projects-title": "最近のプロジェクト",
                "projects-subtitle": "私のポートフォリオと過去の制作実績の一部をご紹介します。",

                "project1-category": "Webシステム",
                "project1-desc": "Supabaseと統合された、選手登録・編集・管理機能を備えたスポーツ分析プラットフォーム。",

                "project2-category": "ランディングページ",
                "project2-desc": "Appleからインスピレーションを受けたランディングページ。Reactで開発され、滑らかなアニメーション、動的なカラー変更、高品質なビジュアル体験を提供します。",

                "project3-category": "プレミアムランディングページ",
                "project3-desc": "Porscheからインスピレーションを受けたランディングページ。映画のようなアニメーション、没入型ナビゲーション、高品質なビジュアル体験を実現しています。",

                "project4-category": "インタラクティブ",
                "project4-desc": "ステッカーパックシステムとWebGLアニメーションを備えたインタラクティブなデジタル体験。",

                "footer-home": "ホーム",
                "footer-about": "私について",
                "footer-education": "学歴",
                "footer-questions": "質問",
                "footer-services": "サービス",
                "footer-contact": "お問い合わせ" }
        };

        // 2. Abrir/Fechar Dropdown
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            langDropdown.classList.toggle('show');
        });

        document.addEventListener('click', () => {
            langDropdown.classList.remove('show');
        });

        // 3. Efeito de Troca de Texto
        function changeLanguage(lang) {
            const elements = document.querySelectorAll('[data-i18n]');
            
            gsap.to(elements, {
                y: -10, opacity: 0, duration: 0.2, stagger: 0.01, ease: "power2.in",
                onComplete: () => {
                    elements.forEach(el => {
                        const key = el.getAttribute('data-i18n');
                        if(translations[lang] && translations[lang][key]) {
                            // Troca o texto visível
                            el.innerHTML = translations[lang][key];
                            
                            // MÁGICA AQUI: Se a tag tiver a máquina de escrever (data-text), traduz ela também!
                            if (el.hasAttribute('data-text')) {
                                el.setAttribute('data-text', translations[lang][key]);
                            }
                        }
                    });
                    gsap.fromTo(elements, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, stagger: 0.01, ease: "power2.out" });
                }
            });
        }

        // 4. Função para atualizar o botão com Imagem ou Globo (Fallback)
        function updateBtnUI(lang) {
            let imgCode = lang.toLowerCase();
            if(imgCode === 'ja') imgCode = 'jp'; 
            
            // Aqui é a mágica: Busca a imagem (ex: pt-br.jpg). Se der erro, mostra o fa-globe!
            langBtn.innerHTML = `
                <img src="/img/flags/${imgCode}.jpg" alt="${lang}" class="flag-icon" onerror="this.style.display='none'; document.getElementById('fallback-globe').style.display='inline-block';"> 
                <i id="fallback-globe" class="fa-solid fa-globe" style="display: none; margin-right: 5px;"></i>
                <span style="font-weight: 800; margin-right: 2px; text-transform: uppercase;">${lang.split('-')[0]}</span> 
                <i class="fa-solid fa-chevron-down" style="font-size: 0.7em;"></i>
            `;
        }

        // 5. Clicando nas opções
        langOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                const selectedLang = e.currentTarget.getAttribute('data-lang');
                updateBtnUI(selectedLang);
                changeLanguage(selectedLang);
            });
        });

        // 6. Autodetectar
        function detectUserLanguage() {
            const fullBrowserLang = navigator.language; 
            const shortBrowserLang = fullBrowserLang.slice(0, 2).toLowerCase(); 
            const supportedLangs = Object.keys(translations);
            
            let initialLang = 'en'; 
            
            if (supportedLangs.includes(fullBrowserLang)) {
                initialLang = fullBrowserLang; 
            } else if (supportedLangs.includes(shortBrowserLang)) {
                initialLang = shortBrowserLang; 
            } else if (shortBrowserLang === 'pt') {
                initialLang = 'pt-BR'; 
            }

            updateBtnUI(initialLang);
            changeLanguage(initialLang);
        }

        detectUserLanguage();
        
    } catch (error) {
        console.error("Erro na tradução: ", error);
    }
}