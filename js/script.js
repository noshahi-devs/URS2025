// ========================================
// URS MUBARAK - JAVASCRIPT
// Interactive Features & Animations
// ========================================

// ========== GLOBAL VARIABLES ==========
let currentImageIndex = 0;
let galleryImages = [];

// ========== DOM CONTENT LOADED ==========
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initNavbar();
    initScrollTop();
    initCountdown();
    initGallery();
    initContactForm();
    initFAQ();
    initScrollAnimations();
});

// ========== NAVBAR FUNCTIONALITY ==========
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    // Sticky navbar on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 4px 20px rgba(5, 90, 53, 0.3)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(5, 90, 53, 0.1)';
        }
    });
    
    // Mobile menu toggle
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = menuToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(10px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ========== SCROLL TO TOP BUTTON ==========
function initScrollTop() {
    const scrollTopBtn = document.getElementById('scrollTop');
    
    if (scrollTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        
        // Scroll to top on click
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ========== COUNTDOWN TIMER ==========
function initCountdown() {
    const countdownElement = document.getElementById('countdown');
    
    if (countdownElement) {
        // Set the target date (October 16, 2025)
        const targetDate = new Date('2025-10-16T00:00:00').getTime();
        
        // Update countdown every second
        const countdownInterval = setInterval(function() {
            const now = new Date().getTime();
            const distance = targetDate - now;
            
            // Calculate time units
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Update DOM elements
            const daysEl = document.getElementById('days');
            const hoursEl = document.getElementById('hours');
            const minutesEl = document.getElementById('minutes');
            const secondsEl = document.getElementById('seconds');
            
            if (daysEl) daysEl.textContent = formatNumber(days);
            if (hoursEl) hoursEl.textContent = formatNumber(hours);
            if (minutesEl) minutesEl.textContent = formatNumber(minutes);
            if (secondsEl) secondsEl.textContent = formatNumber(seconds);
            
            // If countdown is finished
            if (distance < 0) {
                clearInterval(countdownInterval);
                if (daysEl) daysEl.textContent = '00';
                if (hoursEl) hoursEl.textContent = '00';
                if (minutesEl) minutesEl.textContent = '00';
                if (secondsEl) secondsEl.textContent = '00';
            }
        }, 1000);
    }
}

// Format number to always show 2 digits
function formatNumber(num) {
    return num < 10 ? '0' + num : num;
}

// ========== GALLERY FUNCTIONALITY ==========
function initGallery() {
    // Gallery filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // Filter gallery items
                galleryItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Gallery modal
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const modalClose = document.getElementById('modalClose');
    const modalPrev = document.getElementById('modalPrev');
    const modalNext = document.getElementById('modalNext');
    
    if (modal && galleryItems.length > 0) {
        // Store all gallery images
        galleryImages = Array.from(galleryItems);
        
        // Open modal on image click
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', function() {
                currentImageIndex = index;
                openModal(this);
            });
        });
        
        // Close modal
        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }
        
        // Close modal on background click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Previous image
        if (modalPrev) {
            modalPrev.addEventListener('click', function(e) {
                e.stopPropagation();
                showPreviousImage();
            });
        }
        
        // Next image
        if (modalNext) {
            modalNext.addEventListener('click', function(e) {
                e.stopPropagation();
                showNextImage();
            });
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (modal.classList.contains('active')) {
                if (e.key === 'Escape') {
                    closeModal();
                } else if (e.key === 'ArrowLeft') {
                    showNextImage(); // RTL: left arrow goes to next
                } else if (e.key === 'ArrowRight') {
                    showPreviousImage(); // RTL: right arrow goes to previous
                }
            }
        });
    }
}

