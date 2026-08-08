// ==========================================================================
// Mirza Alhaj Baig | AI/ML Portfolio — Premium UI/UX Motion & Logic System
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------------------------
    // 1. LENIS GLOBAL SMOOTH SCROLL INTEGRATION
    // ----------------------------------------------------------------------
    let lenis = null;
    if (typeof Lenis !== 'undefined') {
        lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            touchMultiplier: 1.5,
            wheelMultiplier: 1.0
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // GSAP ScrollTrigger Integration
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
            lenis.on('scroll', ScrollTrigger.update);
            gsap.ticker.add((time) => {
                lenis.raf(time * 1000);
            });
            gsap.ticker.lagSmoothing(0);
        }

        // Handle Anchor Links with Lenis
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const targetId = anchor.getAttribute('href');
                if (targetId && targetId !== '#') {
                    const targetEl = document.querySelector(targetId);
                    if (targetEl) {
                        e.preventDefault();
                        lenis.scrollTo(targetEl, { offset: -60, duration: 1.2 });
                    }
                }
            });
        });
    }

    // ----------------------------------------------------------------------
    // MOBILE NAVIGATION DRAWER TOGGLE SYSTEM
    // ----------------------------------------------------------------------
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('nav-drawer-open');
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('nav-drawer-open');
            });
        });
    }

    // ----------------------------------------------------------------------
    // GLOBAL SCROLL PROGRESS & ACTIVE SECTION INDEX OBSERVER
    // ----------------------------------------------------------------------
    const scrollProgressLine = document.getElementById('scroll-progress-line');
    const secNumEl = document.getElementById('current-section-num');
    const secLabelEl = document.getElementById('current-section-label');

    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
        if (scrollProgressLine) {
            scrollProgressLine.style.height = `${Math.min(100, Math.max(0, progress))}%`;
        }
    }, { passive: true });

    const sectionMap = [
        { id: 'hero', num: '01', label: 'HOME' },
        { id: 'about', num: '02', label: 'ABOUT' },
        { id: 'experience', num: '03', label: 'EXPERIENCE' },
        { id: 'skills', num: '04', label: 'SKILLS' },
        { id: 'projects', num: '05', label: 'PROJECTS' },
        { id: 'opportunities', num: '06', label: 'PORTAL' },
        { id: 'achievements', num: '07', label: 'ACHIEVEMENTS' },
        { id: 'certifications', num: '08', label: 'CREDENTIALS' },
        { id: 'contact', num: '09', label: 'CONTACT' }
    ];

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const match = sectionMap.find(s => s.id === entry.target.id);
                if (match) {
                    if (secNumEl) secNumEl.textContent = match.num;
                    if (secLabelEl) secLabelEl.textContent = match.label;
                }
            }
        });
    }, { threshold: 0.3 });

    sectionMap.forEach(s => {
        const el = document.getElementById(s.id);
        if (el) sectionObserver.observe(el);
    });

    // ----------------------------------------------------------------------
    // ULTRA-SUBTLE POINTER REACTIVITY FOR AMBIENT ATMOSPHERE
    // ----------------------------------------------------------------------
    const ambLayer1 = document.getElementById('ambient-layer-1');
    const ambLayer2 = document.getElementById('ambient-layer-2');

    if (ambLayer1 && ambLayer2 && window.innerWidth > 768) {
        let mouseX = 0, mouseY = 0;
        let targetX = 0, targetY = 0;

        window.addEventListener('mousemove', (e) => {
            targetX = (e.clientX / window.innerWidth - 0.5) * 14;
            targetY = (e.clientY / window.innerHeight - 0.5) * 14;
        }, { passive: true });

        function updateAmbientShift() {
            mouseX += (targetX - mouseX) * 0.04;
            mouseY += (targetY - mouseY) * 0.04;

            if (ambLayer1) ambLayer1.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
            if (ambLayer2) ambLayer2.style.transform = `translate3d(${-mouseX * 0.7}px, ${-mouseY * 0.7}px, 0)`;

            requestAnimationFrame(updateAmbientShift);
        }
        requestAnimationFrame(updateAmbientShift);
    }

    // ----------------------------------------------------------------------
    // HOMEPAGE OPENING — 3.5s CINEMATIC ORCHESTRATED ENTRANCE SYSTEM
    // ----------------------------------------------------------------------
    function initHeroCinematicEntrance() {
        const header = document.getElementById('main-header');
        const eyebrow = document.querySelector('.hero-eyebrow');
        const displayTitle = document.querySelector('.hero-display-title');
        const statement = document.querySelector('.hero-statement');
        const portraitCard = document.querySelector('.editorial-portrait-card');
        const ctaGroup = document.querySelector('.hero-cta-group');
        const primaryCta = document.querySelector('.hero-btn-primary');
        const scrollIndicator = document.getElementById('hero-scroll-indicator');

        // Check if reduced motion is requested
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            if (header) header.classList.add('revealed');
            if (eyebrow) eyebrow.classList.add('revealed');
            if (displayTitle) displayTitle.classList.add('revealed');
            if (statement) statement.classList.add('revealed');
            if (portraitCard) portraitCard.classList.add('revealed');
            if (ctaGroup) ctaGroup.classList.add('revealed');
            if (scrollIndicator) scrollIndicator.classList.add('revealed');
            return;
        }

        // Apply init classes
        if (header) header.classList.add('header-cinematic-init');
        if (eyebrow) eyebrow.classList.add('cinematic-init');
        if (displayTitle) displayTitle.classList.add('cinematic-init');
        if (statement) statement.classList.add('cinematic-init');
        if (portraitCard) portraitCard.classList.add('cinematic-init');
        if (ctaGroup) ctaGroup.classList.add('cinematic-init');
        if (scrollIndicator) scrollIndicator.classList.add('cinematic-init');

        // Orchestrated Timeline Steps
        // 0.6s — Navbar Slide Down
        setTimeout(() => {
            if (header) header.classList.add('revealed');
        }, 600);

        // 0.9s — Role Eyebrow Reveal
        setTimeout(() => {
            if (eyebrow) eyebrow.classList.add('revealed');
        }, 900);

        // 1.2s — Display Name Vertical Unveil
        setTimeout(() => {
            if (displayTitle) displayTitle.classList.add('revealed');
        }, 1200);

        // 1.8s — Main Statement Reveal
        setTimeout(() => {
            if (statement) statement.classList.add('revealed');
        }, 1800);

        // 2.2s — Portrait Photography Unveil
        setTimeout(() => {
            if (portraitCard) portraitCard.classList.add('revealed');
        }, 2200);

        // 2.5s — Dual CTA Entrance & Primary Arrow Nudge
        setTimeout(() => {
            if (ctaGroup) ctaGroup.classList.add('revealed');
            if (primaryCta) {
                setTimeout(() => {
                    primaryCta.classList.add('arrow-nudge');
                }, 400);
            }
        }, 2500);

        // 2.8s — Scroll Explore Line Extension
        setTimeout(() => {
            if (scrollIndicator) scrollIndicator.classList.add('revealed');
        }, 2800);
    }

    initHeroCinematicEntrance();

    // ----------------------------------------------------------------------
    // 3. THREE.JS 3D INTERACTIVE HERO BACKGROUND SYSTEM
    // ----------------------------------------------------------------------
    const canvas = document.getElementById('neural-canvas');
    if (canvas && typeof THREE !== 'undefined') {
        const isMobile = window.innerWidth < 768;
        const particleCount = isMobile ? 220 : 550;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 18;

        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance'
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Create 3D Particle Cloud & Connecting Geometry
        const particlesGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const scales = new Float32Array(particleCount);

        const colorIndigo = new THREE.Color(0x7c7cff);
        const colorWhite = new THREE.Color(0xffffff);

        for (let i = 0; i < particleCount; i++) {
            // Sphere distribution
            const u = Math.random();
            const v = Math.random();
            const theta = u * 2.0 * Math.PI;
            const phi = Math.acos(2.0 * v - 1.0);
            const r = 8.5 + Math.random() * 7.5;

            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            const mixedColor = colorIndigo.clone().lerp(colorWhite, Math.random() * 0.4);
            colors[i * 3] = mixedColor.r;
            colors[i * 3 + 1] = mixedColor.g;
            colors[i * 3 + 2] = mixedColor.b;

            scales[i] = Math.random() * 1.5 + 0.5;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        // Points Material
        const pMaterial = new THREE.PointsMaterial({
            size: 0.12,
            vertexColors: true,
            transparent: true,
            opacity: 0.35,
            blending: THREE.AdditiveBlending
        });

        const particleSystem = new THREE.Points(particlesGeometry, pMaterial);
        scene.add(particleSystem);

        // Subtly rotating mesh sphere core
        const sphereGeo = new THREE.IcosahedronGeometry(7, 2);
        const sphereMat = new THREE.MeshBasicMaterial({
            color: 0x8b5cf6,
            wireframe: true,
            transparent: true,
            opacity: 0.07,
            blending: THREE.AdditiveBlending
        });
        const sphereCore = new THREE.Mesh(sphereGeo, sphereMat);
        scene.add(sphereCore);

        // Interaction Mouse Coordinates
        let mouseX = 0;
        let mouseY = 0;
        let targetMouseX = 0;
        let targetMouseY = 0;

        document.addEventListener('mousemove', (e) => {
            targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        });

        // Resize Listener
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // 3D Render Loop
        let clock = new THREE.Clock();
        function animate3D() {
            requestAnimationFrame(animate3D);

            const elapsedTime = clock.getElapsedTime();

            // Smooth interpolation
            mouseX += (targetMouseX - mouseX) * 0.05;
            mouseY += (targetMouseY - mouseY) * 0.05;

            // Rotation
            particleSystem.rotation.y = elapsedTime * 0.04 + mouseX * 0.4;
            particleSystem.rotation.x = elapsedTime * 0.02 + mouseY * 0.3;

            sphereCore.rotation.y = -elapsedTime * 0.03 - mouseX * 0.2;
            sphereCore.rotation.x = -elapsedTime * 0.015;

            // Subtle vertical float
            particleSystem.position.y = Math.sin(elapsedTime * 0.5) * 0.4;

            renderer.render(scene, camera);
        }
        animate3D();
    }

    // Custom cursor removed for zero-latency system performance.

    // ----------------------------------------------------------------------
    // 5. PARALLAX DEPTH SYSTEM & 3D TILT WITH LIGHT FIELD
    // ----------------------------------------------------------------------
    const portraitCard = document.getElementById('portrait-card');
    const portraitGlow = document.getElementById('portrait-glow');
    const portraitFrame = document.getElementById('portrait-frame');
    const heroSection = document.getElementById('hero');
    const heroTextContent = document.querySelector('.hero-text-content');

    if (portraitCard && portraitFrame) {
        portraitCard.addEventListener('mousemove', (e) => {
            const rect = portraitCard.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            // Subtle 3D Tilt (Max 1.5deg)
            portraitFrame.style.transform = `rotateX(${-y * 3}deg) rotateY(${x * 3}deg) translateY(-4px)`;

            // Dynamic Light Field Cursor Response
            if (portraitGlow) {
                const glowX = 50 + x * 40;
                const glowY = 50 + y * 40;
                portraitGlow.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(139, 124, 255, 0.25) 0%, transparent 65%)`;
            }
        });

        portraitCard.addEventListener('mouseleave', () => {
            portraitFrame.style.transform = 'rotateX(0deg) rotateY(0deg) translateY(0px)';
            if (portraitGlow) {
                portraitGlow.style.background = `radial-gradient(circle at 50% 50%, rgba(139, 124, 255, 0.18) 0%, transparent 65%)`;
            }
        });
    }

    // Mouse Parallax across Hero Layers
    if (heroSection && window.innerWidth >= 1024) {
        let lerpX = 0, lerpY = 0, targetX = 0, targetY = 0;
        document.addEventListener('mousemove', (e) => {
            targetX = (e.clientX / window.innerWidth - 0.5) * 2;
            targetY = (e.clientY / window.innerHeight - 0.5) * 2;
        });

        function updateParallax() {
            lerpX += (targetX - lerpX) * 0.05;
            lerpY += (targetY - lerpY) * 0.05;

            if (heroTextContent) {
                heroTextContent.style.transform = `translate3d(${lerpX * 3}px, ${lerpY * 3}px, 0)`;
            }
            if (portraitCard) {
                portraitCard.style.transform = `translate3d(${lerpX * 8}px, ${lerpY * 8}px, 0)`;
            }
            requestAnimationFrame(updateParallax);
        }
        updateParallax();
    }

    // ----------------------------------------------------------------------
    // 6. MAGNETIC BUTTON HARDWARE ACCELERATION
    // ----------------------------------------------------------------------
    const magneticBtns = document.querySelectorAll('.btn-magnetic, .social-magnetic');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate3d(${x * 0.18}px, ${y * 0.18}px, 0)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate3d(0px, 0px, 0px)';
        });
    });

    // ----------------------------------------------------------------------
    // 7. NAVBAR SCROLL ELEVATION & SLIDING ACTIVE INDICATOR
    // ----------------------------------------------------------------------
    const mainHeader = document.getElementById('main-header');
    const navIndicator = document.getElementById('nav-active-indicator');
    const navLinks = document.querySelectorAll('.nav-menu .nav-link');

    function updateNavIndicator() {
        const activeLink = document.querySelector('.nav-menu .nav-link.active');
        if (activeLink && navIndicator) {
            const linkRect = activeLink.getBoundingClientRect();
            const menuRect = activeLink.parentElement.getBoundingClientRect();
            navIndicator.style.width = `${linkRect.width}px`;
            navIndicator.style.left = `${linkRect.left - menuRect.left}px`;
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            updateNavIndicator();
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            if (mainHeader) mainHeader.classList.add('scrolled');
        } else {
            if (mainHeader) mainHeader.classList.remove('scrolled');
        }
    });

    window.addEventListener('resize', updateNavIndicator);
    setTimeout(updateNavIndicator, 300);

    // ----------------------------------------------------------------------
    // 8. GSAP STAGGERED REVEALS & HERO SCROLL ANIMATION
    // ----------------------------------------------------------------------
    function initHeroAnimations() {
        if (typeof gsap === 'undefined') return;

        const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.0 } });

        tl.fromTo('.hero-signature-label .sig-line', { scaleX: 0 }, { scaleX: 1, duration: 0.8 })
          .fromTo('.hero-eyebrow', { opacity: 0, y: 15 }, { opacity: 1, y: 0 }, '-=0.4')
          .fromTo('.hero-display-title .text-first', { opacity: 0, y: 35, filter: 'blur(8px)' }, { opacity: 1, y: 0, filter: 'blur(0px)' }, '-=0.5')
          .fromTo('.hero-display-title .text-last', { opacity: 0, y: 35, filter: 'blur(8px)' }, { opacity: 1, y: 0, filter: 'blur(0px)' }, '-=0.6')
          .fromTo('.hero-statement', { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, '-=0.5')
          .fromTo('.hero-btn', { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.1 }, '-=0.4')
          .fromTo('.hero-social-link', { opacity: 0, y: 10 }, { opacity: 1, y: 0, stagger: 0.08 }, '-=0.3')
          .fromTo('.editorial-portrait-card', { opacity: 0, y: 30, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 1.2 }, '-=0.9');

        // ScrollTrigger Hero Exit Transformation
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.to('#hero', {
                opacity: 0.25,
                y: -40,
                scrollTrigger: {
                    trigger: '#hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            });
        }

        // ScrollTrigger for Section Headers & Cards
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.utils.toArray('.section-header').forEach(header => {
                gsap.fromTo(header, 
                    { opacity: 0, y: 40 }, 
                    { 
                        opacity: 1, 
                        y: 0, 
                        duration: 1, 
                        scrollTrigger: {
                            trigger: header,
                            start: 'top 85%',
                            toggleActions: 'play none none none'
                        } 
                    }
                );
            });

            gsap.utils.toArray('.project-card').forEach((card, index) => {
                gsap.fromTo(card, 
                    { opacity: 0, y: 50 }, 
                    { 
                        opacity: 1, 
                        y: 0, 
                        duration: 0.8, 
                        delay: index * 0.1,
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 88%',
                            toggleActions: 'play none none none'
                        } 
                    }
                );
            });

            gsap.utils.toArray('.skill-node-card').forEach((card, index) => {
                gsap.fromTo(card, 
                    { opacity: 0, y: 35 }, 
                    { 
                        opacity: 1, 
                        y: 0, 
                        duration: 0.7, 
                        delay: (index % 3) * 0.1,
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 90%',
                            toggleActions: 'play none none none'
                        } 
                    }
                );
            });

        }
    }

    // ----------------------------------------------------------------------
    // 7. TYPEWRITER ROLE EFFECT
    // ----------------------------------------------------------------------
    const typewriterTarget = document.getElementById('typewriter-target');
    if (typewriterTarget) {
        const roles = [
            "an AI/ML Engineer",
            "an ML Researcher",
            "an Open Source Contributor",
            "an AI Enthusiast",
            "a B.Tech CSE Student"
        ];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeDelay = 100;

        function handleTypewriter() {
            const currentRole = roles[roleIndex];

            if (isDeleting) {
                typewriterTarget.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typeDelay = 45;
            } else {
                typewriterTarget.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typeDelay = 110;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                typeDelay = 1600;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typeDelay = 350;
            }

            setTimeout(handleTypewriter, typeDelay);
        }
        setTimeout(handleTypewriter, 1000);
    }

    // ----------------------------------------------------------------------
    // 8. NAVBAR SCROLL & ACTIVE LINK HIGHLIGHTING
    // ----------------------------------------------------------------------
    const header = document.querySelector('.header');
    const sections = document.querySelectorAll('section');
    const allNavLinks = document.querySelectorAll('.nav-link');
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            if (header) header.classList.add('scrolled');
        } else {
            if (header) header.classList.remove('scrolled');
        }

        if (backToTop) {
            if (window.scrollY > 500) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        }

        let currentSectionId = '';
        sections.forEach(sec => {
            const secTop = sec.offsetTop - 120;
            const secHeight = sec.clientHeight;
            if (window.scrollY >= secTop && window.scrollY < secTop + secHeight) {
                currentSectionId = sec.getAttribute('id');
            }
        });

        allNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });

        if (typeof updateNavIndicator === 'function') {
            updateNavIndicator();
        }
    });

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            if (lenis) {
                lenis.scrollTo(0, { duration: 1.2 });
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }



    // ----------------------------------------------------------------------
    // 9. INTERACTIVE EXPERIENCE CONSOLE CONTROLLER
    // ----------------------------------------------------------------------
    const consoleTabs = document.querySelectorAll('.console-tab-item');
    const expViewport = document.getElementById('exp-viewport');
    const terminalStatus = document.getElementById('terminal-status');

    const experienceData = {
        cognifyz: {
            title: "Machine Learning Intern",
            company: "Cognifyz Technologies",
            duration: "Dec 2025 - Present",
            status: "// SYSTEM: CONNECTED TO COGNIFYZ.ML",
            bullets: [
                "Design and deploy machine learning models using Scikit-Learn and TensorFlow to solve real-world predictive analysis tasks.",
                "Perform extensive data preprocessing, exploratory data analysis (EDA), feature engineering, and dimensional reduction pipelines.",
                "Optimize model hyperparameters and construct validation frameworks, enhancing accuracy rates and generalizability.",
                "Collaborate on integrating model outputs with responsive application interfaces, documenting the analytical steps clearly."
            ],
            stack: ["Python", "Scikit-Learn", "TensorFlow", "Jupyter"]
        },
        qskill: {
            title: "AI/ML Engineer Intern",
            company: "QSkill",
            duration: "Aug 2025 - Nov 2025",
            status: "// SYSTEM: CONNECTED TO QSKILL.NETWORK",
            bullets: [
                "Researched and integrated AI solutions, building practical models and LLM wrappers to improve customized client workflows.",
                "Developed NLP pipelines for text classification, sentiment extraction, and intelligent career skill matching.",
                "Implemented vector-search and vector embedding databases, lowering latency for semantic match queries.",
                "Participated in daily technical sprints, contributing clean, modular Python packages to the code repositories."
            ],
            stack: ["Python", "NLP", "Large Language Models", "Vector DBs", "Docker"]
        }
    };

    consoleTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const expKey = tab.getAttribute('data-exp');
            const data = experienceData[expKey];
            if (!data || !expViewport) return;

            consoleTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            expViewport.style.opacity = '0';
            expViewport.style.transform = 'translateY(10px)';

            setTimeout(() => {
                if (terminalStatus) terminalStatus.textContent = data.status;

                let bulletHtml = '';
                data.bullets.forEach(bullet => {
                    const isCheck = bullet.includes("predictive") || bullet.includes("validation") || bullet.includes("LLM") || bullet.includes("latency");
                    const prefix = isCheck ? '[✓]' : '[⚡]';
                    bulletHtml += `<li><span class="bullet-glow">${prefix}</span> ${bullet}</li>`;
                });

                let stackHtml = '';
                data.stack.forEach(tech => {
                    stackHtml += `<span class="badge-tag">${tech}</span>`;
                });

                expViewport.innerHTML = `
                    <div class="exp-meta-header">
                        <div class="role-company-wrapper">
                            <h3>${data.title}</h3>
                            <a href="#" class="company-link-glow">${data.company} <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
                        </div>
                        <span class="exp-duration"><i class="fa-regular fa-calendar"></i> ${data.duration}</span>
                    </div>

                    <div class="exp-details-panel">
                        <ul class="exp-bullet-list">
                            ${bulletHtml}
                        </ul>
                    </div>

                    <div class="console-footer-stack">
                        <span class="stack-label">STACK_USED_BY_SYSTEM:</span>
                        <div class="stack-badges">
                            ${stackHtml}
                        </div>
                    </div>
                `;

                expViewport.style.opacity = '1';
                expViewport.style.transform = 'translateY(0)';
            }, 250);
        });
    });

    // ----------------------------------------------------------------------
    // 10. TECHNICAL SKILLS CATEGORY FILTER
    // ----------------------------------------------------------------------
    const filterButtons = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-node-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterValue = btn.getAttribute('data-filter');

            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            skillCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });

    // ----------------------------------------------------------------------
    // 11. BOUNTY BOARD INQUIRY ROUTER
    // ----------------------------------------------------------------------
    // ----------------------------------------------------------------------
    // 11. COLLABORATION PORTAL & BOUNTY COMMAND CENTER LOGIC
    // ----------------------------------------------------------------------
    let activeBountyData = {
        id: 'INTERN-AIML',
        title: 'AI/ML Internship Opportunity',
        stack: 'PyTorch, RAG, Computer Vision'
    };

    // Category Filter Tabs
    const portalFilterTabs = document.querySelectorAll('.portal-tab');
    const bountyCards = document.querySelectorAll('.bounty-card');

    portalFilterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const filter = tab.getAttribute('data-portal-filter');

            portalFilterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            bountyCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });

    // Smart AI Matcher
    window.handleSmartMatch = function(bountyId) {
        bountyCards.forEach(card => {
            card.classList.remove('smart-matched');
        });

        if (!bountyId) return;

        const targetCard = document.querySelector(`.bounty-card[data-id="${bountyId}"]`);
        if (targetCard) {
            targetCard.classList.add('smart-matched');

            // Switch to All tab if card is hidden by filter
            const activeTab = document.querySelector('.portal-tab.active');
            const targetCategory = targetCard.getAttribute('data-category');
            if (activeTab && activeTab.getAttribute('data-portal-filter') !== 'all' && activeTab.getAttribute('data-portal-filter') !== targetCategory) {
                const allTab = document.querySelector('.portal-tab[data-portal-filter="all"]');
                if (allTab) allTab.click();
            }

            if (lenis) {
                lenis.scrollTo(targetCard, { offset: -100, duration: 1.2 });
            } else {
                targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }

            setTimeout(() => {
                targetCard.classList.remove('smart-matched');
            }, 4500);
        }
    };

    // Expandable Specs Drawer Toggle
    window.toggleBountyDrawer = function(bountyId) {
        const drawer = document.getElementById(`drawer-${bountyId}`);
        const btn = drawer?.parentElement?.querySelector('.secondary-bounty-btn');

        if (drawer) {
            const isOpen = drawer.classList.contains('open');
            // Close all other drawers
            document.querySelectorAll('.bounty-drawer.open').forEach(d => d.classList.remove('open'));
            
            if (!isOpen) {
                drawer.classList.add('open');
                if (btn) btn.querySelector('.btn-text').textContent = 'Hide Specs';
            } else {
                if (btn) btn.querySelector('.btn-text').textContent = 'Specs';
            }
        }
    };

    // Terminal Modal Functions
    window.openBountyTerminal = function(id, title, stack) {
        activeBountyData = { id, title, stack };

        const modal = document.getElementById('bounty-terminal-modal');
        const titleEl = document.getElementById('modal-bounty-title');
        const idEl = document.getElementById('modal-bounty-id');
        const stackEl = document.getElementById('modal-bounty-stack');
        const subjectInput = document.getElementById('term-subject');

        if (titleEl) titleEl.textContent = title;
        if (idEl) idEl.textContent = `ID: ${id}`;
        if (stackEl) stackEl.textContent = stack;
        if (subjectInput) subjectInput.value = `Collaboration Inquiry: ${title}`;

        if (modal) {
            modal.classList.add('active');
            updateTerminalPayload();
        }
    };

    window.closeBountyTerminal = function() {
        const modal = document.getElementById('bounty-terminal-modal');
        if (modal) modal.classList.remove('active');
    };

    window.updateTerminalPayload = function() {
        const name = document.getElementById('term-name')?.value || 'ANONYMOUS_SENDER';
        const email = document.getElementById('term-email')?.value || 'pending@endpoint.io';
        const subject = document.getElementById('term-subject')?.value || activeBountyData.title;
        const timeline = document.getElementById('term-timeline')?.value || 'Immediate';
        const message = document.getElementById('term-message')?.value || '';

        const payloadObj = {
            protocol: "DISPATCH_INQUIRY",
            target_bounty_id: activeBountyData.id,
            sender: name,
            contact_endpoint: email,
            subject: subject,
            timeline_target: timeline,
            message_bytes: message.length,
            status: name !== 'ANONYMOUS_SENDER' && email !== 'pending@endpoint.io' ? 'READY_TO_DISPATCH' : 'AWAITING_INPUT'
        };

        const previewEl = document.getElementById('modal-json-preview');
        if (previewEl) {
            previewEl.querySelector('code').textContent = JSON.stringify(payloadObj, null, 2);
        }
    };

    window.handleBountyTerminalSubmit = function(event) {
        event.preventDefault();

        const name = document.getElementById('term-name')?.value;
        const email = document.getElementById('term-email')?.value;
        const subject = document.getElementById('term-subject')?.value;
        const timeline = document.getElementById('term-timeline')?.value;
        const message = document.getElementById('term-message')?.value;

        // Fill Main Contact Form
        const formName = document.getElementById('form-name');
        const formEmail = document.getElementById('form-email');
        const formSubject = document.getElementById('form-subject');
        const formMessage = document.getElementById('form-message');

        if (formName) formName.value = name;
        if (formEmail) formEmail.value = email;
        if (formSubject) formSubject.value = `[${activeBountyData.id}] ${subject}`;
        if (formMessage) {
            formMessage.value = `// TRANSMISSION PROTOCOL: ${activeBountyData.id}\n// TARGET: ${activeBountyData.title}\n// TIMELINE: ${timeline}\n\nSender: ${name} (${email})\n\nMessage:\n${message}`;
        }

        closeBountyTerminal();

        // Scroll to contact section
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            if (lenis) {
                lenis.scrollTo(contactSection, { offset: -40, duration: 1.2 });
            } else {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }

            const formCard = contactSection.querySelector('.contact-form-card');
            if (formCard) {
                formCard.classList.add('glow-highlight');
                setTimeout(() => {
                    formCard.classList.remove('glow-highlight');
                }, 2000);
            }
        }
    };

    // Legacy fallback
    window.initiateBountyInquiry = function(bountySubject) {
        openBountyTerminal('INQUIRY', bountySubject, 'AI/ML Engineering');
    };

    // ----------------------------------------------------------------------
    // 11b. SCROLL REVEAL — SECTION ENTRANCE OBSERVER
    // ----------------------------------------------------------------------
    const revealElements = document.querySelectorAll('.section-reveal');
    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementTop < windowHeight - 80) {
                el.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // ----------------------------------------------------------------------
    // 12. GLASS CARD MOUSE GLOW & TILT EFFECT
    // ----------------------------------------------------------------------
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            if (card.hasAttribute('data-tilt') && window.innerWidth >= 1024) {
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -5;
                const rotateY = ((x - centerX) / centerX) * 5;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
            }
        });

        card.addEventListener('mouseleave', () => {
            if (card.hasAttribute('data-tilt')) {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            }
        });
    });

    // ----------------------------------------------------------------------
    // 13. ANIMATE COUNTERS
    // ----------------------------------------------------------------------
    function animateCounters() {
        const counters = document.querySelectorAll('.counter-num');
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let count = 0;
            const speed = target / 15;

            const updateCount = () => {
                count += speed;
                if (count < target) {
                    counter.innerText = Math.ceil(count) + "+";
                    setTimeout(updateCount, 45);
                } else {
                    counter.innerText = target + "+";
                }
            };
            updateCount();
        });
    }

    // ----------------------------------------------------------------------
    // 14. CONTACT FORM & EMAILJS INTEGRATION WITH HUD LOG STREAM
    // ----------------------------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const feedback = document.getElementById('form-feedback');
    const hudPingEl = document.getElementById('hud-ping-val');
    const hudTerminalLogs = document.getElementById('hud-terminal-logs');

    if (hudPingEl) {
        setInterval(() => {
            const randomPing = Math.floor(Math.random() * 8) + 12;
            hudPingEl.textContent = `${randomPing} ms`;
        }, 3000);
    }

    if (hudTerminalLogs) {
        const sampleLogs = [
            "PING RECEIVED FROM GATEWAY-NAGPUR.",
            "AES-256 HANDSHAKE OK.",
            "NODE CONGESTION: 0.02% (EXCELLENT).",
            "UPLINK STABILITY: 99.98%.",
            "LISTENING ON PORT 443...",
            "READY FOR TRANSMISSION FLOW."
        ];
        setInterval(() => {
            const logLine = document.createElement('div');
            logLine.classList.add('log-line');
            logLine.textContent = `> ${sampleLogs[Math.floor(Math.random() * sampleLogs.length)]}`;

            hudTerminalLogs.appendChild(logLine);
            if (hudTerminalLogs.children.length > 5) {
                hudTerminalLogs.removeChild(hudTerminalLogs.firstChild);
            }
        }, 5000);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!submitBtn || !feedback) return;

            submitBtn.disabled = true;
            submitBtn.innerHTML = 'TRANSMITTING... <i class="fa-solid fa-spinner fa-spin"></i>';
            feedback.className = 'form-feedback';
            feedback.style.display = 'none';

            if (hudTerminalLogs) {
                const logLine = document.createElement('div');
                logLine.classList.add('log-line');
                logLine.style.color = 'var(--neon-blue)';
                logLine.textContent = `> UPLINK STARTED: SENDING EMAILJS PACKETS...`;
                hudTerminalLogs.appendChild(logLine);
            }

            const senderName = document.getElementById('form-name').value;
            const senderEmail = document.getElementById('form-email').value;
            const senderMessage = document.getElementById('form-message').value;

            const templateParams = {
                from_name: senderName,
                from_email: senderEmail,
                message: senderMessage,
                to_name: "Mirza Alhaj Baig"
            };

            if (typeof emailjs !== 'undefined') {
                emailjs.send("service_devd1w8", "template_lprjsmn", templateParams)
                    .then(() => {
                        feedback.textContent = 'Neural message transmitted successfully! Mirza will respond shortly.';
                        feedback.className = 'form-feedback success';
                        feedback.style.display = 'block';

                        if (hudTerminalLogs) {
                            const logLine = document.createElement('div');
                            logLine.classList.add('log-line');
                            logLine.style.color = 'var(--cyan-glow)';
                            logLine.textContent = `> TRANSMISSION COMPLETED SUCCESSFULLY.`;
                            hudTerminalLogs.appendChild(logLine);
                        }

                        contactForm.reset();
                    })
                    .catch((error) => {
                        console.error("EmailJS Error details:", error);
                        feedback.textContent = 'Transmission failure: ' + (error.text || 'Network Timeout');
                        feedback.className = 'form-feedback error';
                        feedback.style.display = 'block';

                        if (hudTerminalLogs) {
                            const logLine = document.createElement('div');
                            logLine.classList.add('log-line');
                            logLine.style.color = '#f43f5e';
                            logLine.textContent = `> TRANSMISSION FAILED: ERROR DISPATCHING.`;
                            hudTerminalLogs.appendChild(logLine);
                        }
                    })
                    .finally(() => {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = 'INITIALIZE SEND <i class="fa-solid fa-paper-plane"></i>';
                    });
            } else {
                feedback.textContent = 'EmailJS SDK offline. Please attempt direct email contact.';
                feedback.className = 'form-feedback error';
                feedback.style.display = 'block';
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'INITIALIZE SEND <i class="fa-solid fa-paper-plane"></i>';
            }
        });
    }

    // ----------------------------------------------------------------------
    // 15. CERTIFICATIONS CAROUSEL & FILTER CONTROLLER
    // ----------------------------------------------------------------------
    const certsCarousel = document.getElementById('certs-carousel');
    const certPrevBtn = document.getElementById('cert-prev');
    const certNextBtn = document.getElementById('cert-next');
    const certCurrentEl = document.getElementById('cert-current');
    const certTotalEl = document.getElementById('cert-total');
    const certFilterBtns = document.querySelectorAll('.cert-filter-btn');

    if (certsCarousel && certPrevBtn && certNextBtn) {
        let certCards = Array.from(certsCarousel.querySelectorAll('.cert-showcase-card'));
        let cardWidth = 370;

        const updateCarouselCounters = () => {
            const visibleCards = certCards.filter(card => card.style.display !== 'none');
            const scrollPos = certsCarousel.scrollLeft;
            const currentIndex = Math.max(1, Math.round(scrollPos / cardWidth) + 1);

            if (certCurrentEl) certCurrentEl.textContent = Math.min(currentIndex, visibleCards.length);
            if (certTotalEl) certTotalEl.textContent = visibleCards.length;
        };

        certNextBtn.addEventListener('click', () => {
            certsCarousel.scrollBy({ left: cardWidth, behavior: 'smooth' });
        });

        certPrevBtn.addEventListener('click', () => {
            certsCarousel.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        });

        certsCarousel.addEventListener('scroll', updateCarouselCounters);

        certFilterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filterVal = btn.getAttribute('data-cert-filter');

                certFilterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                certCards.forEach(card => {
                    const cardCat = card.getAttribute('data-cert-cat');
                    if (filterVal === 'all' || cardCat === filterVal) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.95)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 250);
                    }
                });

                setTimeout(() => {
                    certsCarousel.scrollTo({ left: 0, behavior: 'smooth' });
                    updateCarouselCounters();
                }, 300);
            });
        });

        updateCarouselCounters();
    }

    // Initialize Lucide icons if available
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
    }

    // ----------------------------------------------------------------------
    // 17. SURREAL INTERACTIVE ABOUT SECTION CONTROLLER
    // ----------------------------------------------------------------------
    // A) Specialization Chips & Diagnostic HUD
    const specChips = document.querySelectorAll('.bio-spec-chip');
    const hudTitle = document.getElementById('hud-spec-title');
    const hudDesc = document.getElementById('hud-spec-desc');

    specChips.forEach(chip => {
        chip.addEventListener('click', () => {
            specChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            if (hudTitle && hudDesc) {
                hudTitle.textContent = chip.getAttribute('data-title');
                hudDesc.textContent = chip.getAttribute('data-desc');
            }
        });
    });

    // B) Terminal Action Buttons (Run Pipeline & Copy Code)
    const runTerminalBtn = document.getElementById('run-terminal-btn');
    const copyTerminalBtn = document.getElementById('copy-terminal-btn');
    const consoleOutput = document.getElementById('terminal-console-output');
    const consoleLogRows = document.getElementById('console-log-rows');
    const clearConsoleBtn = document.getElementById('clear-console-btn');

    if (runTerminalBtn && consoleOutput && consoleLogRows) {
        let isRunning = false;

        runTerminalBtn.addEventListener('click', () => {
            if (isRunning) return;
            isRunning = true;
            consoleOutput.style.display = 'block';
            consoleLogRows.innerHTML = '';
            runTerminalBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> RUNNING...';

            const logs = [
                { type: 'info', text: 'INITIALIZING NEURAL PIPELINE EXECUTION...' },
                { type: 'ok', text: '[OK] PyTorch CUDA Toolkit initialized (v2.3)' },
                { type: 'ok', text: '[OK] Vector DB: Connected to Supabase pgvector' },
                { type: 'ok', text: '[OK] Verifying Credentials: GCOEN B.Tech CSE (Active)' },
                { type: 'info', text: '[OK] Hackathon Podiums: YCCE Smackathon 2026, VNIT, TGCE' },
                { type: 'success', text: '[SUCCESS] Cognitive Engine 100% Active. Ready for Internships & AI Collaborations.' }
            ];

            logs.forEach((log, index) => {
                setTimeout(() => {
                    const time = new Date().toLocaleTimeString('en-US', { hour12: false });
                    const row = document.createElement('div');
                    row.className = `console-log-line ${log.type}`;
                    row.innerHTML = `<span class="timestamp">[${time}]</span> <span>${log.text}</span>`;
                    consoleLogRows.appendChild(row);
                    consoleOutput.scrollTop = consoleOutput.scrollHeight;

                    if (index === logs.length - 1) {
                        isRunning = false;
                        runTerminalBtn.innerHTML = '<i class="fa-solid fa-check"></i> EXECUTED';
                        setTimeout(() => {
                            runTerminalBtn.innerHTML = '<i class="fa-solid fa-play"></i> RUN PIPELINE';
                        }, 3000);
                    }
                }, index * 400);
            });
        });
    }

    if (clearConsoleBtn && consoleOutput) {
        clearConsoleBtn.addEventListener('click', () => {
            consoleOutput.style.display = 'none';
        });
    }

    if (copyTerminalBtn) {
        copyTerminalBtn.addEventListener('click', () => {
            const codeElem = document.getElementById('python-dossier-code');
            if (!codeElem) return;
            const codeText = codeElem.innerText;
            navigator.clipboard.writeText(codeText).then(() => {
                copyTerminalBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
                setTimeout(() => {
                    copyTerminalBtn.innerHTML = '<i class="fa-regular fa-copy"></i>';
                }, 2000);
            });
        });
    }

    // C) Mode Switcher Deck Bar Filter
    const aboutModeBtns = document.querySelectorAll('.about-mode-btn');
    const bioCard = document.querySelector('.bio-narrative-card');
    const statsGrid = document.querySelector('.stats-dashboard-grid');
    const terminalPanel = document.querySelector('.about-terminal-panel');
    const timelineDeck = document.querySelector('.timeline-capsule-deck');

    aboutModeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            aboutModeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const mode = btn.getAttribute('data-mode');

            if (mode === 'all') {
                if (bioCard) bioCard.style.display = 'flex';
                if (statsGrid) statsGrid.style.display = 'grid';
                if (terminalPanel) terminalPanel.style.display = 'flex';
                if (timelineDeck) timelineDeck.style.display = 'flex';
            } else if (mode === 'bio') {
                if (bioCard) bioCard.style.display = 'flex';
                if (statsGrid) statsGrid.style.display = 'grid';
                if (terminalPanel) terminalPanel.style.display = 'none';
                if (timelineDeck) timelineDeck.style.display = 'none';
            } else if (mode === 'terminal') {
                if (bioCard) bioCard.style.display = 'none';
                if (statsGrid) statsGrid.style.display = 'none';
                if (terminalPanel) terminalPanel.style.display = 'flex';
                if (timelineDeck) timelineDeck.style.display = 'none';
            } else if (mode === 'timeline') {
                if (bioCard) bioCard.style.display = 'none';
                if (statsGrid) statsGrid.style.display = 'none';
                if (terminalPanel) terminalPanel.style.display = 'none';
                if (timelineDeck) timelineDeck.style.display = 'flex';
            }
        });
    });
});

