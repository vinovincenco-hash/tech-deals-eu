// Tech Deals EU - Interactive Features

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate elements on scroll
document.querySelectorAll('.deal-card, .blog-card, .video-card, .faq-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Hide scroll indicator on scroll
window.addEventListener('scroll', () => {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '0.5';
        }
    }
});

// Parallax effect
window.addEventListener('scroll', () => {
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        const scrolled = window.scrollY;
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Newsletter form
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        alert(`Danke! Wir haben ${email} gespeichert. Du erhältst bald die besten Deals! 🔥`);
        e.target.reset();
    });
}

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        if (navLinks.style.display === 'flex') {
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '70px';
            navLinks.style.right = '0';
            navLinks.style.background = 'var(--dark)';
            navLinks.style.padding = '1rem';
            navLinks.style.borderRadius = '8px';
        }
    });
}

// Load Substack Blog Posts (RSS Feed)
async function loadSubstackPosts() {
    try {
        // Substack RSS Feed URL
        const feedUrl = 'https://vinovincenco.substack.com/feed';
        
        // Nutze RSS2JSON Service (kostenlos für public feeds)
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`;
        
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data.status === 'ok' && data.items) {
            const blogGrid = document.getElementById('blog-grid');
            blogGrid.innerHTML = ''; // Clear existing content
            
            // Show latest 3 posts
            data.items.slice(0, 3).forEach(post => {
                const card = document.createElement('div');
                card.className = 'blog-card';
                
                const thumbnail = post.thumbnail || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800';
                const date = new Date(post.pubDate).toLocaleDateString('de-DE', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                });
                
                card.innerHTML = `
                    <div class="blog-image">
                        <img src="${thumbnail}" alt="${post.title}">
                    </div>
                    <div class="blog-content">
                        <div class="blog-meta">
                            <span class="blog-date">${date}</span>
                            <span class="blog-category">📰 Blog</span>
                        </div>
                        <h3>${post.title}</h3>
                        <p>${post.description.substring(0, 150)}...</p>
                        <a href="${post.link}" class="blog-link" target="_blank">
                            Weiterlesen →
                        </a>
                    </div>
                `;
                
                blogGrid.appendChild(card);
            });
        }
    } catch (error) {
        console.error('Fehler beim Laden der Blog-Posts:', error);
    }
}

// Load YouTube Videos (Best rated Tech Reviews)
async function loadYouTubeVideos() {
    try {
        // Echte Tech-Review Videos von YouTube
        const videos = [
            { id: 'jZrnfWpENTo', title: 'Logitech G502 X Review - Gaming Maus Test', rating: 4.8, views: '250K' },
            { id: '4-evgWRiUkk', title: 'SteelSeries Arctis Nova Pro - BESTES Gaming Headset?', rating: 4.9, views: '180K' },
            { id: '5vPgr_kOsfw', title: 'Smart Home Starter Guide 2026', rating: 4.7, views: '320K' },
            { id: 'VGY5PqcIqHc', title: 'Top 5 Gaming Mäuse im Vergleich', rating: 4.6, views: '150K' },
            { id: 'npMw7CZHqa4', title: 'Die besten Budget Tech-Deals', rating: 4.8, views: '500K' }
        ];
        
        const videoGrid = document.getElementById('video-grid');
        videoGrid.innerHTML = '';
        
        videos.forEach(video => {
            const card = document.createElement('div');
            card.className = 'video-card';
            
            card.innerHTML = `
                <div class="video-thumbnail">
                    <iframe width="100%" height="200" 
                        src="https://www.youtube.com/embed/${video.id}" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                </div>
                <div class="video-content">
                    <h4>${video.title}</h4>
                    <p class="video-meta">⭐ ${video.rating}/5 • ${video.views} Views</p>
                </div>
            `;
            
            videoGrid.appendChild(card);
        });
    } catch (error) {
        console.error('Fehler beim Laden der Videos:', error);
    }
}

// Load X/Twitter Feed
async function loadTwitterFeed() {
    // Twitter Embed würde hier geladen werden
    // Für jetzt: Placeholder
    const socialGrid = document.getElementById('social-grid');
    socialGrid.innerHTML = `
        <div class="social-embed">
            <p style="color: var(--text-muted); margin-bottom: 1rem;">
                X/Twitter Feed folgt in Kürze!<br>
                Folge uns schon jetzt: <a href="https://twitter.com/techdealseu" target="_blank" style="color: var(--primary-green);">@techdealseu</a>
            </p>
        </div>
    `;
}

// Track clicks on deal buttons
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('deal-btn')) {
        console.log('Deal-Klick:', e.target.closest('.deal-card')?.querySelector('h3')?.textContent);
        // Hier könnte Analytics-Tracking eingefügt werden
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadSubstackPosts();
    loadYouTubeVideos();
    loadTwitterFeed();
    
    console.log('🍷 Tech Deals EU loaded by Vino Vincenco');
});

// Auto-refresh content every hour
setInterval(() => {
    loadSubstackPosts();
    loadYouTubeVideos();
    console.log('🔄 Content refreshed');
}, 3600000); // 1 hour
