// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
        });

        // Close menu when clicking on a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                mobileMenuToggle.textContent = '☰';
            });
        });
    }

    // Smooth scroll for anchor links
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

    // Gallery image lightbox (simple version)
    const galleryItems = document.querySelectorAll('.gallery-item img, .realisation-card img');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const lightbox = document.createElement('div');
            lightbox.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.9);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
                cursor: pointer;
            `;
            
            const img = document.createElement('img');
            img.src = this.src;
            img.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                object-fit: contain;
            `;
            
            lightbox.appendChild(img);
            document.body.appendChild(lightbox);
            
            lightbox.addEventListener('click', function() {
                document.body.removeChild(lightbox);
            });
        });
    });

    // Form validation enhancement
    const form = document.querySelector('form[name="devis"]');
    if (form) {
        form.addEventListener('submit', function(e) {
            const fileInput = document.getElementById('image');
            if (fileInput && fileInput.files.length > 0) {
                const fileSize = fileInput.files[0].size / 1024 / 1024; // Convert to MB
                if (fileSize > 15) {
                    e.preventDefault();
                    alert('Le fichier est trop volumineux. Taille maximale : 15 Mo');
                    return false;
                }
            }
        });
    }
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
    
    lastScroll = currentScroll;
});
