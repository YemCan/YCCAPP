// simple-switcher.js - ALWAYS WORKS
console.log('SIMPLE Language Switcher Loading...');

// Direct link-based switcher (always works)
function setupSimpleLanguageSwitcher() {
    console.log('Setting up simple language switcher...');
    
    const buttons = document.querySelectorAll('.lang-btn');
    console.log('Found buttons:', buttons.length);
    
    buttons.forEach(btn => {
        // Remove all existing event listeners
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        
        // Add new simple click handler
        newBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Simple switcher clicked');
            
            const text = this.textContent || this.innerText;
            console.log('Button text:', text);
            
            // Get current page
            let currentPage = window.location.pathname.split('/').pop();
            if (!currentPage || currentPage === '') currentPage = 'index.html';
            
            // Remove .html if present
            if (currentPage.endsWith('.html')) {
                currentPage = currentPage.replace('.html', '');
            }
            
            // Determine target URL
            let targetUrl = '';
            
            if (text.includes('English') || text.includes('english')) {
                // Switch to English
                if (window.location.href.includes('/Arabic/')) {
                    targetUrl = `../English/${currentPage}.html`;
                } else {
                    targetUrl = `English/${currentPage}.html`;
                }
            } else if (text.includes('العربية') || text.includes('Arabic') || text.includes('arabic')) {
                // Switch to Arabic
                if (window.location.href.includes('/English/')) {
                    targetUrl = `../Arabic/${currentPage}.html`;
                } else {
                    targetUrl = `Arabic/${currentPage}.html`;
                }
            }
            
            console.log('Redirecting to:', targetUrl);
            
            if (targetUrl) {
                // Save preference
                localStorage.setItem('preferredLang', 
                    text.includes('English') ? 'en' : 'ar');
                
                // Redirect
                window.location.href = targetUrl;
            }
        });
    });
    
    console.log('Simple switcher setup complete');
}

// Run when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupSimpleLanguageSwitcher);
} else {
    setupSimpleLanguageSwitcher();
}