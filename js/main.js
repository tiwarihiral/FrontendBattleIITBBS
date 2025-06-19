// Theme functionality
class ThemeManager {
    constructor() {
        this.themeToggle = document.querySelector('.theme-toggle');
        this.body = document.body;
        this.currentTheme = localStorage.getItem('theme') || 'light';
        
        this.init();
    }

    init() {
        // Set initial theme
        this.setTheme(this.currentTheme);
        
        // Add event listener for theme toggle
        this.themeToggle.addEventListener('click', () => {
            this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
            this.setTheme(this.currentTheme);
        });
    }

    setTheme(theme) {
        this.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }
}

// Navigation functionality
class Navigation {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.navToggle = document.querySelector('.nav-toggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.lastScroll = 0;
        
        this.init();
    }

    init() {
        // Toggle mobile menu
        this.navToggle.addEventListener('click', () => this.toggleMenu());
        
        // Close menu when clicking a link
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });

        // Handle scroll behavior
        window.addEventListener('scroll', () => this.handleScroll());

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navbar.contains(e.target)) {
                this.closeMenu();
            }
        });
    }

    toggleMenu() {
        this.navToggle.classList.toggle('active');
        this.navMenu.classList.toggle('active');
    }

    closeMenu() {
        this.navToggle.classList.remove('active');
        this.navMenu.classList.remove('active');
    }

    handleScroll() {
        const currentScroll = window.pageYOffset;
        
        // Show/hide navbar on scroll
        if (currentScroll > this.lastScroll && currentScroll > 100) {
            this.navbar.classList.add('navbar-hidden');
        } else {
            this.navbar.classList.remove('navbar-hidden');
        }

        // Add shadow when scrolled
        if (currentScroll > 0) {
            this.navbar.classList.add('navbar-scrolled');
        } else {
            this.navbar.classList.remove('navbar-scrolled');
        }

        this.lastScroll = currentScroll;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme manager
    const themeManager = new ThemeManager();
    
    // Initialize navigation
    const navigation = new Navigation();
});

// Carbon Graph Bar Chart Rendering
(function() {
    const canvas = document.getElementById('carbon-bar-chart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    // Example data from screenshot (approximate)
    const data = [
        { label: '', value: 0 },
        { label: '', value: 0 },
        { label: '', value: 0 },
        { label: '', value: 0 },
        { label: '', value: 0 },
        { label: '', value: 0 },
        { label: '', value: 0 },
        { label: '', value: 0 },
        { label: '', value: 0 },
        { label: '', value: 0 },
        { label: '', value: 0 },
        { label: '', value: 0 },
        { label: '', value: 0 },
        { label: '', value: 0 },
        { label: '', value: 0 },
    ];
    // Replace above with actual values from your screenshot if needed
    // Example: [549, 278, 875, 617, 506, 36, 185, 191, 122, 550, 881, 539, 269, 29, 82, 44, 109, 106, 607, 528]
    // For demo, let's use the values from the screenshot:
    const values = [549, 278, 875, 617, 506, 36, 185, 191, 122, 550, 881, 539, 269, 29, 82, 44, 109, 106, 607, 528];
    const barLabels = values.map(v => v.toString());
    // Chart config
    const chart = {
        left: 60,
        top: 40,
        width: canvas.width - 120,
        height: canvas.height - 80,
        barWidth: 32,
        barGap: 18,
        maxValue: 1200,
        yTicks: [0, 200, 400, 600, 800, 1000, 1200],
        targetDashed: 500,
        targetSolid: 600,
        barColors: ['#a1887f', '#7c4942'], // alternate
        labelColor: '#7c4942',
        axisColor: '#a1887f',
        gridColor: '#e0cfc2',
        font: '16px Inter, Arial, sans-serif',
        valueFont: 'bold 18px Inter, Arial, sans-serif',
    };
    function drawChart() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        // Draw grid lines and y-axis labels
        ctx.strokeStyle = chart.gridColor;
        ctx.lineWidth = 1;
        ctx.font = chart.font;
        ctx.fillStyle = chart.labelColor;
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        for (let i = 0; i < chart.yTicks.length; i++) {
            const y = chart.top + chart.height - (chart.yTicks[i] / chart.maxValue) * chart.height;
            ctx.beginPath();
            ctx.moveTo(chart.left, y);
            ctx.lineTo(chart.left + chart.width, y);
            ctx.stroke();
            ctx.fillText(chart.yTicks[i], chart.left - 10, y);
        }
        // Draw axes
        ctx.strokeStyle = chart.axisColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(chart.left, chart.top);
        ctx.lineTo(chart.left, chart.top + chart.height);
        ctx.lineTo(chart.left + chart.width, chart.top + chart.height);
        ctx.stroke();
        // Draw target lines
        // Dashed (2030)
        const yDashed = chart.top + chart.height - (chart.targetDashed / chart.maxValue) * chart.height;
        ctx.save();
        ctx.setLineDash([8, 8]);
        ctx.strokeStyle = '#a1887f';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(chart.left, yDashed);
        ctx.lineTo(chart.left + chart.width, yDashed);
        ctx.stroke();
        ctx.restore();
        // Solid (2025)
        const ySolid = chart.top + chart.height - (chart.targetSolid / chart.maxValue) * chart.height;
        ctx.save();
        ctx.setLineDash([]);
        ctx.strokeStyle = '#7c4942';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(chart.left, ySolid);
        ctx.lineTo(chart.left + chart.width, ySolid);
        ctx.stroke();
        ctx.restore();
        // Draw bars
        let x = chart.left + 18;
        for (let i = 0; i < values.length; i++) {
            const val = values[i];
            const barH = (val / chart.maxValue) * chart.height;
            const y = chart.top + chart.height - barH;
            ctx.fillStyle = i % 2 === 0 ? chart.barColors[0] : chart.barColors[1];
            ctx.fillRect(x, y, chart.barWidth, barH);
            // Value label
            ctx.font = chart.valueFont;
            ctx.fillStyle = chart.labelColor;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            ctx.fillText(val, x + chart.barWidth / 2, y - 6);
            x += chart.barWidth + chart.barGap;
        }
        ctx.restore();
        // Y-axis label
        ctx.save();
        ctx.font = 'bold 18px Inter, Arial, sans-serif';
        ctx.fillStyle = chart.labelColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.translate(24, chart.top + chart.height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('Embodied carbon intensity (kgCO2e/m²)', 0, 0);
        ctx.restore();
    }
    drawChart();
})(); 