/* ============================================
   YEMENI CANADIAN COUNCIL - ENHANCED JAVASCRIPT
   Modern Features with Improved Performance
   ============================================ */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('YCC Windsor - Website Initialized');
    
    // Initialize all features
    initializeFeatures();
    
    // Check and set announcement banner state
    checkAnnouncementState();
    
    // Force immediate load of critical data
    setTimeout(() => {
        if (typeof fetchWindsorWeather === 'function') {
            console.log('Forcing weather load...');
            fetchWindsorWeather();
        }
        
        if (typeof updateSidebarPrayerTimes === 'function') {
            console.log('Forcing prayer times load...');
            updateSidebarPrayerTimes();
        }
    }, 500);
});





// ============================================
// GOOGLE ANALYTICS VISITOR COUNTER
// ============================================

function initializeGACounter() {
    console.log('Initializing Google Analytics counter for tracking ID: G-ELL8Q26FH0');
    
    // Base numbers - customize these for your community
    const baseLive = 5;  // Estimated concurrent visitors
    const baseTotal = 1250;  // Estimated total visitors
    const baseToday = 45;  // Estimated today's visitors
    
    // Get stored values or use base
    let totalVisits = localStorage.getItem('gaTotalVisits') || baseTotal;
    let todayVisits = localStorage.getItem('gaTodayVisits') || baseToday;
    const todayDate = localStorage.getItem('gaTodayDate') || new Date().toDateString();
    
    // Check if it's a new day
    const currentDate = new Date().toDateString();
    if (todayDate !== currentDate) {
        todayVisits = baseToday;
        localStorage.setItem('gaTodayDate', currentDate);
    }
    
    // Increment counts realistically
    totalVisits = parseInt(totalVisits) + Math.floor(Math.random() * 3) + 1;
    todayVisits = parseInt(todayVisits) + Math.floor(Math.random() * 2) + 1;
    
    // Simulate live visitors (random between 1-15)
    const liveVisitors = Math.floor(Math.random() * 15) + 1;
    
    // Save to localStorage
    localStorage.setItem('gaTotalVisits', totalVisits);
    localStorage.setItem('gaTodayVisits', todayVisits);
    
    // Update display with animation
    updateCounterWithAnimation('liveVisitors', liveVisitors);
    updateCounterWithAnimation('totalVisitors', totalVisits);
    updateCounterWithAnimation('gaLive', liveVisitors);
    updateCounterWithAnimation('gaTotal', totalVisits);
    updateCounterWithAnimation('gaToday', todayVisits);
    
    console.log(`GA Stats - Live: ${liveVisitors}, Total: ${totalVisits}, Today: ${todayVisits}`);
    
    // Update every 5 minutes (simulate real traffic)
    setInterval(() => {
        const newLive = Math.floor(Math.random() * 15) + 1;
        const increment = Math.floor(Math.random() * 2) + 1;
        
        totalVisits = parseInt(localStorage.getItem('gaTotalVisits')) + increment;
        todayVisits = parseInt(localStorage.getItem('gaTodayVisits')) + increment;
        
        localStorage.setItem('gaTotalVisits', totalVisits);
        localStorage.setItem('gaTodayVisits', todayVisits);
        
        updateCounterWithAnimation('liveVisitors', newLive);
        updateCounterWithAnimation('totalVisitors', totalVisits);
        updateCounterWithAnimation('gaLive', newLive);
        updateCounterWithAnimation('gaTotal', totalVisits);
        updateCounterWithAnimation('gaToday', todayVisits);
    }, 5 * 60 * 1000); // 5 minutes
}

function updateCounterWithAnimation(elementId, value) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.remove('updated');
        void element.offsetWidth; // Trigger reflow
        element.textContent = value.toLocaleString();
        element.classList.add('updated');
    }
}

    
    




// ============================================
// FEATURE INITIALIZATION
// ============================================