// ----------------------------------------------------------------------
// 16. CERTIFICATIONS MODAL CONTROLLER (GLOBAL WINDOW SCOPE)
// ----------------------------------------------------------------------
const modal = document.getElementById('cert-modal');
const modalTitle = document.getElementById('modal-title');
const modalImg = document.getElementById('modal-img');
const modalDesc = document.getElementById('modal-desc');

window.openCertModal = function(title, imgSrc, description) {
    if (!modal || !modalTitle || !modalImg || !modalDesc) return;
    modalTitle.textContent = title;
    modalImg.src = imgSrc;
    modalDesc.innerHTML = `<span style="font-family: var(--font-code); color: var(--cyan-glow); display: block; margin-bottom: 8px;">> CREDENTIAL VERIFIED SECURE // AUDIT OK</span>${description}`;
    modal.classList.add('show');

    const cursor = document.querySelector('.custom-cursor');
    if (cursor) cursor.classList.remove('hovered', 'hovered-text');
};

window.closeCertModal = function() {
    if (modal) modal.classList.remove('show');
};

window.closeCertModalOutside = function(event) {
    if (event.target === modal) {
        closeCertModal();
    }
};

// ----------------------------------------------------------------------
// 17. WEB AUDIO SYNTHESIZER SFX
// ----------------------------------------------------------------------
let sfxEnabled = true;
let audioCtx = null;

