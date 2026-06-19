document.addEventListener('DOMContentLoaded', () => {

    // Hamburger Menu Toggle Logic
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navLinks = document.getElementById('nav-links');
    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Theme Toggle Logic
    const themeBtn = document.getElementById('theme-btn');
    const moonSVG = `<svg id="theme-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
    const sunSVG = `<svg id="theme-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;

    // 1. Load saved theme immediately
    const savedTheme = localStorage.getItem('bimetic-theme');
    if (savedTheme) {
        document.body.setAttribute('data-theme', savedTheme);
        if (themeBtn) {
            themeBtn.innerHTML = savedTheme === 'light' ? moonSVG : sunSVG;
        }
    }

    // 2. Toggle listener
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const body = document.body;
            if (body.getAttribute('data-theme') === 'light') {
                body.setAttribute('data-theme', 'dark');
                themeBtn.innerHTML = sunSVG;
                localStorage.setItem('bimetic-theme', 'dark');
            } else {
                body.setAttribute('data-theme', 'light');
                themeBtn.innerHTML = moonSVG;
                localStorage.setItem('bimetic-theme', 'light');
            }
        });
    }

    // Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        scrollObserver.observe(el);
    });

    // Pricing Toggle Logic
    const btnMonthly = document.getElementById('btn-monthly');
    const btnAnnual = document.getElementById('btn-annual');
    const pricePro = document.getElementById('price-pro');
    
    // Default prices
    const prices = {
        monthly: { pro: "$9.99" },
        annual: { pro: "$8.00" } // ~$96 / year
    };

    if (btnMonthly && btnAnnual) {
        btnMonthly.addEventListener('click', () => {
            btnMonthly.classList.add('active');
            btnAnnual.classList.remove('active');
            pricePro.innerHTML = `${prices.monthly.pro}<span>/mo</span>`;
            
            // Add a quick pulse animation
            pricePro.style.animation = 'none';
            pricePro.offsetHeight; /* trigger reflow */
            pricePro.style.animation = 'fadeInUp 0.3s ease-out forwards';
        });

        btnAnnual.addEventListener('click', () => {
            btnAnnual.classList.add('active');
            btnMonthly.classList.remove('active');
            pricePro.innerHTML = `${prices.annual.pro}<span>/mo</span>`;
            
            pricePro.style.animation = 'none';
            pricePro.offsetHeight;
            pricePro.style.animation = 'fadeInUp 0.3s ease-out forwards';
        });
    }

    // Advanced Terminal Demo Animation Logic
    const terminal = document.getElementById('demo-terminal');
    
    function addTerminalLine(htmlContent) {
        if (!terminal) return null;
        const div = document.createElement('div');
        div.style.marginBottom = '8px';
        div.innerHTML = htmlContent;
        terminal.appendChild(div);
        
        // Keep only last 13 lines to prevent overflow
        while (terminal.childNodes.length > 13) {
            terminal.removeChild(terminal.firstChild);
        }
        return div;
    }

    async function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function runAdvancedDemoLoop() {
        if (!terminal) return;
        terminal.innerHTML = "";
        
        // INIT
        addTerminalLine(`<span style="color: var(--primary-blue); font-weight: bold;">> Running BIMetic Viewpoint Pipeline...</span>`);
        await sleep(1000);
        
        // PHASE 1: FORMATTING
        addTerminalLine(`<span style="color: var(--text-secondary);">[1/3] Bulk Formatter: Renaming 1,482 views...</span>`);
        await sleep(400);
        
        // Simulate rapid processing of hundreds of files
        for (let i = 1; i <= 15; i++) {
            let num = i.toString().padStart(3, '0');
            addTerminalLine(`
                <div class="demo-line" style="border: none; padding: 2px 0; font-size: 13px; margin: 0;">
                    <div class="demo-old">Arch_Clash_${num}</div>
                    <div class="demo-arrow">→</div>
                    <div class="demo-new">${num} - Arch_Clash_${num}</div>
                </div>
            `);
            await sleep(30); // Super fast split-second delay
        }
        
        addTerminalLine(`<span style="color: var(--primary-blue); font-style: italic;">... 1,467 more views formatted in 0.4s</span>`);
        await sleep(800);
        
        // PHASE 2: MARKUP DETECTION
        addTerminalLine(`<span style="color: var(--text-secondary); margin-top: 8px; display: block;">[2/3] Markup Detector: Scanning for redlines...</span>`);
        await sleep(600);
        addTerminalLine(`<span style="color: #ffd60a;">  ⚠ Found 12 views with active markups.</span>`);
        await sleep(400);
        addTerminalLine(`<span style="color: #ffd60a;">  → Flagged with [HAS_MARKUPS] prefix.</span>`);
        await sleep(800);
        
        // PHASE 3: DUPLICATE DETECTION
        addTerminalLine(`<span style="color: var(--text-secondary); margin-top: 8px; display: block;">[3/3] Duplicate Detector: Analyzing coordinates...</span>`);
        await sleep(600);
        addTerminalLine(`<span style="color: #ff453a;">  ✖ Identified 4 duplicate viewpoints.</span>`);
        await sleep(400);
        addTerminalLine(`<span style="color: #ff453a;">  → Moved to [Duplicates_Archive] folder.</span>`);
        await sleep(1000);
        
        // SUCCESS
        addTerminalLine(`<span style="color: var(--success-green); font-weight: bold; margin-top: 8px; display: block;">> PIPELINE SUCCESS: 1,482 views processed in 1.42s</span>`);
        
        // Loop again later
        setTimeout(runAdvancedDemoLoop, 6000);
    }

    // Start Advanced Demo
    setTimeout(runAdvancedDemoLoop, 500);

    // 3D Tilt and Flashlight Hover Effect
    document.querySelectorAll('.feature-card, .pricing-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Flashlight effect
            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
            
            // 3D Tilt Effect
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Max rotation of 6 degrees for a subtle, premium feel
            const rotateX = ((y - centerY) / centerY) * -6; 
            const rotateY = ((x - centerX) / centerX) * 6;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
        });
    });

    // ROI Calculator Logic
    const viewpointsSlider = document.getElementById('roi-viewpoints');
    const rateSlider = document.getElementById('roi-rate');
    const viewpointsVal = document.getElementById('roi-viewpoints-val');
    const rateVal = document.getElementById('roi-rate-val');
    const timeResult = document.getElementById('roi-time');
    const moneyResult = document.getElementById('roi-money');

    function calculateROI() {
        if (!viewpointsSlider || !rateSlider) return;
        
        const viewpoints = parseInt(viewpointsSlider.value);
        const hourlyRate = parseInt(rateSlider.value);
        
        viewpointsVal.textContent = viewpoints;
        rateVal.textContent = hourlyRate;

        // Assumptions
        // Manual renaming and organizing takes about 25 seconds per view (navigating tree, renaming, finding duplicates, etc.)
        // BIMetic takes ~0.1 sec per view
        const manualSecondsPerView = 25;
        const bimeticSecondsPerView = 0.1;
        const subscriptionCost = 8; // monthly cost
        
        // Time in hours
        const manualHours = (viewpoints * manualSecondsPerView) / 3600;
        const bimeticHours = (viewpoints * bimeticSecondsPerView) / 3600;
        
        const hoursSaved = manualHours - bimeticHours;
        
        // Cost in dollars
        const manualCost = manualHours * hourlyRate;
        const bimeticCost = bimeticHours * hourlyRate + subscriptionCost;
        
        const moneySaved = manualCost - bimeticCost;

        // Update UI
        timeResult.textContent = hoursSaved.toFixed(1) + " hrs";
        
        if (moneySaved > 0) {
            moneyResult.textContent = "$" + Math.round(moneySaved).toLocaleString();
            moneyResult.style.color = "var(--success-green, #107c10)";
        } else {
            moneyResult.textContent = "$" + Math.round(moneySaved).toLocaleString();
            moneyResult.style.color = "#ff453a";
        }
    }

    if (viewpointsSlider && rateSlider) {
        viewpointsSlider.addEventListener('input', calculateROI);
        rateSlider.addEventListener('input', calculateROI);
        calculateROI(); // initial calc
    }
});