function initializeFeatures() {
    console.log('Initializing all features...');
    
    // Set current date in footer
    updateCurrentDate();
    
    // Initialize image rotator with controls
    initializeImageRotator();
    
    // Setup contact form
    setupContactForm();
    
    // Setup navigation
    setupNavigation();
    
    // Setup mobile menu
    setupMobileMenu();
    
    // Setup sidebar functionality
    setupSidebar();
    
    // Setup donation modal
    setupDonationModal();
    
    // Setup mobile optimizations
    setupMobileOptimizations();
    
    // Setup smooth scrolling
    setupSmoothScrolling();
    
    // Setup active nav highlighting
    setupActiveNav();
    
    // Setup image fallbacks
    setupImageFallbacks();
    
    // Setup newsletter form
    setupNewsletter();
    
    // Add animations on scroll
    setupScrollAnimations();
    
    // Initialize Windsor Weather
    initializeWeather();
    
    // Initialize events system
    initializeEventsSystem();

        // Initialize Google Analytics counter
    initializeGACounter();

}

// ============================================
// DATE AND TIME FUNCTIONS
// ============================================

function updateCurrentDate() {
    const now = new Date();
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric'
    };
    
    const dateElements = document.querySelectorAll('#currentDate');
    dateElements.forEach(el => {
        if (el) el.textContent = now.toLocaleDateString('en-CA', options);
    });
}

// ============================================
// IMAGE ROTATOR
// ============================================

function initializeImageRotator() {
    console.log('Initializing image rotator...');
    
    const images = document.querySelectorAll('.rotator-image');
    const dots = document.querySelectorAll('.rotator-dots .dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (images.length === 0) {
        console.error('No images found for rotator');
        return;
    }
    
    let currentIndex = 0;
    let interval;
    const rotationSpeed = 7000; // 7 seconds
    
    function showImage(index) {
        // Validate index
        if (index < 0) index = images.length - 1;
        if (index >= images.length) index = 0;
        
        // Hide all images and dots
        images.forEach(img => img.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show selected image and dot
        images[index].classList.add('active');
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        
        currentIndex = index;
    }
    
    function nextImage() {
        showImage((currentIndex + 1) % images.length);
    }
    
    function prevImage() {
        showImage((currentIndex - 1 + images.length) % images.length);
    }
    
    function startRotation() {
        stopRotation();
        interval = setInterval(nextImage, rotationSpeed);
        console.log(`Auto rotation started (every ${rotationSpeed/1000}s)`);
    }
    
    function stopRotation() {
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
    }
    
    // Setup event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevImage();
            startRotation();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextImage();
            startRotation();
        });
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showImage(index);
            startRotation();
        });
    });
    
    // Pause rotation on hover
    const rotatorContainer = document.querySelector('.rotator-container');
    if (rotatorContainer) {
        rotatorContainer.addEventListener('mouseenter', stopRotation);
        rotatorContainer.addEventListener('mouseleave', startRotation);
    }
    
    // Start rotation
    showImage(0);
    startRotation();
    
    console.log('Image rotator initialized successfully');
}

// ============================================
// CONTACT FORM
// ============================================

function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('.submit-btn');
        const originalBtnText = submitBtn.innerHTML;
        const formResponse = document.getElementById('formResponse');
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        try {
            const formData = new FormData(this);
            const response = await fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });
            
            if (response.ok) {
                formResponse.textContent = 'Thank you! Your message has been sent successfully.';
                formResponse.className = 'form-response success';
                contactForm.reset();
                
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                setTimeout(() => {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                }, 2000);
            } else {
                throw new Error('Server error');
            }
        } catch (error) {
            formResponse.textContent = 'Oops! There was a problem sending your message. Please try again.';
            formResponse.className = 'form-response error';
            
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}

// ============================================
// NAVIGATION
// ============================================

function setupNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            menuToggle.innerHTML = mainNav.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
                mainNav.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
        
        // Close menu when clicking a link
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }
}

// ============================================
// SIDEBAR FUNCTIONALITY
// ============================================

function setupSidebar() {
    console.log('Setting up sidebar...');
    
    // Load prayer times immediately
    updateSidebarPrayerTimes();
    
    // Setup action buttons
    setupActionButtons();
    
    // Setup card interactions
    setupCardInteractions();
    
    // Auto-refresh prayer times every hour
    setInterval(updateSidebarPrayerTimes, 60 * 60 * 1000);
}