window.toggleSFX = function() {
    sfxEnabled = !sfxEnabled;
    const btn = document.getElementById('sfx-toggle-btn');
    if (btn) {
        if (sfxEnabled) {
            btn.classList.remove('muted');
            btn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
            playSFX(800, 'sine', 0.1);
        } else {
            btn.classList.add('muted');
            btn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
        }
    }
};

function playSFX(freq = 600, type = 'sine', duration = 0.08) {
    if (!sfxEnabled) return;
    try {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    } catch(e) {}
}

// Global click SFX listener
document.addEventListener('click', (e) => {
    if (e.target.closest('button, a, .cmd-item, .portal-tab, .bounty-card')) {
        playSFX(700, 'sine', 0.06);
    }
});

// ----------------------------------------------------------------------
// 18. COMMAND PALETTE LOGIC (DEACTIVATED)
// ----------------------------------------------------------------------
window.openCmdPalette = function() {};
window.closeCmdPalette = function() {};
window.handleCmdOverlayClick = function() {};
window.filterCmdList = function() {};

window.navigateFromCmd = function(hashTarget) {
    const targetEl = document.querySelector(hashTarget);
    if (targetEl) {
        if (window.lenis) {
            window.lenis.scrollTo(targetEl, { offset: -40, duration: 1.2 });
        } else {
            targetEl.scrollIntoView({ behavior: 'smooth' });
        }
    }
};

