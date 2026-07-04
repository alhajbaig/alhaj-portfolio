// ==========================================================================
// Mirza Alhaj Baig | AI/ML Portfolio Javascript Logic
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

    // 1. PRELOADER SIMULATOR
    const preloader = document.getElementById('preloader');
    const loaderBar = document.getElementById('loader-bar');
    const loaderPercent = document.getElementById('loader-percent');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 15) + 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
                // Trigger counters after load
                animateCounters();
            }, 500);
        }
        loaderBar.style.width = `${progress}%`;
        loaderPercent.textContent = progress;
    }, 80);

    // 2. CUSTOM CURSOR
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.custom-cursor-dot');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;
    });

    const hoverableElements = document.querySelectorAll('a, button, .cert-card, .project-card, .opp-card, .tech-badge, .social-icon-btn');
    hoverableElements.forEach(elem => {
        elem.addEventListener('mouseenter', () => {
            cursor.classList.add('hovered');
        });
        elem.addEventListener('mouseleave', () => {
            cursor.classList.remove('hovered');
        });
    });

    // 3. BACKGROUND NEURAL NETWORK ANIMATION
    const canvas = document.getElementById('neural-canvas');
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
        width = (canvas.width = window.innerWidth);
        height = (canvas.height = window.innerHeight);
    });

    const numNodes = Math.min(65, Math.floor((width * height) / 22000));
    const nodes = [];

    class Node {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.6;
            this.vy = (Math.random() - 0.5) * 0.6;
            this.radius = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = '#00f2fe';
            ctx.fill();
        }
    }

    for (let i = 0; i < numNodes; i++) {
        nodes.push(new Node());
    }

    // Capture mouse coordinate for network attraction
    let mousePos = { x: null, y: null };
    document.addEventListener('mousemove', (e) => {
        mousePos.x = e.clientX;
        mousePos.y = e.clientY;
    });
    document.addEventListener('mouseleave', () => {
        mousePos.x = null;
        mousePos.y = null;
    });

    function animateNeuralNetwork() {
        ctx.clearRect(0, 0, width, height);

        nodes.forEach(node => {
            node.update();
            node.draw();
        });

        // Draw connections
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 130) {
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    const alpha = (1 - dist / 130) * 0.15;
                    ctx.strokeStyle = `rgba(157, 78, 221, ${alpha})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }

            // Mouse connection
            if (mousePos.x !== null && mousePos.y !== null) {
                const dx = nodes[i].x - mousePos.x;
                const dy = nodes[i].y - mousePos.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 180) {
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(mousePos.x, mousePos.y);
                    const alpha = (1 - dist / 180) * 0.2;
                    ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animateNeuralNetwork);
    }
    animateNeuralNetwork();

    // 4. TYPEWRITER EFFECT
    const typewriterTarget = document.getElementById('typewriter-target');
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
            typeDelay = 50;
        } else {
            typewriterTarget.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeDelay = 120;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            // Pause at complete word
            typeDelay = 1500;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeDelay = 400; // delay before typing next word
        }

        setTimeout(handleTypewriter, typeDelay);
    }
    setTimeout(handleTypewriter, 1000);

    // 5. NAVBAR SCROLL & ACTIVE INDICATORS
    const header = document.querySelector('.header');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        // Sticky Header class
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Show/Hide Back to top button
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }

        // Active Section indicators
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

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Mobile Navbar Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        // Toggle icon bars
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

    // Close mobile menu when nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navToggle.click();
            }
        });
    });

    // 6. INTERACTIVE EXPERIENCE CONSOLE CONTROLLER
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
            
            if (!data) return;

            // Update active tab class
            consoleTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Fade out viewport, update content, fade in
            expViewport.style.opacity = '0';
            expViewport.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                terminalStatus.textContent = data.status;
                
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
            }, 300);
        });
    });

    // 6a. TECHNICAL SKILLS CATEGORY FILTER
    const filterButtons = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skills-category-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterValue = btn.getAttribute('data-filter');

            // Update active state of buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            skillCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                // Hide with transition
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
                    }, 300);
                }
            });
        });
    });

    // 6b. BOUNTY BOARD INQUIRY ROUTER
    window.initiateBountyInquiry = function(bountySubject) {
        const contactForm = document.getElementById('contact-form');
        const contactSection = document.getElementById('contact');
        
        // Find or create subject input
        let subjectInput = document.getElementById('form-subject');
        
        // Let's check if the subject input exists in the HTML, otherwise we can append it dynamically or set a message body prefix.
        const messageTextarea = document.getElementById('form-message');
        
        if (messageTextarea) {
            messageTextarea.value = `Hello Mirza,\n\nI would like to connect with you regarding: "${bountySubject}". Let me know when you are available to sync.\n\nBest regards,\n`;
            messageTextarea.focus();
        }

        // Scroll to contact form smoothly
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
            
            // Add temporary flash class to highlight the form card
            const formCard = contactSection.querySelector('.contact-form-card');
            if (formCard) {
                formCard.classList.add('glow-highlight');
                setTimeout(() => {
                    formCard.classList.remove('glow-highlight');
                }, 1500);
            }
        }
    };

    // 7. MOUSE GLOW & CARD TILT SYSTEM
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            // Optional tilt effect
            if (card.hasAttribute('data-tilt')) {
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -6; // max 6 deg
                const rotateY = ((x - centerX) / centerX) * 6; // max 6 deg
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
            }
        });

        card.addEventListener('mouseleave', () => {
            if (card.hasAttribute('data-tilt')) {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            }
        });
    });

    // 8. MAGNETIC BUTTON SYSTEM
    const magneticBtns = document.querySelectorAll('.btn-magnetic');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });

    // 9. ANIMATE COUNTERS
    function animateCounters() {
        const counters = document.querySelectorAll('.counter-num');
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let count = 0;
            const speed = target / 15; // Animation ticks

            const updateCount = () => {
                count += speed;
                if (count < target) {
                    counter.innerText = Math.ceil(count) + "+";
                    setTimeout(updateCount, 40);
                } else {
                    counter.innerText = target + "+";
                }
            };
            updateCount();
        });
    }

    // 10. SCROLL REVEALS
    const revealElements = document.querySelectorAll('.section-reveal');
    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementTop < windowHeight - 100) {
                el.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger initial check

    // 11. CONTACT FORM SIMULATION & HUD CONTROLLER
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const feedback = document.getElementById('form-feedback');
    const hudPingEl = document.getElementById('hud-ping-val');
    const hudTerminalLogs = document.getElementById('hud-terminal-logs');

    // Simulate RTT Latency pings
    if (hudPingEl) {
        setInterval(() => {
            const randomPing = Math.floor(Math.random() * 8) + 12; // 12-19ms
            hudPingEl.textContent = `${randomPing} ms`;
        }, 3000);
    }

    // Dynamic terminal stream log injector
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
            
            // Keep logs capped at 4 lines for layout stability
            hudTerminalLogs.appendChild(logLine);
            if (hudTerminalLogs.children.length > 5) {
                hudTerminalLogs.removeChild(hudTerminalLogs.firstChild);
            }
        }, 5000);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
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

            // Extract form field inputs
            const senderName = document.getElementById('form-name').value;
            const senderEmail = document.getElementById('form-email').value;
            const senderMessage = document.getElementById('form-message').value;

            // Template parameters mapping
            const templateParams = {
                from_name: senderName,
                from_email: senderEmail,
                message: senderMessage,
                to_name: "Mirza Alhaj Baig"
            };

            // Trigger EmailJS transmission
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
        });
    }

    // 12. CERTIFICATIONS CAROUSEL & FILTER CONTROLLER
    const certsCarousel = document.getElementById('certs-carousel');
    const certPrevBtn = document.getElementById('cert-prev');
    const certNextBtn = document.getElementById('cert-next');
    const certCurrentEl = document.getElementById('cert-current');
    const certTotalEl = document.getElementById('cert-total');
    const certFilterBtns = document.querySelectorAll('.cert-filter-btn');

    if (certsCarousel && certPrevBtn && certNextBtn) {
        let certCards = Array.from(certsCarousel.querySelectorAll('.cert-showcase-card'));
        let cardWidth = 370; // min-width + gap

        const updateCarouselCounters = () => {
            const visibleCards = certCards.filter(card => card.style.display !== 'none');
            const scrollPos = certsCarousel.scrollLeft;
            const currentIndex = Math.max(1, Math.round(scrollPos / cardWidth) + 1);
            
            if (certCurrentEl) {
                certCurrentEl.textContent = Math.min(currentIndex, visibleCards.length);
            }
            if (certTotalEl) {
                certTotalEl.textContent = visibleCards.length;
            }
        };

        certNextBtn.addEventListener('click', () => {
            certsCarousel.scrollBy({ left: cardWidth, behavior: 'smooth' });
        });

        certPrevBtn.addEventListener('click', () => {
            certsCarousel.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        });

        certsCarousel.addEventListener('scroll', updateCarouselCounters);

        // Cert category filtering
        certFilterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filterVal = btn.getAttribute('data-cert-filter');

                // Toggle active filter button states
                certFilterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Apply dynamic filter classes
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
                        }, 300);
                    }
                });

                // Reset carousel scroll to left
                setTimeout(() => {
                    certsCarousel.scrollTo({ left: 0, behavior: 'smooth' });
                    updateCarouselCounters();
                }, 350);
            });
        });

        // Scroll-reveal entrance for cert cards
        const certObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('cert-visible');
                }
            });
        }, { threshold: 0.15 });

        certCards.forEach(card => certObserver.observe(card));
        updateCarouselCounters();
    }
});

// 13. CERTIFICATIONS MODAL CONTROLLER
const modal = document.getElementById('cert-modal');
const modalTitle = document.getElementById('modal-title');
const modalImg = document.getElementById('modal-img');
const modalDesc = document.getElementById('modal-desc');

window.openCertModal = function(title, imgSrc, description) {
    modalTitle.textContent = title;
    modalImg.src = imgSrc;
    
    // Extra secure typing audit log in description
    modalDesc.innerHTML = `<span style="font-family: var(--font-code); color: var(--cyan-glow); display: block; margin-bottom: 8px;">> CREDENTIAL VERIFIED SECURE // AUDIT OK</span>${description}`;
    modal.classList.add('show');
    
    // Add custom cursor styling if active
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) cursor.classList.remove('hovered');
};

window.closeCertModal = function() {
    modal.classList.remove('show');
};

window.closeCertModalOutside = function(event) {
    if (event.target === modal) {
        closeCertModal();
    }
};