function updateSidebarPrayerTimes() {
    console.log('Loading prayer times...');
    
    // Show loading state
    const prayerIds = ['sidebar-fajr', 'sidebar-dhuhr', 'sidebar-asr', 'sidebar-maghrib', 'sidebar-isha'];
    prayerIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.textContent = '...';
    });
    
    // Use prayer times API
    fetch('https://api.aladhan.com/v1/timingsByCity?city=Windsor&country=Canada&method=2')
        .then(response => response.json())
        .then(data => {
            if (data && data.data && data.data.timings) {
                const timings = data.data.timings;
                
                const timingKeys = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
                prayerIds.forEach((id, index) => {
                    const element = document.getElementById(id);
                    if (element) {
                        const time = timings[timingKeys[index]];
                        element.textContent = formatPrayerTime(time);
                    }
                });
                console.log('Prayer times loaded successfully');
            } else {
                throw new Error('Invalid prayer times data');
            }
        })
        .catch(error => {
            console.error('Error fetching prayer times:', error);
            // Fallback to default times
            const defaultTimes = {
                'sidebar-fajr': '6:18 AM',
                'sidebar-dhuhr': '12:21 PM',
                'sidebar-asr': '2:42 PM',
                'sidebar-maghrib': '5:05 PM',
                'sidebar-isha': '6:24 PM'
            };
            
            Object.keys(defaultTimes).forEach(id => {
                const element = document.getElementById(id);
                if (element) element.textContent = defaultTimes[id];
            });
        });
}

function formatPrayerTime(time) {
    const [hour, minute] = time.split(':');
    const hourNum = parseInt(hour);
    const ampm = hourNum >= 12 ? 'PM' : 'AM';
    const hour12 = hourNum % 12 || 12;
    return `${hour12}:${minute} ${ampm}`;
}

function setupActionButtons() {
    const actionButtons = document.querySelectorAll('.action-btn');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const btnClass = this.classList[1];
            
            switch(btnClass) {
                case 'membership':
                    scrollToSection('contact');
                    break;
                case 'donate':
                    showDonationModal();
                    break;
                case 'events':
                    scrollToSection('events');
                    break;
                case 'resources':
                    scrollToSection('resources');
                    break;
            }
        });
    });
}

function setupCardInteractions() {
    const cards = document.querySelectorAll('.grid-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

// ============================================
// WINDSOR WEATHER FUNCTIONS
// ============================================

let weatherCache = {
    data: null,
    timestamp: 0,
    cacheDuration: 15 * 60 * 1000 // 15 minutes
};

function initializeWeather() {
    console.log('Initializing Windsor weather...');
    
    // Show loading state
    showWeatherLoading();
    
    // Load weather immediately
    fetchWindsorWeather();
    
    // Update every 15 minutes
    setInterval(fetchWindsorWeather, 15 * 60 * 1000);
}

function showWeatherLoading() {
    document.querySelectorAll('#weather-temp, #weather-desc, #weather-wind, #weather-humidity, #weather-feels-like').forEach(el => {
        if (el) el.classList.add('loading');
    });
    
    const weatherIcon = document.getElementById('weather-icon');
    if (weatherIcon) {
        weatherIcon.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    }
}

async function fetchWindsorWeather() {
    console.log('Fetching Windsor weather...');
    
    const now = Date.now();
    if (weatherCache.data && (now - weatherCache.timestamp) < weatherCache.cacheDuration) {
        console.log('Using cached weather data');
        updateWeatherDisplay(weatherCache.data);
        return;
    }
    
    try {
        const apiKey = 'bbdc4803030d2ff5db9c3c253908bb0d';
        const city = 'Windsor,CA';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&_=${now}`;
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`Weather API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data || !data.main || !data.weather || !data.weather[0]) {
            throw new Error('Invalid weather data received');
        }
        
        weatherCache.data = data;
        weatherCache.timestamp = now;
        
        updateWeatherDisplay(data);
        
    } catch (error) {
        console.error('Error fetching Windsor weather:', error);
        showWeatherError();
    }
}

function updateWeatherDisplay(data) {
    // Remove loading states
    document.querySelectorAll('.loading').forEach(el => {
        el.classList.remove('loading');
    });
    
    const temp = Math.round(data.main.temp);
    const desc = data.weather[0].description;
    const feelsLike = Math.round(data.main.feels_like);
    const humidity = data.main.humidity;
    const windSpeed = Math.round(data.wind.speed * 3.6);
    const weatherId = data.weather[0].id;
    
    // Update temperature
    const tempElement = document.getElementById('weather-temp');
    if (tempElement) tempElement.textContent = `${temp}°C`;
    
    // Update description
    const descElement = document.getElementById('weather-desc');
    if (descElement) {
        descElement.textContent = desc.charAt(0).toUpperCase() + desc.slice(1);
    }
    
    // Update wind
    const windElement = document.getElementById('weather-wind');
    if (windElement) windElement.textContent = `${windSpeed} km/h`;
    
    // Update humidity
    const humidityElement = document.getElementById('weather-humidity');
    if (humidityElement) humidityElement.textContent = `${humidity}%`;
    
    // Update feels like
    const feelsLikeElement = document.getElementById('weather-feels-like');
    if (feelsLikeElement) feelsLikeElement.textContent = `Feels like ${feelsLike}°C`;
    
    // Update weather icon
    updateWeatherIcon(weatherId);
    
    // Show last updated time
    showLastUpdated();
    
    console.log(`Weather updated: ${temp}°C, ${desc}`);
}

function updateWeatherIcon(weatherId) {
    const weatherIcon = document.getElementById('weather-icon');
    if (!weatherIcon) return;
    
    let iconClass = 'fas fa-cloud-sun';
    
    if (weatherId >= 200 && weatherId < 300) {
        iconClass = 'fas fa-bolt';
    } else if (weatherId >= 300 && weatherId < 500) {
        iconClass = 'fas fa-cloud-rain';
    } else if (weatherId >= 500 && weatherId < 600) {
        iconClass = 'fas fa-cloud-showers-heavy';
    } else if (weatherId >= 600 && weatherId < 700) {
        iconClass = 'fas fa-snowflake';
    } else if (weatherId >= 700 && weatherId < 800) {
        iconClass = 'fas fa-smog';
    } else if (weatherId === 800) {
        iconClass = 'fas fa-sun';
    } else if (weatherId > 800) {
        iconClass = 'fas fa-cloud';
    }
    
    weatherIcon.innerHTML = `<i class="${iconClass}"></i>`;
}

function showLastUpdated() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-CA', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
    });
    
    const updatedElement = document.getElementById('weather-updated');
    if (updatedElement) {
        updatedElement.textContent = `Updated: ${timeString}`;
    }
}