// Keyboard listener Esc for active modals
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeResumeModal();
        closeBountyTerminal();
    }
});

// ----------------------------------------------------------------------
// 19. RESUME SPECS MODAL LOGIC
// ----------------------------------------------------------------------
window.openResumeModal = function() {
    const modal = document.getElementById('resume-modal');
    if (modal) modal.classList.add('active');
};

window.closeResumeModal = function() {
    const modal = document.getElementById('resume-modal');
    if (modal) modal.classList.remove('active');
};

// ----------------------------------------------------------------------
// 20. SKILLS TAXONOMY FILTER TABS LOGIC
// ----------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    const taxButtons = document.querySelectorAll('.tax-tab-btn');
    const domainBlocks = document.querySelectorAll('.tax-domain-block');
    const categoryDividers = document.querySelectorAll('.taxonomy-domains-list > .editorial-divider');

    taxButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            taxButtons.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            const filter = btn.getAttribute('data-tax-filter');

            domainBlocks.forEach(block => {
                const cat = block.getAttribute('data-tax-cat');
                if (filter === 'all' || filter === cat) {
                    block.classList.remove('hidden-domain');
                } else {
                    block.classList.add('hidden-domain');
                }
            });

            categoryDividers.forEach(div => {
                const cat = div.getAttribute('data-tax-cat');
                if (!cat || filter === 'all' || filter === cat) {
                    div.style.display = 'block';
                } else {
                    div.style.display = 'none';
                }
            });
        });
    });

    // ----------------------------------------------------------------------
    // 21. PROJECTS FILTER TABS LOGIC
    // ----------------------------------------------------------------------
    const projButtons = document.querySelectorAll('.proj-tab-btn');
    const projBlocks = document.querySelectorAll('.proj-case-study-block');
    const projDividers = document.querySelectorAll('.projects-showcase-container > .editorial-divider');

    projButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            projButtons.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            const filter = btn.getAttribute('data-proj-filter');

            projBlocks.forEach(block => {
                const cat = block.getAttribute('data-proj-cat');
                if (filter === 'all' || filter === cat) {
                    block.classList.remove('hidden-project');
                } else {
                    block.classList.add('hidden-project');
                }
            });

            projDividers.forEach(div => {
                const cat = div.getAttribute('data-proj-cat');
                if (!cat || filter === 'all' || filter === cat) {
                    div.style.display = 'block';
                } else {
                    div.style.display = 'none';
                }
            });
        });
    });

    // ----------------------------------------------------------------------
    // 22. MULTI-STEP COLLABORATION PORTAL WIZARD LOGIC
    // ----------------------------------------------------------------------
    let currentStep = 1;
    let selectedCollabType = 'BUILD TOGETHER';

    const collabRows = document.querySelectorAll('.collab-row-item');
    const stepNumDisplay = document.getElementById('portal-step-num');
    const stepHintText = document.getElementById('step-hint-text');

    const typeTitleMap = {
        build: "BUILD TOGETHER",
        research: "RESEARCH",
        hackathon: "HACKATHON",
        opensource: "OPEN SOURCE",
        opportunity: "OPPORTUNITY",
        other: "OTHER"
    };

    const hintMap = {
        build: "Choose the option that best describes your idea.",
        research: "AI/ML papers, empirical benchmarks, and deep learning exploration.",
        hackathon: "Building and competing together in 24h–48h sprints.",
        opensource: "Contributing to or engineering open-source AI tooling.",
        opportunity: "Internships, engineering roles, and professional advisory.",
        other: "Something that doesn't fit the categories above."
    };

    // Row selection in Step 1
    collabRows.forEach(row => {
        row.addEventListener('click', () => {
            collabRows.forEach(r => r.classList.remove('active'));
            row.classList.add('active');
            const typeKey = row.getAttribute('data-collab-type');
            selectedCollabType = typeTitleMap[typeKey] || row.querySelector('.row-title')?.textContent.trim() || 'BUILD TOGETHER';
            if (stepHintText && hintMap[typeKey]) {
                stepHintText.textContent = hintMap[typeKey];
            }
        });
    });

    function goToStep(step) {
        currentStep = step;
        document.querySelectorAll('.portal-step').forEach(s => s.classList.remove('active'));
        
        const targetStep = document.getElementById(`portal-step-${step}`);
        if (targetStep) {
            targetStep.classList.add('active');
        }

        if (stepNumDisplay && typeof step === 'number') {
            stepNumDisplay.textContent = `0${step}`;
        }
    }

    // Step 1 Next
    const next1 = document.getElementById('portal-next-1');
    if (next1) {
        next1.addEventListener('click', () => goToStep(2));
    }

    // Step 2 Back & Next
    const back2 = document.getElementById('portal-back-2');
    const next2 = document.getElementById('portal-next-2');
    if (back2) back2.addEventListener('click', () => goToStep(1));
    if (next2) {
        next2.addEventListener('click', () => {
            const ideaInput = document.getElementById('portal-idea-input');
            if (ideaInput && !ideaInput.value.trim()) {
                ideaInput.focus();
                ideaInput.style.borderColor = '#ef4444';
                setTimeout(() => { ideaInput.style.borderColor = ''; }, 2000);
                return;
            }
            goToStep(3);
        });
    }

    // Step 3 Back & Next
    const back3 = document.getElementById('portal-back-3');
    const next3 = document.getElementById('portal-next-3');
    if (back3) back3.addEventListener('click', () => goToStep(2));
    if (next3) {
        next3.addEventListener('click', () => {
            const nameInput = document.getElementById('portal-name-input');
            const emailInput = document.getElementById('portal-email-input');

            let valid = true;
            if (nameInput && !nameInput.value.trim()) {
                nameInput.focus();
                nameInput.style.borderColor = '#ef4444';
                setTimeout(() => { nameInput.style.borderColor = ''; }, 2000);
                valid = false;
            }
            if (emailInput && (!emailInput.value.trim() || !emailInput.value.includes('@'))) {
                if (valid) emailInput.focus();
                emailInput.style.borderColor = '#ef4444';
                setTimeout(() => { emailInput.style.borderColor = ''; }, 2000);
                valid = false;
            }

            if (!valid) return;

            // Populate Step 4 Review Summary
            const revType = document.getElementById('review-type');
            const revIdea = document.getElementById('review-idea');
            const revContact = document.getElementById('review-contact');
            const ideaInput = document.getElementById('portal-idea-input');

            if (revType) revType.textContent = selectedCollabType;
            if (revIdea && ideaInput) revIdea.textContent = ideaInput.value.trim();
            if (revContact && nameInput && emailInput) {
                revContact.textContent = `${nameInput.value.trim()} (${emailInput.value.trim()})`;
            }

            goToStep(4);
        });
    }

    // Step 4 Edit (Back) & Send
    const back4 = document.getElementById('portal-back-4');
    const sendBtn = document.getElementById('portal-send-btn');

    if (back4) back4.addEventListener('click', () => goToStep(3));
    if (sendBtn) {
        sendBtn.addEventListener('click', () => {
            sendBtn.disabled = true;
            const btnSpan = sendBtn.querySelector('span');
            if (btnSpan) btnSpan.textContent = 'SENDING...';

            setTimeout(() => {
                const nameInput = document.getElementById('portal-name-input');
                const successMsg = document.getElementById('success-name-msg');
                if (successMsg && nameInput && nameInput.value.trim()) {
                    const firstName = nameInput.value.trim().split(' ')[0];
                    successMsg.textContent = `Thanks ${firstName}, your collaboration request has been logged. I'll take a look and get back to you shortly.`;
                }

                document.querySelectorAll('.portal-step').forEach(s => s.classList.remove('active'));
                const successStep = document.getElementById('portal-step-success');
                if (successStep) successStep.classList.add('active');

                const indicator = document.querySelector('.portal-step-indicator');
                if (indicator) indicator.style.display = 'none';
            }, 800);
        });
    }
});

