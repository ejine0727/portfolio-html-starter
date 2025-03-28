document.addEventListener('DOMContentLoaded', () => {
    // Floating Dots Container
    const dotsContainer = document.createElement('div');
    dotsContainer.id = 'floating-dots-container';
    dotsContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    document.body.appendChild(dotsContainer);

    // Create Floating Dots
    function createDot() {
        const dot = document.createElement('div');
        dot.classList.add('floating-dot');

        // Random size between 5 and 15 pixels
        const size = Math.random() * 10 + 5;
        dot.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(66, 64, 163, ${Math.random() * 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            animation: floatingDots ${Math.random() * 10 + 5}s linear infinite;
            animation-delay: -${Math.random() * 10}s;
        `;

        dotsContainer.appendChild(dot);
    }

    // Create 50-100 dots
    const dotCount = Math.floor(Math.random() * 50) + 50;
    for (let i = 0; i < dotCount; i++) {
        createDot();
    }

    // Abstract Background Container
    const backgroundContainer = document.createElement('div');
    backgroundContainer.id = 'abstract-background';
    backgroundContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        overflow: hidden;
        z-index: -2;
    `;
    document.body.appendChild(backgroundContainer);

    // SVG Namespace for creating shapes
    const svgNS = "http://www.w3.org/2000/svg";

    // Color Palette
    const colors = [
        'rgba(66, 64, 163, 0.1)',   // Deep Blue
        'rgba(255, 187, 0, 0.05)',  // Golden Yellow
        'rgba(230, 223, 255, 0.03)', // Light Lavender
    ];

    // Create SVG Background
    function createAbstractBackground() {
        const svg = document.createElementNS(svgNS, 'svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.style.position = 'absolute';

        // Generate multiple layers of abstract shapes
        for (let i = 0; i < 20; i++) {
            // Random shape type
            const shapeType = ['polygon', 'circle', 'rect'][Math.floor(Math.random() * 3)];
            const shape = document.createElementNS(svgNS, shapeType);

            // Randomize shape attributes
            switch(shapeType) {
                case 'polygon':
                    const points = Array.from({length: 5}, () => 
                        `${Math.random() * 100},${Math.random() * 100}`
                    ).join(' ');
                    shape.setAttribute('points', points);
                    break;
                case 'circle':
                    shape.setAttribute('cx', Math.random() * 100 + '%');
                    shape.setAttribute('cy', Math.random() * 100 + '%');
                    shape.setAttribute('r', Math.random() * 30 + 10);
                    break;
                case 'rect':
                    shape.setAttribute('x', Math.random() * 100 + '%');
                    shape.setAttribute('y', Math.random() * 100 + '%');
                    shape.setAttribute('width', Math.random() * 30 + 10);
                    shape.setAttribute('height', Math.random() * 30 + 10);
                    break;
            }

            // Style the shape
            shape.style.fill = colors[Math.floor(Math.random() * colors.length)];
            shape.style.opacity = Math.random() * 0.2;
            shape.style.transform = `rotate(${Math.random() * 360}deg)`;

            // Add animation
            shape.style.animation = `
                float ${Math.random() * 20 + 10}s 
                cubic-bezier(0.45, 0.05, 0.55, 0.95) 
                infinite alternate
            `;

            svg.appendChild(shape);
        }

        backgroundContainer.appendChild(svg);
    }

    // Global animation for floating effect
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes float {
            0% { transform: translateY(0) rotate(${Math.random() * 360}deg); }
            100% { transform: translateY(-50px) rotate(${Math.random() * 360}deg); }
        }

        @keyframes floatingDots {
            0% {
                transform: translateY(0) scale(0.5);
                opacity: 0.3;
            }
            50% {
                transform: translateY(-50px) scale(0.7);
                opacity: 0.6;
            }
            100% {
                transform: translateY(0) scale(0.5);
                opacity: 0.3;
            }
        }
    `;
    document.head.appendChild(styleSheet);

    // Generate background
    createAbstractBackground();

    // Optional: Regenerate background on window resize
    window.addEventListener('resize', () => {
        backgroundContainer.innerHTML = '';
        createAbstractBackground();
    });
});