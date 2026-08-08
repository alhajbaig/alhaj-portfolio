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
    // 2. PRELOADER SIMULATOR
    // ----------------------------------------------------------------------
    const preloader = document.getElementById('preloader');
    const loaderBar = document.getElementById('loader-bar');
    const loaderPercent = document.getElementById('loader-percent');

    if (preloader) {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.floor(Math.random() * 15) + 6;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                setTimeout(() => {
                    preloader.style.opacity = '0';
                    preloader.style.visibility = 'hidden';
                    animateCounters();
                    initHeroAnimations();
                }, 400);
            }
            if (loaderBar) loaderBar.style.width = `${progress}%`;
            if (loaderPercent) loaderPercent.textContent = progress;
        }, 70);
    }

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

        const colorCyan = new THREE.Color(0x00f2fe);
        const colorPurple = new THREE.Color(0x8b5cf6);

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

            const mixedColor = colorCyan.clone().lerp(colorPurple, Math.random());
            colors[i * 3] = mixedColor.r;
            colors[i * 3 + 1] = mixedColor.g;
            colors[i * 3 + 2] = mixedColor.b;

            scales[i] = Math.random() * 1.8 + 0.8;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        // Points Material
        const pMaterial = new THREE.PointsMaterial({
            size: 0.16,
            vertexColors: true,
            transparent: true,
            opacity: 0.75,
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

    // ----------------------------------------------------------------------
    // 4. DYNAMIC MAGNETIC & STATE-AWARE CURSOR SYSTEM
    // ----------------------------------------------------------------------
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.custom-cursor-dot');
    const cursorText = document.querySelector('.custom-cursor .cursor-text');

    if (cursor && cursorDot && window.innerWidth >= 1024) {
        let mousePos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        let cursorPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        let dotPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

        document.addEventListener('mousemove', (e) => {
            mousePos.x = e.clientX;
            mousePos.y = e.clientY;
        });

        function updateCursor() {
            // LERP interpolation
            cursorPos.x += (mousePos.x - cursorPos.x) * 0.18;
            cursorPos.y += (mousePos.y - cursorPos.y) * 0.18;

            dotPos.x += (mousePos.x - dotPos.x) * 0.4;
            dotPos.y += (mousePos.y - dotPos.y) * 0.4;

            cursor.style.left = `${cursorPos.x}px`;
            cursor.style.top = `${cursorPos.y}px`;

            cursorDot.style.left = `${dotPos.x}px`;
            cursorDot.style.top = `${dotPos.y}px`;

            requestAnimationFrame(updateCursor);
        }
        updateCursor();

        // Cursor States based on target hover elements
        const registerCursorHover = (selector, stateClass, labelText = '') => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursor.classList.add(stateClass);
                    if (labelText && cursorText) {
                        cursorText.textContent = labelText;
                    }
                });
                el.addEventListener('mouseleave', () => {
                    cursor.classList.remove(stateClass);
                    if (cursorText) cursorText.textContent = '';
                });
            });
        };

        registerCursorHover('.project-card, .cert-showcase-card', 'hovered-text', 'VIEW');
        registerCursorHover('a.btn, button.btn', 'hovered-text', 'EXPLORE');
        registerCursorHover('.social-icon-btn', 'hovered-text', 'OPEN');
        registerCursorHover('.nav-link, .console-tab-item, .filter-btn, .cert-filter-btn', 'hovered');
    }

    // ----------------------------------------------------------------------
    // 5. MAGNETIC BUTTON HARDWARE ACCELERATION
    // ----------------------------------------------------------------------
    const magneticBtns = document.querySelectorAll('.btn-magnetic');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate3d(${x * 0.28}px, ${y * 0.28}px, 0)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate3d(0px, 0px, 0px)';
        });
    });

    // ----------------------------------------------------------------------
    // 6. GSAP STAGGERED REVEALS & HERO SCROLLANIMATION
    // ----------------------------------------------------------------------
    function initHeroAnimations() {
        if (typeof gsap === 'undefined') return;

        const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.0 } });

        tl.fromTo('.hero-badge', { opacity: 0, y: 25 }, { opacity: 1, y: 0 })
          .fromTo('.hero-title', { opacity: 0, y: 35 }, { opacity: 1, y: 0 }, '-=0.6')
          .fromTo('.typewriter-container', { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, '-=0.6')
          .fromTo('.hero-description', { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, '-=0.6')
          .fromTo('.hero-actions .btn', { opacity: 0, y: 20, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, stagger: 0.15 }, '-=0.5')
          .fromTo('.hero-socials .social-icon-btn', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, stagger: 0.1 }, '-=0.4')
          .fromTo('.profile-container', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1.2 }, '-=1.0');

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
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
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

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
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

    // Mobile Navbar Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            const bars = navToggle.querySelectorAll('.bar');
            if (navToggle.classList.contains('active')) {
                bars[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navToggle.click();
                }
            });
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
    window.initiateBountyInquiry = function(bountySubject) {
        const contactSection = document.getElementById('contact');
        const messageTextarea = document.getElementById('form-message');

        if (messageTextarea) {
            messageTextarea.value = `Hello Mirza,\n\nI would like to connect with you regarding: "${bountySubject}". Let me know when you are available to sync.\n\nBest regards,\n`;
            messageTextarea.focus();
        }

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
                }, 1500);
            }
        }
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
