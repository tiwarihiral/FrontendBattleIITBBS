// Fluid Iridescent Ripple Effect (darker)
(function() {
    const box = document.querySelector('.ripple-box');
    const canvas = document.getElementById('ripple-canvas');
    if (!box || !canvas) return;
    const ctx = canvas.getContext('2d');
    let ripples = [];
    let width = 0, height = 0;

    function resizeCanvas() {
        width = box.clientWidth;
        height = box.clientHeight;
        canvas.width = width;
        canvas.height = height;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    box.addEventListener('mousemove', function(e) {
        const rect = box.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        spawnRipple(x, y);
    });
    // Touch support for mobile
    box.addEventListener('touchstart', function(e) {
        if (e.touches.length > 0) {
            const rect = box.getBoundingClientRect();
            const x = e.touches[0].clientX - rect.left;
            const y = e.touches[0].clientY - rect.top;
            spawnRipple(x, y);
        }
    });
    box.addEventListener('touchmove', function(e) {
        if (e.touches.length > 0) {
            const rect = box.getBoundingClientRect();
            const x = e.touches[0].clientX - rect.left;
            const y = e.touches[0].clientY - rect.top;
            spawnRipple(x, y);
        }
    });

    function spawnRipple(x, y) {
        ripples.push({
            x, y,
            r: 0,
            maxR: 80 + Math.random() * 40,
            alpha: 0.45 + Math.random() * 0.18,
            hue: 320 + Math.random() * 40, // pinkish
            t: 0
        });
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < ripples.length; i++) {
            const ripple = ripples[i];
            ripple.r += 1.8 + ripple.r * 0.04;
            ripple.t += 1;
            let fade = Math.max(0, ripple.alpha * (1 - ripple.t / 38));
            if (fade < 0.01 || ripple.r > ripple.maxR) {
                ripples.splice(i, 1); i--; continue;
            }
            // Darker iridescent gradient
            const grad = ctx.createRadialGradient(ripple.x, ripple.y, ripple.r * 0.2, ripple.x, ripple.y, ripple.r);
            grad.addColorStop(0, `rgba(255,220,245,${fade * 0.8})`);
            grad.addColorStop(0.4, `rgba(200,80,140,${fade * 0.5})`); // deeper pink
            grad.addColorStop(0.7, `rgba(120,60,180,${fade * 0.35})`); // purple
            grad.addColorStop(1, `rgba(200,80,140,0)`);
            ctx.beginPath();
            ctx.arc(ripple.x, ripple.y, ripple.r, 0, 2 * Math.PI);
            ctx.fillStyle = grad;
            ctx.fill();
        }
        requestAnimationFrame(draw);
    }
    draw();
})();

// Stats Section: Animate bars and counters
(function() {
    const statsSection = document.getElementById('stats-section');
    if (!statsSection) return;
    let animated = false;
    function animateStats() {
        if (animated) return;
        animated = true;
        // Animate bars
        document.querySelectorAll('.stats-bar-fill').forEach(bar => {
            const target = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => { bar.style.width = target; }, 100);
        });
        // Animate counters
        document.querySelectorAll('.stats-big').forEach(el => {
            const target = parseInt(el.textContent.replace(/,/g, ''));
            let current = 0;
            const duration = 1200;
            const steps = 40;
            const increment = Math.ceil(target / steps);
            function update() {
                current += increment;
                if (current > target) current = target;
                el.textContent = current.toLocaleString();
                if (current < target) setTimeout(update, duration / steps);
            }
            el.textContent = '0';
            update();
        });
    }
    // Use IntersectionObserver to trigger animation
    const observer = new window.IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) animateStats();
        });
    }, { threshold: 0.3 });
    observer.observe(statsSection);
})(); 