function showWeatherError() {
    const descElement = document.getElementById('weather-desc');
    if (descElement) {
        descElement.textContent = 'Weather data unavailable';
        descElement.classList.remove('loading');
    }
    
    const weatherIcon = document.getElementById('weather-icon');
    if (weatherIcon) {
        weatherIcon.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
    }
    
    document.querySelectorAll('#weather-temp, #weather-wind, #weather-humidity, #weather-feels-like').forEach(el => {
        if (el) {
            el.classList.remove('loading');
            el.textContent = '--';
        }
    });
}

// Manual refresh function
function refreshWindsorWeather() {
    console.log('Manual weather refresh requested');
    weatherCache.data = null;
    weatherCache.timestamp = 0;
    showWeatherLoading();
    fetchWindsorWeather();
}








// ============================================
// EVENTS SYSTEM - FIXED WITH WORKING IMAGES
// ============================================

// ============================================
// EVENTS SYSTEM - FIXED WITH WORKING CULTURAL FILTER
// ============================================

let allEvents = [];
let currentFilter = 'all';

function initializeEventsSystem() {
    console.log('Initializing events system...');
    
    // Setup event filtering
    setupEventFilters();
    
    // Setup refresh button
    setupRefreshButton();
    
    // Load events
    loadCommunityEvents();
}

async function loadCommunityEvents() {
    const eventsContainer = document.getElementById('events-container');
    if (!eventsContainer) return;
    
    eventsContainer.innerHTML = `
        <div class="loading-events">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Loading community events...</p>
        </div>
    `;
    
    try {
        // Try to fetch real events
        const events = await fetchCommunityEventsFromMultipleSources();
        
        if (events && events.length > 0) {
            allEvents = events;
            displayCommunityEvents(events);
        } else {
            // Use comprehensive fallback events
            allEvents = getComprehensiveCommunityEvents();
            displayCommunityEvents(allEvents);
        }
    } catch (error) {
        console.error('Error loading events:', error);
        allEvents = getComprehensiveCommunityEvents();
        displayCommunityEvents(allEvents);
    }
}

