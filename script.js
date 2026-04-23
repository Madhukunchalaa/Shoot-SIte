document.addEventListener('DOMContentLoaded', function() {
    
    // Custom Cursor Logic
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.custom-cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate3d(${e.clientX - 10}px, ${e.clientY - 10}px, 0)`;
        follower.style.transform = `translate3d(${e.clientX - 20}px, ${e.clientY - 20}px, 0)`;

        // Hero Parallax Logic
        const heroBg = document.querySelector('.hero-parallax-bg');
        if (heroBg) {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
            heroBg.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) scale(1.05)`;
        }
    });

    // Cursor Hover States
    const interactiveElements = document.querySelectorAll('a, button, .portfolio-item, .service-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform += ' scale(2.5)';
            cursor.style.background = 'rgba(197, 160, 89, 0.5)';
            follower.style.transform += ' scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = cursor.style.transform.replace(' scale(2.5)', '');
            cursor.style.background = 'var(--secondary-color)';
            follower.style.transform = follower.style.transform.replace(' scale(1.5)', '');
        });
    });

    // Preloader & Camera Animation Sequence
    const preloader = document.getElementById('preloader');
    const heroImage = document.querySelector('.hero-image');
    const viewfinder = document.querySelector('.camera-viewfinder');
    const flash = document.querySelector('.shutter-flash');

    window.addEventListener('load', () => {
        // Prepare for animation
        heroImage.classList.add('initial-blur');

        setTimeout(() => {
            // 1. Hide Preloader
            preloader.style.opacity = '0';
            
            setTimeout(() => {
                preloader.style.display = 'none';
                
                // 2. Show Viewfinder
                setTimeout(() => {
                    viewfinder.classList.add('active');
                    
                    // 3. Shutter Snap & Focus
                    setTimeout(() => {
                        flash.classList.add('flash-snap');
                        
                        setTimeout(() => {
                            heroImage.classList.remove('initial-blur');
                            heroImage.classList.add('focused');
                            viewfinder.classList.remove('active');
                            
                            // Clean up flash class
                            setTimeout(() => {
                                flash.classList.remove('flash-snap');
                            }, 300);
                        }, 50); // Faster snap point
                    }, 800); // Faster focus time
                }, 300);
            }, 600);
        }, 1000);
    });

    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1200,
        easing: 'ease-out-quint',
        once: true,
        mirror: false,
        anchorPlacement: 'top-bottom'
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            if (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname === '') {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // Handle contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Premium feedback effect
            const btn = this.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'SENDING...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check me-2"></i> INQUIRY SENT';
                btn.classList.add('btn-gold');
                btn.classList.remove('btn-premium');
                contactForm.reset();
                
                alert('Thank you for your interest! We will contact you shortly to discuss your big day.');
                
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.disabled = false;
                    btn.classList.remove('btn-gold');
                    btn.classList.add('btn-premium');
                }, 3000);
            }, 1500);
        });
    }

    // Portfolio Lightbox Logic
    const lightbox = document.getElementById('portfolioLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeLightbox = document.querySelector('.close-lightbox');
    const lightboxViewfinder = document.querySelector('.lightbox-camera-viewfinder');
    const lightboxFlash = document.querySelector('.lightbox-shutter-flash');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').getAttribute('src');
            
            // 1. Open Lightbox & Set Image
            lightboxImg.src = imgSrc;
            lightboxImg.classList.add('initial-blur');
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scroll

            // 2. Trigger Camera Shoot Sequence
            setTimeout(() => {
                lightboxViewfinder.classList.add('active');
                
                setTimeout(() => {
                    lightboxFlash.classList.add('flash-snap');
                    
                    setTimeout(() => {
                        lightboxImg.classList.remove('initial-blur');
                        lightboxViewfinder.classList.remove('active');
                        
                        setTimeout(() => {
                            lightboxFlash.classList.remove('flash-snap');
                        }, 500);
                    }, 50); // Snap point
                }, 1000); // Focus time
            }, 500);
        });
    });

    // Close Lightbox
    const closeFn = () => {
        lightbox.classList.remove('active');
        lightboxImg.src = '';
        lightboxImg.classList.remove('initial-blur');
        lightboxViewfinder.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    closeLightbox.addEventListener('click', closeFn);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeFn();
    });

    // Handle ESC key to close lightbox
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) closeFn();
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
