// Loader Animation Logic
(function() {
    const loader = document.getElementById('loader');
    const barBg = document.querySelector('.loader-progress-bar-bg');
    const bar = document.getElementById('loaderBar');
    const counter = document.getElementById('loaderCounter');
    const mainContent = document.getElementById('mainContent');
    let progress = 0;
    let interval;

    // Add static gray bar
    let staticBar = document.createElement('div');
    staticBar.className = 'loader-progress-bar-static';
    barBg.appendChild(staticBar);

    // Pad number to 3 digits
    function pad(num) {
        return num.toString().padStart(3, '0');
    }

    // Animate progress bar and counter
    function startLoader() {
        interval = setInterval(() => {
            progress++;
            if (progress > 100) progress = 100;
            bar.style.width = (progress * 3.0) + 'px'; // 0 to 300px
            staticBar.style.width = (300 - (progress * 3.0)) + 'px';
            counter.textContent = pad(progress);
            if (progress === 100) {
                clearInterval(interval);
                setTimeout(showLShape, 200);
            }
        }, 12); // moderate speed
    }

    // L-shape transformation
    function showLShape() {
        document.querySelector('.loader-progress-bar-wrapper').style.display = 'none';
        const lShape = document.createElement('div');
        lShape.className = 'loader-l-shape';
        lShape.innerHTML = `
            <div class="loader-l-vertical" id="lVert"></div>
            <div class="loader-l-horizontal" id="lHorz"></div>
        `;
        loader.appendChild(lShape);
        // Animate vertical bar
        setTimeout(() => {
            document.getElementById('lVert').style.height = '180px';
            setTimeout(() => {
                // Animate horizontal bar after vertical is done
                document.getElementById('lHorz').style.width = '160px';
                setTimeout(() => {
                    lShape.classList.add('zoom');
                    setTimeout(finishLoader, 700);
                }, 400);
            }, 400);
        }, 100);
        // Counter stays visible until zoom
    }

    // Zoom-in and reveal main content
    function finishLoader() {
        loader.classList.add('hide');
        counter.style.opacity = 0;
        setTimeout(() => {
            loader.style.display = 'none';
            mainContent.style.opacity = 1;
            mainContent.style.pointerEvents = 'auto';
        }, 600);
    }

    // Start loader on DOMContentLoaded
    document.addEventListener('DOMContentLoaded', startLoader);
})(); 