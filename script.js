// Enhanced Interactive JavaScript for MCP & EarningsAgent Website
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initNavbarScroll();
    initScrollAnimations();
    initParallaxEffects();
    initTabSwitching();
    initCopyButtons();
    initSmoothScrolling();
    initActiveNavigation();
    initLoadingAnimation();
    initHoverEffects();
    initTypingAnimation();
    
    console.log('🚀 MCP & EarningsAgent website fully loaded!');
});

// Navbar scroll effects with enhanced visibility
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateNavbar() {
        const currentScrollY = window.scrollY;
        
        // Enhanced background opacity based on scroll
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.8)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = 'none';
        }
        
        // Hide/show navbar on scroll direction
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick, { passive: true });
}

// Enhanced scroll animations with intersection observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special animations for specific elements
                if (entry.target.classList.contains('metric-card')) {
                    animateCounter(entry.target);
                }
                
                if (entry.target.classList.contains('timeline-item')) {
                    animateTimeline(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(`
        .explanation-card,
        .impact-card,
        .use-case,
        .aspect-card,
        .similarity-card,
        .comparison-section,
        .timeline-item,
        .ecosystem-showcase,
        .feature-detailed,
        .code-showcase,
        .impl-item,
        .metric-card,
        .highlight-item,
        .insight-item,
        .segment-card,
        .comparison-principle,
        .use-case-category,
        .impact-dimension
    `);

    animateElements.forEach((el, index) => {
        // Set initial state
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        
        observer.observe(el);
    });
}

// Counter animation for metric cards
function animateCounter(element) {
    const valueElement = element.querySelector('.metric-value, .highlight-value, .segment-value');
    if (!valueElement) return;
    
    const finalValue = valueElement.textContent;
    const isPercentage = finalValue.includes('%');
    const isInfinity = finalValue.includes('∞');
    const isCurrency = finalValue.includes('$') || finalValue.includes('B');
    
    if (isInfinity) return; // Don't animate infinity symbol
    
    let numericValue = parseFloat(finalValue.replace(/[^0-9.]/g, ''));
    if (isNaN(numericValue)) return;
    
    let currentValue = 0;
    const increment = numericValue / 60; // 60 frames for 1 second at 60fps
    
    function updateCounter() {
        currentValue += increment;
        
        if (currentValue >= numericValue) {
            currentValue = numericValue;
        }
        
        let displayValue = Math.round(currentValue);
        if (isCurrency) {
            displayValue = `$${displayValue}.${Math.floor(((currentValue % 1) * 10))}B`;
        } else if (isPercentage) {
            displayValue = `${displayValue}%`;
        }
        
        valueElement.textContent = displayValue;
        
        if (currentValue < numericValue) {
            requestAnimationFrame(updateCounter);
        } else {
            valueElement.textContent = finalValue; // Ensure final value is exact
        }
    }
    
    updateCounter();
}

// Timeline animation
function animateTimeline(element) {
    const items = element.parentElement.querySelectorAll('.timeline-item');
    items.forEach((item, index) => {
        setTimeout(() => {
            item.style.transform = 'translateY(0) scale(1)';
            item.style.opacity = '1';
        }, index * 200);
    });
}

// Enhanced parallax effects
function initParallaxEffects() {
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        
        // Hero background parallax
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            const speed = 0.5;
            heroBackground.style.transform = `translateY(${scrolled * speed}px)`;
        }
        
        // Floating elements parallax
        const floatingElements = document.querySelectorAll('.card-icon, .feature-icon, .impl-icon');
        floatingElements.forEach((element, index) => {
            const speed = 0.1 + (index % 3) * 0.05;
            const yPos = scrolled * speed;
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
}

// Tab switching functionality
function initTabSwitching() {
    const tabContainers = document.querySelectorAll('.code-tabs, .output-tabs');
    
    tabContainers.forEach(container => {
        const buttons = container.querySelectorAll('.tab-button');
        const contents = container.querySelectorAll('.tab-content');
        
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');
                
                // Remove active class from all buttons and contents
                buttons.forEach(btn => btn.classList.remove('active'));
                contents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button and corresponding content
                button.classList.add('active');
                const targetContent = container.querySelector(`[data-tab="${targetTab}"]`);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
                
                // Animate tab switch
                targetContent.style.opacity = '0';
                targetContent.style.transform = 'translateX(20px)';
                
                setTimeout(() => {
                    targetContent.style.opacity = '1';
                    targetContent.style.transform = 'translateX(0)';
                }, 100);
            });
        });
    });
}

// Copy button functionality with enhanced feedback
function initCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-button');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const codeBlock = button.closest('.code-showcase').querySelector('code');
            if (!codeBlock) return;
            
            try {
                await navigator.clipboard.writeText(codeBlock.textContent);
                
                // Visual feedback
                const originalText = button.textContent;
                const originalBg = button.style.background;
                
                button.textContent = '✅ Copied!';
                button.style.background = '#10b981';
                button.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = originalBg;
                    button.style.transform = 'scale(1)';
                }, 2000);
                
            } catch (err) {
                console.error('Failed to copy: ', err);
                button.textContent = '❌ Failed';
                setTimeout(() => {
                    button.textContent = '📋 Copy';
                }, 2000);
            }
        });
    });
}

// Enhanced smooth scrolling with easing
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                const startPosition = window.pageYOffset;
                const distance = offsetTop - startPosition;
                const duration = 1000; // 1 second
                let start = null;
                
                function easeInOutCubic(t) {
                    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
                }
                
                function animateScroll(timestamp) {
                    if (!start) start = timestamp;
                    const progress = Math.min((timestamp - start) / duration, 1);
                    const ease = easeInOutCubic(progress);
                    
                    window.scrollTo(0, startPosition + distance * ease);
                    
                    if (progress < 1) {
                        requestAnimationFrame(animateScroll);
                    }
                }
                
                requestAnimationFrame(animateScroll);
                
                // Add pulse effect to target element
                targetElement.style.animation = 'pulse 0.5s ease-in-out';
                setTimeout(() => {
                    targetElement.style.animation = '';
                }, 500);
            }
        });
    });
}