// ----------------------------------------------------------------------
// 23. RECOGNITION PHOTO GALLERY & LIGHTBOX CONTROLLER
// ----------------------------------------------------------------------
window.switchSmackathonPhoto = function(photoUrl, btnEl) {
    const mainImg = document.getElementById('smackathon-hero-photo');
    if (mainImg) {
        mainImg.src = photoUrl;
        const wrapper = mainImg.closest('.hero-main-photo-wrapper');
        if (wrapper) {
            let caption = 'Smackathon 2026';
            if (photoUrl.includes('cheque')) caption = 'Smackathon 2026 Cheque Ceremony';
            else if (photoUrl.includes('solo')) caption = 'Smackathon 2026 Runner-Up Certificate';
            else if (photoUrl.includes('group')) caption = 'Smackathon 2026 Grand Finalists';
            wrapper.setAttribute('onclick', `openPhotoLightbox('${photoUrl}', '${caption}')`);
        }
    }
    document.querySelectorAll('.photo-thumb-btn').forEach(btn => btn.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');
};

window.openPhotoLightbox = function(photoUrl, caption) {
    const modal = document.getElementById('photo-lightbox-modal');
    const img = document.getElementById('lightbox-img');
    const cap = document.getElementById('lightbox-caption');
    if (modal && img) {
        img.src = photoUrl;
        if (cap) cap.textContent = caption || '';
        modal.classList.add('active');
    }
};

window.closePhotoLightbox = function(e) {
    if (e && e.target && !e.target.classList.contains('lightbox-overlay') && !e.target.classList.contains('lightbox-close-btn')) {
        return;
    }
    const modal = document.getElementById('photo-lightbox-modal');
    if (modal) modal.classList.remove('active');
};

// ----------------------------------------------------------------------
// 24. CERTIFICATIONS ARCHIVE FILTER, SEARCH & FULLSCREEN VIEWER CONTROLLER
// ----------------------------------------------------------------------
const certCollectionData = [
    {
        title: 'Google Prompting Essentials',
        issuer: 'Google via Coursera · Issued May 2026',
        img: 'assets/cert-google-prompting.png',
        link: 'https://coursera.org/verify/specialization/12XH3VZY1Y2H'
    },
    {
        title: 'Google AI Essentials',
        issuer: 'Google via Coursera · Issued May 2026',
        img: 'assets/cert-google-ai-essentials.png',
        link: 'https://coursera.org/verify/specialization/N2ASDEPNLP18'
    },
    {
        title: 'Python for Data Science',
        issuer: 'IBM · Credly Verified',
        img: 'assets/cert-python-ds.png',
        link: 'https://www.credly.com/badges/93f1490c-6f72-4fef-baf9-37e466bacb8b'
    },
    {
        title: 'Introduction to AI',
        issuer: 'Google via Coursera',
        img: 'assets/cert-intro-to-ai.png',
        link: 'https://coursera.org/verify/9U5GX2MFJTFI'
    },
    {
        title: 'Maximize Productivity With AI Tools',
        issuer: 'Google via Coursera',
        img: 'assets/cert-maximize-productivity.png',
        link: 'https://coursera.org/verify/EVNVWOP09EQV'
    },
    {
        title: 'Start Writing Prompts like a Pro',
        issuer: 'Google via Coursera',
        img: 'assets/cert-writing-prompts.png',
        link: 'https://coursera.org/verify/3GUGJVjWJRKU'
    },
    {
        title: 'Use AI as a Creative or Expert Partner',
        issuer: 'Google via Coursera',
        img: 'assets/cert-google-creative-partner.png',
        link: 'https://coursera.org/verify/JNIQ5WNG5MOR'
    },
    {
        title: 'Speed Up Data Analysis & Presentation',
        issuer: 'Google via Coursera',
        img: 'assets/cert-google-data-analysis.png',
        link: 'https://coursera.org/verify/KA1CZUWV2M24'
    },
    {
        title: 'Discover the Art of Prompting',
        issuer: 'Google via Coursera',
        img: 'assets/cert-google-art-of-prompting.png',
        link: 'https://coursera.org/verify/6K9PYUR9WB73'
    },
    {
        title: 'Use AI Responsibly',
        issuer: 'Google via Coursera',
        img: 'assets/cert-google-ai-responsibly.png',
        link: 'https://coursera.org/verify/Q30VURT6TLWW'
    }
];

let currentViewerIndex = 0;

window.filterCerts = function(category, btnEl) {
    document.querySelectorAll('.cert-nav-tab').forEach(btn => btn.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');

    const searchInput = document.getElementById('cert-search-input');
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

    updateCertVisibility(category, query);
};

window.handleCertSearch = function(query) {
    const activeFilter = document.querySelector('.cert-nav-tab.active')?.getAttribute('data-cert-filter') || 'all';
    updateCertVisibility(activeFilter, query.toLowerCase().trim());
};

window.clearCertSearch = function() {
    const searchInput = document.getElementById('cert-search-input');
    if (searchInput) searchInput.value = '';
    const allTab = document.querySelector('.cert-nav-tab[data-cert-filter="all"]');
    filterCerts('all', allTab);
};

function updateCertVisibility(category, query) {
    const items = document.querySelectorAll('.cert-item-node');
    let visibleCount = 0;

    items.forEach(item => {
        const itemCat = item.getAttribute('data-cert-cat');
        const searchText = (item.getAttribute('data-cert-search') || '').toLowerCase();
        const itemText = item.textContent.toLowerCase();

        const matchesCat = (category === 'all' || itemCat === category);
        const matchesQuery = !query || searchText.includes(query) || itemText.includes(query);

        if (matchesCat && matchesQuery) {
            item.style.display = item.classList.contains('cert-featured-hero-card') ? 'grid' : 'grid';
            visibleCount++;
        } else {
            item.style.display = 'none';
        }
    });

    const fallback = document.getElementById('no-certs-fallback');
    if (fallback) {
        fallback.style.display = (visibleCount === 0) ? 'flex' : 'none';
    }
}

window.openCertViewer = function(index) {
    if (index < 0 || index >= certCollectionData.length) return;
    currentViewerIndex = index;

    const data = certCollectionData[index];
    const modal = document.getElementById('fullscreen-cert-modal');
    const imgEl = document.getElementById('viewer-cert-img');
    const indexEl = document.getElementById('viewer-cert-index');
    const titleEl = document.getElementById('viewer-cert-title');
    const issuerEl = document.getElementById('viewer-cert-issuer');
    const linkEl = document.getElementById('viewer-cert-link');

    if (imgEl) imgEl.src = data.img;
    if (indexEl) indexEl.textContent = `${String(index + 1).padStart(2, '0')} / ${String(certCollectionData.length).padStart(2, '0')}`;
    if (titleEl) titleEl.textContent = data.title;
    if (issuerEl) issuerEl.textContent = data.issuer;
    if (linkEl) linkEl.href = data.link;

    if (modal) modal.classList.add('active');
};

window.navCertViewer = function(dir, e) {
    if (e) e.stopPropagation();
    let newIndex = currentViewerIndex + dir;
    if (newIndex < 0) newIndex = certCollectionData.length - 1;
    if (newIndex >= certCollectionData.length) newIndex = 0;
    openCertViewer(newIndex);
};

window.closeCertViewer = function(e) {
    if (e && e.target && !e.target.classList.contains('fullscreen-viewer-overlay') && !e.target.classList.contains('viewer-close-btn')) {
        return;
    }
    const modal = document.getElementById('fullscreen-cert-modal');
    if (modal) modal.classList.remove('active');
};

document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('fullscreen-cert-modal');
    if (modal && modal.classList.contains('active')) {
        if (e.key === 'Escape') closeCertViewer();
        if (e.key === 'ArrowLeft') navCertViewer(-1);
        if (e.key === 'ArrowRight') navCertViewer(1);
    }
});

// ----------------------------------------------------------------------
// 25. PROGRESSIVE DISCLOSURE CONTACT FORM TOGGLE
// ----------------------------------------------------------------------
window.toggleContactForm = function() {
    const formBlock = document.getElementById('contact-form-reveal');
    if (formBlock) {
        if (formBlock.style.display === 'none' || !formBlock.style.display) {
            formBlock.style.display = 'block';
            formBlock.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            formBlock.style.display = 'none';
        }
    }
};






