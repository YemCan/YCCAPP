// language-switcher.js - COMPLETE WORKING VERSION
console.log('=== Language Switcher Loading ===');

// Simple function to get current page name
function getCurrentPage() {
    // Get the current file name
    const path = window.location.pathname;
    const filename = path.split('/').pop();
    
    console.log('Current filename:', filename);
    
    // Handle index.html
    if (!filename || filename === '' || filename === 'index.html') {
        return 'index';
    }
    
    // Remove .html
    if (filename.endsWith('.html')) {
        return filename.replace('.html', '');
    }
    
    return filename;
}

// Main language switching function
function switchLanguage(lang) {
    console.log('=== SWITCH LANGUAGE CALLED ===');
    console.log('Requested language:', lang);
    
    // Save preference
    localStorage.setItem('preferredLang', lang);
    console.log('Saved language preference:', lang);
    
    // Get current page
    const currentPage = getCurrentPage();
    console.log('Current page name:', currentPage);
    
    // Check if we're in Arabic or English folder
    const currentPath = window.location.href;
    console.log('Current full URL:', currentPath);
    
    // Determine if we need to go up one folder
    let prefix = '';
    if (currentPath.includes('/English/') || currentPath.includes('/Arabic/')) {
        prefix = '../';
    }
    
    // Build new URL
    let newUrl = '';
    
    if (lang === 'ar') {
        // Switching to Arabic
        newUrl = `${prefix}Arabic/${currentPage}.html`;
    } else {
        // Switching to English
        newUrl = `${prefix}English/${currentPage}.html`;
    }
    
    console.log('Redirecting to:', newUrl);
    
    // Redirect
    window.location.href = newUrl;
}

// Update button active states
function updateButtonStates() {
    console.log('Updating button states...');
    
    // Check current language
    const isArabic = document.documentElement.lang === 'ar' || 
                     window.location.href.includes('/Arabic/');
    
    console.log('Is Arabic page?', isArabic);
    
    // Update buttons - HANDLES BOTH .lang-btn AND .lang-switch-btn
    document.querySelectorAll('.lang-btn, .lang-switch-btn').forEach(btn => {
        const btnText = btn.textContent || btn.innerText;
        const lang = btn.getAttribute('data-lang');
        
        console.log('Button found:', btnText, 'data-lang:', lang, 'class:', btn.className);
        
        // Determine language from data-lang attribute or button text
        let buttonLang = lang;
        if (!buttonLang) {
            if (btnText.includes('English') || btnText.includes('english') || btnText.includes('EN')) {
                buttonLang = 'en';
            } else if (btnText.includes('العربية') || btnText.includes('Arabic') || btnText.includes('arabic') || btnText.includes('AR')) {
                buttonLang = 'ar';
            }
        }
        
        // Update active state
        if (buttonLang) {
            if ((buttonLang === 'ar' && isArabic) || (buttonLang === 'en' && !isArabic)) {
                btn.classList.add('active');
                btn.classList.remove('inactive');
                console.log('Button marked active:', btnText);
            } else {
                btn.classList.remove('active');
                btn.classList.add('inactive');
                console.log('Button marked inactive:', btnText);
            }
        }
    });
}

// Click handler function for ALL language buttons
function handleLanguageClick(event) {
    event.preventDefault();
    event.stopPropagation();
    
    const btn = event.currentTarget;
    const btnText = btn.textContent || btn.innerText;
    const lang = btn.getAttribute('data-lang');
    
    console.log('Button clicked:', btnText, 'data-lang:', lang);
    
    let targetLang = lang;
    
    // If no data-lang attribute, determine from text
    if (!targetLang) {
        if (btnText.includes('English') || btnText.includes('english') || btnText.includes('EN')) {
            targetLang = 'en';
        } else if (btnText.includes('العربية') || btnText.includes('Arabic') || btnText.includes('arabic') || btnText.includes('AR')) {
            targetLang = 'ar';
        }
    }
    
    if (targetLang && typeof switchLanguage === 'function') {
        console.log('Switching to language:', targetLang);
        switchLanguage(targetLang);
    } else {
        console.warn('Could not determine language for button:', btnText);
    }
    
    return false;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== Language Switcher Initializing ===');
    
    // Update button states
    updateButtonStates();
    
    // Add click handlers to ALL language buttons (both .lang-btn AND .lang-switch-btn)
    document.querySelectorAll('.lang-btn, .lang-switch-btn').forEach(btn => {
        // Remove any existing click handlers
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        
        // Add new click handler
        newBtn.addEventListener('click', handleLanguageClick);
        
        console.log('Added click handler to button:', newBtn.textContent);
    });
    
    // Also handle anchor tags specifically
    document.querySelectorAll('a.lang-switch-btn').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const lang = this.getAttribute('data-lang');
            if (lang && typeof switchLanguage === 'function') {
                console.log('Anchor click detected, switching to:', lang);
                switchLanguage(lang);
            }
            return false;
        });
    });
    
    console.log('Language switcher ready!');
});

// Make functions globally available
window.switchLanguage = switchLanguage;
window.updateButtonStates = updateButtonStates;
window.handleLanguageClick = handleLanguageClick;

console.log('=== Language Switcher Loaded Successfully ===');
console.log('switchLanguage function available:', typeof switchLanguage);
console.log('Buttons on page:', document.querySelectorAll('.lang-btn, .lang-switch-btn').length);