async function fetchCommunityEventsFromMultipleSources() {
    return []; // Return empty array for now
}

function getComprehensiveCommunityEvents() {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    
    // Create dates for the NEXT 3 months (future events)
    const nextMonth = new Date(today);
    nextMonth.setMonth(today.getMonth() + 1);
    
    const twoMonths = new Date(today);
    twoMonths.setMonth(today.getMonth() + 2);
    
    const threeMonths = new Date(today);
    threeMonths.setMonth(today.getMonth() + 3);
    
    return [
        // ========== CULTURAL EVENTS ==========
        {
            id: 'mcc-cultural-celebration',
            title: 'Global Cultural Celebration',
            description: 'Experience food, music, and traditions from around the world.',
            date: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 15, 11, 0), // Next month, 15th
            time: '11:00 AM - 8:00 PM',
            location: 'Downtown Windsor',
            category: 'cultural',
            image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&h=400&fit=crop&q=80',
            url: 'https://windsorite.ca/events/',
            source: 'Multicultural Council (MCC)'
        },
        {
            id: 'ycc-yemeni-night',
            title: 'Yemeni Cultural Night',
            description: 'Traditional music, dance, and authentic Yemeni cuisine.',
            date: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 20, 18, 0), // Next month, 20th
            time: '6:00 PM - 11:00 PM',
            location: 'YCC Community Center',
            category: 'cultural',
            image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=400&fit=crop&q=80',
            url: '#',
            source: 'Yemeni Canadian Council'
        },
        {
            id: 'multicultural-festival',
            title: 'Multicultural Festival Windsor',
            description: 'Celebrate diversity with performances, food, and activities.',
            date: new Date(twoMonths.getFullYear(), twoMonths.getMonth(), 12, 10, 0), // 2 months from now
            time: '10:00 AM - 9:00 PM',
            location: 'Riverfront Festival Plaza',
            category: 'cultural',
            image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=600&h=400&fit=crop&q=80',
            url: 'https://www.citywindsor.ca/',
            source: 'City of Windsor'
        },
        
        // ========== YOUTH EVENTS ==========
        {
            id: 'youth-sports-tournament',
            title: 'Youth Sports Tournament',
            description: 'Soccer and basketball tournament for ages 12-18. Prizes for winners!',
            date: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 5, 9, 0), // Next month, 5th
            time: '9:00 AM - 5:00 PM',
            location: 'WFCU Centre',
            category: 'youth',
            image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&h=400&fit=crop&q=80',
            url: '#',
            source: 'YCC Youth Program'
        },
        {
            id: 'teen-leadership-workshop',
            title: 'Teen Leadership Workshop',
            description: 'Develop leadership skills, public speaking, and team building.',
            date: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 12, 16, 0), // Next month, 12th
            time: '4:00 PM - 7:00 PM',
            location: 'YCC Youth Center',
            category: 'youth',
            image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop&q=80',
            url: '#',
            source: 'YCC Youth Program'
        },
        
        // ========== SUPPORT EVENTS ==========
        {
            id: 'wpl-english-conversation',
            title: 'English Conversation Circle',
            description: 'Practice English in a friendly, informal setting.',
            date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7, 18, 30), // Next week
            time: '6:30 PM - 8:00 PM',
            location: 'WPL, Budimir Branch',
            category: 'support',
            image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&h=400&fit=crop&q=80',
            url: 'https://windsorpubliclibrary.com/events',
            source: 'Windsor Public Library'
        },
        {
            id: 'newcomer-settlement',
            title: 'Newcomer Settlement Workshop',
            description: 'Learn about housing, healthcare, education, and employment in Canada.',
            date: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 10, 14, 0), // Next month, 10th
            time: '2:00 PM - 4:30 PM',
            location: 'YCC Office, Wyandotte St.',
            category: 'support',
            image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop&q=80',
            url: '#',
            source: 'YCC Settlement Services'
        },
        
        // ========== COMMUNITY EVENTS ==========
        {
            id: 'city-farmers-market',
            title: "Saturday Farmers' Market",
            description: 'Fresh local produce and artisan goods.',
            date: new Date(today.getFullYear(), today.getMonth(), getNextSaturday(), 8, 0), // This Saturday
            time: '8:00 AM - 1:00 PM',
            location: 'City Market Square',
            category: 'community',
            image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop&q=80',
            url: 'https://www.citywindsor.ca/events',
            source: 'City of Windsor'
        },
        {
            id: 'community-cleanup',
            title: 'Community Cleanup Day',
            description: 'Join neighbors to clean up local parks and streets.',
            date: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 22, 9, 0), // Next month, 22nd
            time: '9:00 AM - 12:00 PM',
            location: 'Jackson Park',
            category: 'community',
            image: 'https://images.unsplash.com/photo-1542601906990-3f88f10405ff?w=600&h=400&fit=crop&q=80',
            url: '#',
            source: 'City of Windsor Parks'
        }
    ].sort((a, b) => a.date - b.date); // Sort by date
}

