// Menú móvil
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Cerrar menú al hacer clic en un enlace
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });

        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', function(event) {
            if (!menuToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
            }
        });
    }

    // Animación de scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Efecto parallax suave en headers
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.page-header, .hero');
        if (header) {
            const scrolled = window.pageYOffset;
            header.style.transform = 'translateY(' + (scrolled * 0.5) + 'px)';
        }
    });

    // Contador animado para stats
    const animateCounter = (element, target, duration) => {
        duration = duration || 2000;
        let current = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    };

    // Observador para animar contadores cuando sean visibles
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const text = stat.textContent;
                    const number = parseInt(text.replace(/\D/g, ''));
                    if (!isNaN(number) && number > 0) {
                        stat.textContent = '0';
                        animateCounter(stat, number);
                    }
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        observer.observe(statsSection);
    }

    // Efecto hover en tarjetas
    const cards = document.querySelectorAll('.hobby-card, .info-card, .gallery-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // Mensaje de bienvenida en consola
    console.log('%c¡Bienvenido a mi portafolio! 🎉', 'color: #667eea; font-size: 20px; font-weight: bold;');
    console.log('%cDiseñado con ❤️ y mucho café ☕', 'color: #764ba2; font-size: 14px;');

    // Easter egg: Konami Code
    let konamiCode = [];
    const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.key);
        konamiCode.splice(-konamiPattern.length - 1, konamiCode.length - konamiPattern.length);
        
        if (konamiCode.join('').includes(konamiPattern.join(''))) {
            document.body.style.animation = 'rainbow 2s linear infinite';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 5000);
            alert('🎮 ¡Código Konami activado! ¡Eres un verdadero gamer!');
        }
    });

    // Animación rainbow para el easter egg
    const style = document.createElement('style');
    style.textContent = '@keyframes rainbow { 0% { filter: hue-rotate(0deg); } 100% { filter: hue-rotate(360deg); } }';
    document.head.appendChild(style);

    // Cambio de tema día/noche (opcional)
    let darkMode = false;
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'd') {
            e.preventDefault();
            darkMode = !darkMode;
            document.body.style.filter = darkMode ? 'invert(1) hue-rotate(180deg)' : '';
        }
    });

    // Efecto de escritura en el título principal
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 500);
    }

    // Añadir efecto de partículas en el fondo (sutil)
    createParticles();
});

// Función para crear partículas decorativas
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: -1;';
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 10 + 5;
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const opacity = Math.random() * 0.3;
        const duration = Math.random() * 10 + 10;
        
        particle.style.cssText = 'position: absolute; width: ' + size + 'px; height: ' + size + 'px; background: rgba(102, 126, 234, ' + opacity + '); border-radius: 50%; top: ' + top + '%; left: ' + left + '%; animation: float ' + duration + 's infinite ease-in-out;';
        particlesContainer.appendChild(particle);
    }

    const floatAnimation = document.createElement('style');
    floatAnimation.textContent = '@keyframes float { 0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; } 50% { transform: translateY(-50px) translateX(50px); opacity: 0.6; } }';
    document.head.appendChild(floatAnimation);
}

// Función para mostrar tooltip personalizado
function createTooltip(element, text) {
    element.addEventListener('mouseenter', function(e) {
        const tooltip = document.createElement('div');
        tooltip.textContent = text;
        tooltip.style.cssText = 'position: absolute; background: #333; color: white; padding: 8px 12px; border-radius: 6px; font-size: 14px; z-index: 1000; pointer-events: none; white-space: nowrap;';
        document.body.appendChild(tooltip);
        
        const rect = element.getBoundingClientRect();
        tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
        tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
        
        element.addEventListener('mouseleave', function() {
            tooltip.remove();
        }, { once: true });
    });
}

// Aplicar tooltips a elementos específicos
document.querySelectorAll('.hobby-card').forEach((card, index) => {
    const titles = ['Explora mi música', 'Descubre mis lecturas', 'Descubre mi pasión por el fútbol', 'Conoce mis juegos'];
    createTooltip(card, titles[index] || 'Haz clic para ver más');
});

// Función para guardar preferencias del usuario
function savePreference(key, value) {
    try {
        const preferences = {};
        preferences[key] = value;
        console.log('Preferencia guardada:', preferences);
    } catch (e) {
        console.log('No se pudo guardar la preferencia');
    }
}

// Detectar tiempo en la página
let timeOnPage = 0;
setInterval(() => {
    timeOnPage++;
    if (timeOnPage % 60 === 0) {
        console.log('Has estado explorando por ' + (timeOnPage / 60) + ' minuto(s)');
    }
}, 1000);

// Mensaje de despedida al salir
window.addEventListener('beforeunload', function(e) {
    console.log('¡Gracias por visitar mi portafolio! 👋');
});

console.log('✅ JavaScript cargado correctamente');