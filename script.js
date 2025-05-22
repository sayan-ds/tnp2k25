// DOM Elements
const navbar = document.getElementById('mainNav');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Hero slider functionality
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slider .slide');
    let currentSlide = 0;

    // Function to show a specific slide
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }

    // Function to show next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Show first slide initially
    showSlide(0);

    // Auto advance slides every 5 seconds
    setInterval(nextSlide, 5000);
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu after clicking
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});

// Tab functionality
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelector('.tab-content');

    // Sample data for charts
    const ugData = {
        labels: ['CSE', 'IT', 'ECE', 'EE', 'ME'],
        datasets: [
            {
                label: 'Students',
                data: [52, 53, 49, 46, 45],
                backgroundColor: 'rgba(42, 140, 42, 0.8)'
            },
            {
                label: 'Offers',
                data: [15, 16, 14, 19, 21],
                backgroundColor: 'rgba(65, 105, 225, 0.8)'
            }
        ]
    };

    const pgData = {
        labels: ['M.Tech', 'MCA'],
        datasets: [
            {
                label: 'Students',
                data: [25, 30],
                backgroundColor: 'rgba(42, 140, 42, 0.8)'
            },
            {
                label: 'Offers',
                data: [10, 15],
                backgroundColor: 'rgba(65, 105, 225, 0.8)'
            }
        ]
    };

    function createChart(data) {
        const container = document.createElement('div');
        container.className = 'chart-container';

        const canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 400;
        const ctx = canvas.getContext('2d');
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Calculate dimensions
        const padding = 60;
        const chartWidth = canvas.width - (padding * 2);
        const chartHeight = canvas.height - (padding * 2);
        const barWidth = (chartWidth / data.labels.length) / 3;
        const maxValue = Math.max(...data.datasets.flatMap(d => d.data));
        const scale = chartHeight / maxValue;
        
        // Draw axes
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.strokeStyle = '#666';
        ctx.stroke();
        
        // Draw bars
        data.labels.forEach((label, i) => {
            data.datasets.forEach((dataset, j) => {
                const value = dataset.data[i];
                const x = padding + (i * (chartWidth / data.labels.length)) + (j * barWidth) + barWidth;
                const barHeight = value * scale;
                const y = canvas.height - padding - barHeight;
                
                // Draw bar
                ctx.fillStyle = dataset.backgroundColor;
                ctx.fillRect(x, y, barWidth, barHeight);
                
                // Add value label
                ctx.fillStyle = '#000';
                ctx.font = '12px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(value, x + barWidth/2, y - 5);
            });
            
            // Add x-axis label
            ctx.fillStyle = '#000';
            ctx.font = '14px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(label, padding + (i * (chartWidth / data.labels.length)) + (chartWidth / data.labels.length)/2, canvas.height - padding + 20);
        });
        
        // Add legend
        const legendY = 30;
        data.datasets.forEach((dataset, i) => {
            const x = canvas.width / 2 + (i * 150) - 100;
            
            ctx.fillStyle = dataset.backgroundColor;
            ctx.fillRect(x - 15, legendY - 10, 20, 20);
            
            ctx.fillStyle = '#000';
            ctx.font = '14px Arial';
            ctx.textAlign = 'left';
            ctx.fillText(dataset.label, x + 10, legendY);
        });
        
        container.appendChild(canvas);
        return container;
    }

    function showTab(tabId) {
        tabButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabId);
        });

        tabContents.innerHTML = '';
        const data = tabId === 'placement' ? ugData : pgData;
        const chart = createChart(data);
        tabContents.appendChild(chart);
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            showTab(button.dataset.tab);
        });
    });

    // Show initial tab
    showTab('placement');
}

  const navbar1 = document.getElementById('mainNav');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar1.classList.add('fixed');
    } else {
      navbar1.classList.remove('fixed');
    }
  });

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initHeroSlider();
    initTabs();
    
    // Populate Why KGEC section
    // const whyKgecSection = document.querySelector('.why-kgec-section');
    // whyKgecSection.innerHTML = `
    //     <div class="container">
    //         <div class="grid grid-cols-1 grid-cols-2 grid-cols-3">
    //             <div class="card">
    //                 <h3>Excellence in Education</h3>
    //                 <p>Top-ranked engineering college with state-of-the-art facilities and expert faculty.</p>
    //             </div>
    //             <div class="card">
    //                 <h3>Industry Connections</h3>
    //                 <p>Strong ties with leading companies ensuring excellent placement opportunities.</p>
    //             </div>
    //             <div class="card">
    //                 <h3>Research Focus</h3>
    //                 <p>Emphasis on innovation and research with modern laboratory facilities.</p>
    //             </div>
    //             <div class="card">
    //                 <h3>Skilled Graduates</h3>
    //                 <p>Comprehensive training ensuring industry-ready professionals.</p>
    //             </div>
    //         </div>
    //     </div>
    // `;

    // Populate recruiters section with company logos
    const recruitersSection = document.querySelector('.recruiters-section .container');
    const companyLogos = [
        'images/company/Private Companies/Microsoft.png',
        'images/company/Private Companies/Amazon.png',
        'images/company/Private Companies/JPMC.jpeg',
        'images/company/Private Companies/infosys.png',
        'images/company/Private Companies/TechMahindra.png',
        'images/company/Private Companies/Cognizant.png',
        'images/company/Private Companies/Servicenow.png',
        'images/company/Private Companies/Tata.png',
        'images/company/Private Companies/Groww.png',
        'images/company/Private Companies/COZEVA.png',
        'images/company/Private Companies/Imerit.png',
        'images/company/Private Companies/PLaNeTSPaRK.png',
        'images/company/Private Companies/Wisdomlabs.png',
        'images/company/Private Companies/k4consultancy.png',
        'images/company/Private Companies/technoexponentsolutions.png',
        'images/company/Private Companies/tagmango.png',
        'images/company/Private Companies/ARCDocumentSolutions.png'
    ];

    if (recruitersSection && companyLogos.length > 0) {
        // Split logos into two groups
        const midPoint = Math.ceil(companyLogos.length / 2);
        const topLogos = companyLogos.slice(0, midPoint);
        const bottomLogos = companyLogos.slice(midPoint);

        // Create container for the two rows
        const recruitersContainer = document.createElement('div');
        recruitersContainer.className = 'recruiters-container';

        // Create top row
        const topRow = document.createElement('div');
        topRow.className = 'recruiters-row recruiters-row-top';
        const topRowCards = topLogos.map(logo => `
            <div class="company-card">
                <img src="${logo}" alt="Company Logo" class="company-logo">
            </div>
        `).join('');
        topRow.innerHTML = topRowCards + topRowCards; // Duplicate for continuous scroll

        // Create bottom row
        const bottomRow = document.createElement('div');
        bottomRow.className = 'recruiters-row recruiters-row-bottom';
        const bottomRowCards = bottomLogos.map(logo => `
            <div class="company-card">
                <img src="${logo}" alt="Company Logo" class="company-logo">
            </div>
        `).join('');
        bottomRow.innerHTML = bottomRowCards + bottomRowCards; // Duplicate for continuous scroll

        // Add rows to container
        recruitersContainer.appendChild(topRow);
        recruitersContainer.appendChild(bottomRow);
        recruitersSection.innerHTML = '<h2 class="section-title">Past Recruiters</h2>';
        recruitersSection.appendChild(recruitersContainer);

        // Function to update center effect
        const updateCenterEffect = (row) => {
            const cards = row.querySelectorAll('.company-card');
            const rowRect = row.getBoundingClientRect();
            const centerX = rowRect.left + rowRect.width / 2;
            
            cards.forEach(card => {
                const cardRect = card.getBoundingClientRect();
                const cardCenterX = cardRect.left + cardRect.width / 2;
                const distance = Math.abs(centerX - cardCenterX);
                
                // Add or remove center class based on distance from center
                if (distance < cardRect.width) {
                    card.classList.add('center');
                } else {
                    card.classList.remove('center');
                }
            });
        };

        // Update center effect on animation frames
        const updateAllRows = () => {
            updateCenterEffect(topRow);
            updateCenterEffect(bottomRow);
            requestAnimationFrame(updateAllRows);
        };
        updateAllRows();

        // Reset animations when they complete
        const resetAnimation = (element) => {
            element.style.animation = 'none';
            element.offsetHeight; // Trigger reflow
            element.style.animation = element.classList.contains('recruiters-row-top') 
                ? 'scrollRight 40s linear infinite'
                : 'scrollLeft 40s linear infinite';
        };

        topRow.addEventListener('animationend', () => resetAnimation(topRow));
        bottomRow.addEventListener('animationend', () => resetAnimation(bottomRow));
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-down');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
}); 