function openModal(item) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    
    if (modal && modalImg) {
        const img = item.querySelector('img');
        const overlay = item.querySelector('.gallery-overlay');
        
        modal.classList.add('active');
        modalImg.src = img.src;
        
        if (modalCaption && overlay) {
            const title = overlay.querySelector('h3');
            const desc = overlay.querySelector('p');
            modalCaption.textContent = title ? title.textContent : '';
            if (desc) {
                modalCaption.textContent += ' - ' + desc.textContent;
            }
        }
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function showPreviousImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    openModal(galleryImages[currentImageIndex]);
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    openModal(galleryImages[currentImageIndex]);
}

// ========== CONTACT FORM ==========
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Validate form
            if (!name || !email || !subject || !message) {
                alert('براہ کرم تمام ضروری فیلڈز پُر کریں');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('براہ کرم درست ای میل درج کریں');
                return;
            }
            
            // Show success message
            alert('آپ کا پیغام موصول ہو گیا ہے۔ جزاک اللہ!\n\nہم جلد ہی آپ سے رابطہ کریں گے۔');
            
            // Reset form
            contactForm.reset();
            
            // In a real application, you would send this data to a server
            console.log('Form submitted:', {
                name,
                email,
                phone,
                subject,
                message
            });
        });
        
        // Real-time validation
        const emailInput = document.getElementById('email');
        if (emailInput) {
            emailInput.addEventListener('blur', function() {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (this.value && !emailRegex.test(this.value)) {
                    this.style.borderColor = '#ff6b6b';
                } else {
                    this.style.borderColor = '#ddd';
                }
            });
        }
    }
}

// ========== FAQ ACCORDION ==========
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function() {
                // Close other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });
}

// ========== SCROLL ANIMATIONS ==========
function initScrollAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animatedElements = document.querySelectorAll(`
        .info-card,
        .teaching-card,
        .facility-card,
        .guest-card,
        .gallery-item,
        .timeline-item,
        .menu-card,
        .volunteer-card
    `);
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ========== COUNTER ANIMATION ==========
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Animate counters when they come into view
const statNumbers = document.querySelectorAll('.stat-number');
if (statNumbers.length > 0) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                const target = parseInt(entry.target.textContent.replace(/[^0-9]/g, ''));
                animateCounter(entry.target, target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => statsObserver.observe(stat));
}

// ========== IMAGE LAZY LOADING ==========
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
initLazyLoading();

// ========== PRELOADER (Optional) ==========
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// ========== UTILITY FUNCTIONS ==========

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
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
    };
}

// ========== PERFORMANCE OPTIMIZATIONS ==========

// Optimize scroll events
window.addEventListener('scroll', throttle(function() {
    // Scroll-based animations can be added here
}, 100));

// ========== ACCESSIBILITY ENHANCEMENTS ==========

// Focus trap for modal
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// Apply focus trap to modal
const modal = document.getElementById('imageModal');
if (modal) {
    trapFocus(modal);
}

// ========== PRINT FUNCTIONALITY ==========
function printPage() {
    window.print();
}

// ========== SHARE FUNCTIONALITY ==========
function shareOnSocialMedia(platform) {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    
    let shareUrl;
    
    switch(platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${title}%20${url}`;
            break;
        default:
            return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
}

// ========== CONSOLE MESSAGE ==========
console.log('%c🌙 عرس مبارک', 'font-size: 24px; color: #055a35; font-weight: bold;');
console.log('%cحضرت داتا گنج بخش علی ہجویریؒ کے عرسِ شریف میں خوش آمدید', 'font-size: 14px; color: #c9a21f;');
console.log('%cWebsite developed with ❤️ and ایمان', 'font-size: 12px; color: #666;');

// ========== ERROR HANDLING ==========
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
    // In production, you might want to send this to an error tracking service
});

// ========== SERVICE WORKER (Optional for PWA) ==========
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(reg => console.log('Service Worker registered'))
        //     .catch(err => console.log('Service Worker registration failed'));
    });
}

// ========== EXPORT FUNCTIONS (if using modules) ==========
// export { openModal, closeModal, shareOnSocialMedia, printPage };