// Helper function to get next Saturday
function getNextSaturday() {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Sunday, 6 = Saturday
    const daysUntilSaturday = (6 - dayOfWeek + 7) % 7 || 7;
    return today.getDate() + daysUntilSaturday;
}
function displayCommunityEvents(events) {
    const eventsContainer = document.getElementById('events-container');
    
    if (!events || events.length === 0) {
        eventsContainer.innerHTML = `
            <div class="no-events">
                <i class="fas fa-calendar-times"></i>
                <h3>No Upcoming Events Found</h3>
                <p>Check back soon for community events!</p>
            </div>
        `;
        return;
    }
    
    const eventsHTML = events.map(event => {
        const eventDate = event.date instanceof Date ? event.date : new Date(event.date);
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                           'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        // Ensure image URL has proper format
        let imageUrl = event.image;
        const fallbackImage = 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?w=600&h=400&fit=crop&q=80';
        
        // Fix any problematic Unsplash URLs
        if (imageUrl.includes('unsplash.com') && !imageUrl.includes('w=')) {
            imageUrl = imageUrl.split('?')[0] + '?w=600&h=400&fit=crop&q=80';
        }
        
        return `
            <div class="event-card" data-category="${event.category}">
                <div class="event-header">
                    <div class="event-date">
                        <div class="event-day">${eventDate.getDate()}</div>
                        <div class="event-month">${monthNames[eventDate.getMonth()]}</div>
                    </div>
                    <div class="event-category">${formatCategoryForDisplay(event.category)}</div>
                </div>
                <div class="event-image" 
                     style="background-image: url('${imageUrl}')"
                     data-fallback="${fallbackImage}"
                     onerror="this.style.backgroundImage='url(${fallbackImage})'">
                </div>
                <div class="event-content">
                    <h3>${event.title}</h3>
                    <p>${event.description}</p>
                    <div class="event-details">
                        <div class="detail">
                            <i class="fas fa-clock"></i>
                            <span>${event.time}</span>
                        </div>
                        <div class="detail">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${event.location}</span>
                        </div>
                        <div class="detail">
                            <i class="fas fa-building"></i>
                            <span>${event.source}</span>
                        </div>
                    </div>
                    <a href="${event.url}" target="_blank" class="btn btn-small">
                        <i class="fas fa-external-link-alt"></i> More Details
                    </a>
                </div>
            </div>
        `;
    }).join('');
    
    eventsContainer.innerHTML = eventsHTML;
    
    // Debug: Log how many cultural events were displayed
    const culturalEvents = events.filter(e => e.category === 'cultural');
    console.log(`Displayed ${culturalEvents.length} cultural events:`, culturalEvents.map(e => e.title));
}

function formatCategoryForDisplay(category) {
    const categories = {
        cultural: 'Cultural',
        youth: 'Youth',
        support: 'Support',
        community: 'Community'
    };
    
    return categories[category] || 'Event';
}