// Active navigation highlighting with smooth transitions
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    function highlightNavigation() {
        let current = '';
        const scrollPosition = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    }

    // Throttle the scroll event
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(highlightNavigation);
            ticking = true;
        }
    }

    window.addEventListener('scroll', () => {
        requestTick();
        ticking = false;
    }, { passive: true });
}

// Loading animation with fade-in effect
function initLoadingAnimation() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    // Simulate loading time for dramatic effect
    setTimeout(() => {
        document.body.style.opacity = '1';
        
        // Trigger hero animations
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroButtons = document.querySelector('.hero-buttons');
        
        if (heroTitle) heroTitle.style.animationDelay = '0.2s';
        if (heroSubtitle) heroSubtitle.style.animationDelay = '0.4s';
        if (heroButtons) heroButtons.style.animationDelay = '0.6s';
    }, 200);
}

// Enhanced hover effects with performance optimization
function initHoverEffects() {
    // Card hover effects
    const cards = document.querySelectorAll(`
        .explanation-card, 
        .impact-card, 
        .use-case, 
        .aspect-card,
        .metric-card,
        .timeline-item,
        .feature-detailed,
        .impl-item,
        .segment-card,
        .impact-dimension
    `);
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.4)';
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
            this.style.zIndex = '';
        });
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('.btn, .tab-button, .copy-button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-2px)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Tag hover effects
    const tags = document.querySelectorAll('.tag, .stat, .metric');
    tags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Typing animation for code blocks with realistic timing
function initTypingAnimation() {
    const codeElements = document.querySelectorAll('pre code');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const codeElement = entry.target;
                const originalText = codeElement.textContent;
                
                // Only animate if not already animated
                if (!codeElement.dataset.animated) {
                    codeElement.dataset.animated = 'true';
                    codeElement.textContent = '';
                    
                    typeText(codeElement, originalText, 30); // Faster typing
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    codeElements.forEach(el => observer.observe(el));
}

function typeText(element, text, speed) {
    let i = 0;
    const lines = text.split('\n');
    let currentLine = 0;
    let currentChar = 0;
    
    function typeChar() {
        if (currentLine < lines.length) {
            if (currentChar < lines[currentLine].length) {
                element.textContent += lines[currentLine][currentChar];
                currentChar++;
                
                // Variable speed based on character type
                let nextSpeed = speed;
                if (lines[currentLine][currentChar - 1] === ' ') nextSpeed = speed * 0.5;
                if (lines[currentLine][currentChar - 1] === '\n') nextSpeed = speed * 2;
                
                setTimeout(typeChar, nextSpeed);
            } else {
                // End of line
                if (currentLine < lines.length - 1) {
                    element.textContent += '\n';
                }
                currentLine++;
                currentChar = 0;
                setTimeout(typeChar, speed * 3); // Pause between lines
            }
        }
    }
    
    typeChar();
}

// Pulse animation for key elements
function addPulseAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
            70% { box-shadow: 0 0 0 20px rgba(59, 130, 246, 0); }
            100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .nav-links a.active {
            color: var(--accent-blue) !important;
            position: relative;
        }
        
        .nav-links a.active::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 100%;
            height: 2px;
            background: var(--accent-gradient);
            border-radius: 1px;
            animation: slideIn 0.3s ease-out;
        }
        
        @keyframes slideIn {
            from {
                width: 0;
                opacity: 0;
            }
            to {
                width: 100%;
                opacity: 1;
            }
        }
        
        .hero-title, .hero-subtitle, .hero-buttons {
            animation-fill-mode: both;
        }
    `;
    document.head.appendChild(style);
}

// Intersection Observer for performance monitoring
function initPerformanceMonitoring() {
    if ('IntersectionObserver' in window) {
        console.log('✅ IntersectionObserver supported - smooth animations enabled');
    } else {
        console.log('⚠️ IntersectionObserver not supported - falling back to basic animations');
    }
    
    // Monitor performance
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`⚡ Page loaded in ${loadTime}ms`);
        });
    }
}

// Initialize performance monitoring and styles
addPulseAnimation();
initPerformanceMonitoring();

// Keyboard shortcuts for power users
document.addEventListener('keydown', function(e) {
    // Press 'C' to copy code from active tab
    if (e.key === 'c' && e.ctrlKey) {
        const activeCodeBlock = document.querySelector('.tab-content.active code');
        if (activeCodeBlock && document.activeElement !== activeCodeBlock) {
            e.preventDefault();
            navigator.clipboard.writeText(activeCodeBlock.textContent);
            
            // Show notification
            const notification = document.createElement('div');
            notification.textContent = 'Code copied to clipboard!';
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--accent-blue);
                color: white;
                padding: 1rem;
                border-radius: 0.5rem;
                z-index: 9999;
                animation: slideInRight 0.3s ease-out;
            `;
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 2000);
        }
    }
});

// Optimize scroll performance with throttling
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Final console message
console.log(`
🚀 MCP & EarningsAgent Website Loaded Successfully!

Features initialized:
✅ Smooth scroll animations
✅ Interactive tabs
✅ Copy-to-clipboard functionality  
✅ Responsive navigation
✅ Performance optimizations
✅ Keyboard shortcuts (Ctrl+C to copy code)

Built with ❤️ to showcase the future of AI integration
`);