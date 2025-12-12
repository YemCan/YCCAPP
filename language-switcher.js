// language-switcher.js - SIMPLE WORKING VERSION

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
    
    // Update buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        const btnText = btn.textContent || btn.innerText;
        console.log('Button text:', btnText);
        
        if (isArabic) {
            // Arabic page - Arabic button should be active
            if (btnText.includes('العربية')) {
                btn.classList.add('active');
                btn.classList.remove('inactive');
            } else {
                btn.classList.remove('active');
                btn.classList.add('inactive');
            }
        } else {
            // English page - English button should be active
            if (btnText.includes('English')) {
                btn.classList.add('active');
                btn.classList.remove('inactive');
            } else {
                btn.classList.remove('active');
                btn.classList.add('inactive');
            }
        }
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== Language Switcher Initializing ===');
    
    // Update button states
    updateButtonStates();
    
    // Add click handlers to ALL language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        // Remove any existing click handlers
        btn.removeEventListener('click', handleLanguageClick);
        
        // Add new click handler
        btn.addEventListener('click', handleLanguageClick);
        
        console.log('Added click handler to button:', btn.textContent);
    });
    
    console.log('Language switcher ready!');
});

// Click handler function
function handleLanguageClick(event) {
    event.preventDefault();
    event.stopPropagation();
    
    const btn = event.currentTarget;
    const btnText = btn.textContent || btn.innerText;
    
    console.log('Button clicked:', btnText);
    
    if (btnText.includes('English') || btnText.includes('english')) {
        switchLanguage('en');
    } else if (btnText.includes('العربية') || btnText.includes('Arabic') || btnText.includes('arabic')) {
        switchLanguage('ar');
    } else {
        console.warn('Unknown button text:', btnText);
    }
    
    return false;
}

// Make function globally available
window.switchLanguage = switchLanguage;
window.updateButtonStates = updateButtonStates;
window.handleLanguageClick = handleLanguageClick;

console.log('=== Language Switcher Loaded Successfully ===');
console.log('switchLanguage function available:', typeof switchLanguage);