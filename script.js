document.addEventListener('DOMContentLoaded', function() {

    // ─── Custom Cursor ───────────────────────────────────────────
    const cursor   = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.custom-cursor-follower');

    let mouseX = 0, mouseY = 0, isMouseMoving = false;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (!isMouseMoving) {
            isMouseMoving = true;
            requestAnimationFrame(() => {
                if (cursor)   { cursor.style.left   = mouseX + 'px'; cursor.style.top   = mouseY + 'px'; }
                if (follower) { follower.style.left  = mouseX + 'px'; follower.style.top = mouseY + 'px'; }

                // Hero Parallax
                const heroBg = document.querySelector('.hero-parallax-bg');
                if (heroBg) {
                    const moveX = (mouseX - window.innerWidth  / 2) * 0.01;
                    const moveY = (mouseY - window.innerHeight / 2) * 0.01;
                    heroBg.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) scale(1.05)`;
                }
                isMouseMoving = false;
            });
        }
    });

    // Cursor hover states
    document.querySelectorAll('a, button, .portfolio-item, .service-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (cursor)   { cursor.style.width = '30px';   cursor.style.height = '30px';   cursor.style.background = 'rgba(181,157,123,0.8)'; }
            if (follower) { follower.style.width = '55px'; follower.style.height = '55px'; }
        });
        el.addEventListener('mouseleave', () => {
            if (cursor)   { cursor.style.width = '14px';   cursor.style.height = '14px';   cursor.style.background = 'var(--secondary-color)'; }
            if (follower) { follower.style.width = '36px'; follower.style.height = '36px'; }
        });
    });

    // ─── Preloader ───────────────────────────────────────────────
    const preloader  = document.getElementById('preloader');
    const heroImage  = document.querySelector('.hero-image');
    const viewfinder = document.querySelector('.camera-viewfinder');
    const flash      = document.querySelector('.shutter-flash');

    function dismissPreloader() {
        if (!preloader) return;
        preloader.style.transition = 'opacity 0.6s ease';
        preloader.style.opacity    = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
            if (heroImage) {
                heroImage.classList.add('initial-blur');
                setTimeout(() => {
                    if (viewfinder) viewfinder.classList.add('active');
                    setTimeout(() => {
                        if (flash) flash.classList.add('flash-snap');
                        setTimeout(() => {
                            heroImage.classList.remove('initial-blur');
                            heroImage.classList.add('focused');
                            if (viewfinder) viewfinder.classList.remove('active');
                            setTimeout(() => { if (flash) flash.classList.remove('flash-snap'); }, 300);
                        }, 50);
                    }, 800);
                }, 300);
            }
        }, 600);
    }

    // Always dismiss within 3s even if load event never fires
    const preloaderFallback = setTimeout(dismissPreloader, 3000);
    window.addEventListener('load', () => {
        clearTimeout(preloaderFallback);
        setTimeout(dismissPreloader, 600);
    });

    // ─── AOS ─────────────────────────────────────────────────────
    AOS.init({
        duration: 1200,
        easing: 'ease-out-quint',
        once: true,
        mirror: false,
        anchorPlacement: 'top-bottom'
    });


    // ─── Navbar scroll effect ────────────────────────────────────
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

    // ─── Contact Form (Floral Bloom & Success Popup) ──────────────
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');
    const closeModal = document.getElementById('closeModal');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = this.querySelector('.btn-bloom');
            
            // Start submission animation
            btn.classList.add('submitting');
            btn.disabled = true;
            
            setTimeout(() => {
                // Show blooming success modal
                if (successModal) {
                    successModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
                
                // Reset button and form
                setTimeout(() => {
                    btn.classList.remove('submitting');
                    btn.disabled = false;
                    contactForm.reset();
                }, 1000);
            }, 800); // Wait for the button bloom effect to swell
        });
    }

    if (closeModal && successModal) {
        closeModal.addEventListener('click', () => {
            successModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        
        // Close on outside click
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                successModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // ─── Portfolio Lightbox ───────────────────────────────────────
    const lightbox         = document.getElementById('portfolioLightbox');
    const lightboxImg      = document.getElementById('lightboxImg');
    const closeLightbox    = document.querySelector('.close-lightbox');
    const lightboxVF       = document.querySelector('.lightbox-camera-viewfinder');
    const lightboxFlash    = document.querySelector('.lightbox-shutter-flash');

    if (lightbox && lightboxImg) {
        document.querySelectorAll('.portfolio-item').forEach(item => {
            item.addEventListener('click', () => {
                const imgSrc = item.querySelector('img').getAttribute('src');
                lightboxImg.src = imgSrc;
                lightboxImg.classList.add('initial-blur');
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';

                setTimeout(() => {
                    if (lightboxVF) lightboxVF.classList.add('active');
                    setTimeout(() => {
                        if (lightboxFlash) lightboxFlash.classList.add('flash-snap');
                        setTimeout(() => {
                            lightboxImg.classList.remove('initial-blur');
                            if (lightboxVF) lightboxVF.classList.remove('active');
                            setTimeout(() => { if (lightboxFlash) lightboxFlash.classList.remove('flash-snap'); }, 500);
                        }, 50);
                    }, 1000);
                }, 500);
            });
        });

        const closeFn = () => {
            lightbox.classList.remove('active');
            lightboxImg.src = '';
            lightboxImg.classList.remove('initial-blur');
            if (lightboxVF) lightboxVF.classList.remove('active');
            document.body.style.overflow = 'auto';
        };

        if (closeLightbox) closeLightbox.addEventListener('click', closeFn);
        lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeFn(); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && lightbox.classList.contains('active')) closeFn(); });
    }

    // ─── Smooth scroll for anchor links ──────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

}); // end DOMContentLoaded