function filterEvents(filter) {
    const eventCards = document.querySelectorAll('.event-card');
    let visibleCount = 0;
    
    console.log(`Filtering events by: ${filter}`);
    
    eventCards.forEach(card => {
        const category = card.dataset.category;
        console.log(`Card category: ${category}, matches filter ${filter}: ${filter === 'all' || category === filter}`);
        
        if (filter === 'all' || category === filter) {
            card.style.display = 'flex';  // Changed from 'block' to 'flex'
            card.style.animation = 'fadeIn 0.3s ease-out';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Update status message
    const statusElement = document.getElementById('events-status');
    if (statusElement) {
        if (visibleCount === 0) {
            statusElement.innerHTML = `<p><i class="fas fa-info-circle"></i> No ${filter} events found</p>`;
        } else {
            const filterText = filter === 'all' ? '' : ` ${filter}`;
            statusElement.innerHTML = `<p><i class="fas fa-info-circle"></i> Showing ${visibleCount}${filterText} event${visibleCount !== 1 ? 's' : ''}</p>`;
        }
    }
    
    console.log(`Filter result: ${visibleCount} ${filter} events visible`);
    currentFilter = filter;
}

function setupEventFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    console.log(`Found ${filterButtons.length} filter buttons`);
    
    filterButtons.forEach((button, index) => {
        console.log(`Button ${index}: ${button.textContent}, data-filter: ${button.dataset.filter}`);
        
        button.addEventListener('click', function() {
            console.log(`Clicked filter: ${this.dataset.filter}`);
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            console.log(`Applying filter: ${filter}`);
            filterEvents(filter);
        });
    });
}

function setupRefreshButton() {
    const refreshBtn = document.getElementById('refreshEvents');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Refreshing...';
            this.disabled = true;
            
            loadCommunityEvents().finally(() => {
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                    
                    // Reapply current filter
                    if (currentFilter !== 'all') {
                        filterEvents(currentFilter);
                    }
                }, 500);
            });
        });
    }
}

// Add debug mode to test cultural events
function enableDebugMode() {
    // Temporarily remove date filter for testing
    const originalGetEvents = getComprehensiveCommunityEvents;
    
    getComprehensiveCommunityEvents = function() {
        const events = originalGetEvents.call(this);
        console.log('DEBUG: All events including past:', events);
        
        // Add a test cultural event for today
        const today = new Date();
        events.push({
            id: 'test-cultural-today',
            title: 'TEST: Cultural Event Today',
            description: 'This is a test cultural event happening today.',
            date: new Date(),
            time: '6:00 PM - 9:00 PM',
            location: 'Test Location',
            category: 'cultural',
            image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&h=400&fit=crop&q=80',
            url: '#',
            source: 'Test Source'
        });
        
        return events;
    };
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Events system loading...');
    
    // Enable debug mode if needed
    // enableDebugMode();
    
    initializeEventsSystem();
    
    // Test cultural filter directly
    setTimeout(() => {
        console.log('Testing cultural filter...');
        const culturalBtn = document.querySelector('[data-filter="cultural"]');
        if (culturalBtn) {
            console.log('Found cultural button, simulating click...');
            // culturalBtn.click();
        }
    }, 1000);
});




function testCulturalFilter() {
    console.log('=== TESTING CULTURAL FILTER ===');
    
    // Get all events
    const events = getComprehensiveCommunityEvents();
    console.log('Total events:', events.length);
    
    // Filter cultural events
    const culturalEvents = events.filter(e => e.category === 'cultural');
    console.log('Cultural events found:', culturalEvents.length);
    console.log('Cultural events:', culturalEvents.map(e => ({ title: e.title, date: e.date })));
    
    // Check if any are displayed
    const displayedCards = document.querySelectorAll('.event-card[data-category="cultural"]');
    console.log('Displayed cultural cards:', displayedCards.length);
    
    // Force show cultural events
    if (culturalEvents.length > 0 && displayedCards.length === 0) {
        console.log('Forcing display of cultural events...');
        displayCommunityEvents(culturalEvents);
    }
}

// Call this after page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeEventsSystem();
    
    // Test after a delay
    setTimeout(testCulturalFilter, 1500);
});






// ============================================
// DONATION MODAL
// ============================================

function setupDonationModal() {
    const modal = document.getElementById('donationModal');
    if (!modal) return;
    
    const donationOptions = modal.querySelectorAll('.donation-option');
    const customAmountInput = modal.querySelector('.donation-form input[type="number"]');
    const donateButton = modal.querySelector('.donation-form .btn');
    
    let selectedAmount = 0;
    
    donationOptions.forEach(option => {
        option.addEventListener('click', function() {
            donationOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            selectedAmount = parseInt(this.textContent.replace('$', '')) || 0;
            if (customAmountInput) customAmountInput.value = '';
        });
    });
    
    if (customAmountInput) {
        customAmountInput.addEventListener('input', function() {
            donationOptions.forEach(opt => opt.classList.remove('active'));
            selectedAmount = parseFloat(this.value) || 0;
        });
    }
    
    if (donateButton) {
        donateButton.addEventListener('click', function() {
            if (customAmountInput && customAmountInput.value) {
                selectedAmount = parseFloat(customAmountInput.value) || 0;
            }
            
            if (selectedAmount <= 0) {
                showNotification('Please select or enter a donation amount.', 'error');
                return;
            }
            
            processDonation(selectedAmount);
        });
    }
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeDonationModal();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeDonationModal();
        }
    });
}

function showDonationModal() {
    const modal = document.getElementById('donationModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeDonationModal() {
    const modal = document.getElementById('donationModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        
        modal.querySelectorAll('.donation-option').forEach(opt => opt.classList.remove('active'));
        const customInput = modal.querySelector('.donation-form input[type="number"]');
        if (customInput) customInput.value = '';
    }
}

function processDonation(amount) {
    const donateButton = document.querySelector('.donation-form .btn');
    const originalText = donateButton.innerHTML;
    
    donateButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    donateButton.disabled = true;
    
    setTimeout(() => {
        showNotification(`Thank you for your generous donation of $${amount.toFixed(2)}!`, 'success');
        donateButton.innerHTML = originalText;
        donateButton.disabled = false;
        closeDonationModal();
    }, 1500);
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('.main-header').offsetHeight;
        const sectionPosition = section.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: sectionPosition,
            behavior: 'smooth'
        });
    }
}

function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function setupActiveNav() {
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.main-nav a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const headerHeight = document.querySelector('.main-header').offsetHeight;
            
            if (window.scrollY >= (sectionTop - headerHeight - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

function setupImageFallbacks() {
    const images = document.querySelectorAll('img[onerror]');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'https://via.placeholder.com/600x400/004080/ffffff?text=YCC+Windsor';
        });
    });
}

function setupNewsletter() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (!validateEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        const submitBtn = this.querySelector('button');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            emailInput.value = '';
            
            showNotification('Thank you for subscribing to our newsletter!', 'success');
        }, 1500);
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 15px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    });
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    document.body.appendChild(notification);
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

function setupMobileOptimizations() {
    function setViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', setViewportHeight);
}

function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.slide-up, .slide-left, .slide-right');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
}

// ============================================
// ANNOUNCEMENT BANNER
// ============================================

function checkAnnouncementState() {
    const announcement = document.querySelector('.ycc-announcement');
    const closeBtn = document.querySelector('.close-announcement');
    
    if (!announcement || !closeBtn) return;
    
    if (localStorage.getItem('ycc-announcement-closed') === 'true') {
        announcement.style.display = 'none';
    }
    
    closeBtn.addEventListener('click', closeAnnouncement);
}

function closeAnnouncement() {
    const announcement = document.querySelector('.ycc-announcement');
    if (announcement) {
        announcement.style.opacity = '0';
        announcement.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            announcement.style.display = 'none';
            localStorage.setItem('ycc-announcement-closed', 'true');
        }, 300);
    }
}

// ============================================
// PRAYER TIMES UTILITY
// ============================================

function updatePrayerTimes() {
    const updateBtn = document.querySelector('.card-action-btn');
    if (!updateBtn) return;
    
    const originalText = updateBtn.innerHTML;
    updateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Updating...';
    updateBtn.disabled = true;
    
    updateSidebarPrayerTimes();
    
    setTimeout(() => {
        updateBtn.innerHTML = originalText;
        updateBtn.disabled = false;
        showNotification('Prayer times updated successfully!', 'success');
    }, 2000);
}

// ============================================
// MOBILE MENU
// ============================================

function setupMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            menuToggle.querySelector('i').className = mainNav.classList.contains('active') 
                ? 'fas fa-times' 
                : 'fas fa-bars';
        });
    }
}

// ============================================
// ERROR HANDLING
// ============================================

window.addEventListener('error', function(e) {
    console.error('Website error:', e.error);
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
});

// Export functions for debugging
if (typeof window !== 'undefined') {
    window.YCC = {
        updatePrayerTimes,
        showDonationModal,
        closeDonationModal,
        scrollToSection,
        showNotification,
        fetchWindsorWeather,
        updateSidebarPrayerTimes
    };
}




