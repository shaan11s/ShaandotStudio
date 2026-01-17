const canvas = document.getElementById('pixelCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
let img = new Image();
let pixelSize = 8;
let mouse = { x: null, y: null, radius: 100 };

// Array of images to choose from randomly
const images = ['imgs/city_r.jpeg', 'imgs/fence_r.jpeg', 'imgs/ipod_r.jpeg'];

// Pick a random image on page load
const randomIndex = Math.floor(Math.random() * images.length);
img.src = images[randomIndex];

img.onload = function() {
    initCanvas();
    createPixelGrid();
    animate();
};

function initCanvas() {
    const maxWidth = window.innerWidth * 0.9;
    const maxHeight = window.innerHeight * 0.85;
    const imgAspect = img.width / img.height;

    let canvasWidth = maxWidth;
    let canvasHeight = canvasWidth / imgAspect;

    if (canvasHeight > maxHeight) {
        canvasHeight = maxHeight;
        canvasWidth = canvasHeight * imgAspect;
    }

    // Round to nearest pixel size to avoid corner issues
    canvas.width = Math.floor(canvasWidth / pixelSize) * pixelSize;
    canvas.height = Math.floor(canvasHeight / pixelSize) * pixelSize;
}

// Function to check if a pixel position is part of the "S.S" text
function isPartOfLogo(x, y, canvasWidth, canvasHeight) {
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;

    // Normalize coordinates relative to center
    const relX = x - centerX;
    const relY = y - centerY;

    // Scale logo to fit canvas - more readable dimensions
    const letterWidth = 100;
    const letterHeight = 150;
    const dotSize = 25;
    const spacing = 50;
    const stroke = 25; // Thicker strokes for better readability

    // First S position (left)
    const s1X = -letterWidth - spacing;

    // Dot position (middle)
    const dotX = 0;

    // Second S position (right)
    const s2X = letterWidth + spacing;

    // Check if pixel is part of first S
    if (isPartOfS(relX, relY, s1X, 0, letterWidth, letterHeight, stroke)) {
        return true;
    }

    // Check if pixel is part of dot (positioned at bottom)
    const dotY = letterHeight/2 - dotSize/2; // Align with bottom of letters
    if (Math.abs(relX - dotX) <= dotSize/2 && relY >= dotY - dotSize/2 && relY <= dotY + dotSize/2) {
        return true;
    }

    // Check if pixel is part of second S
    if (isPartOfS(relX, relY, s2X, 0, letterWidth, letterHeight, stroke)) {
        return true;
    }

    return false;
}

function isPartOfS(relX, relY, centerX, centerY, width, height, stroke) {
    const x = relX - centerX;
    const y = relY - centerY;

    const halfW = width / 2;
    const halfH = height / 2;

    // Modern geometric S with rounded curves
    // Divide into 5 sections for smoother curves
    const sectionH = height / 5;

    // Top cap (rounded)
    if (y >= -halfH && y <= -halfH + sectionH) {
        // Top horizontal bar
        if (y >= -halfH && y <= -halfH + stroke && x >= -halfW && x <= halfW) {
            return true;
        }
        // Left vertical of top curve
        if (x >= -halfW && x <= -halfW + stroke && y >= -halfH && y <= -halfH + sectionH) {
            return true;
        }
        // Right vertical of top curve
        if (x >= halfW - stroke && x <= halfW && y >= -halfH && y <= -halfH + stroke * 1.5) {
            return true;
        }
    }

    // Upper curve transition
    if (y >= -halfH + sectionH && y <= -halfH + sectionH * 2) {
        if (x >= -halfW && x <= -halfW + stroke) {
            return true;
        }
    }

    // Middle section (diagonal transition) - thinner
    if (y >= -stroke/2 && y <= stroke/2) {
        if (x >= -halfW && x <= halfW) {
            return true;
        }
    }

    // Lower curve transition
    if (y >= halfH - sectionH * 2 && y <= halfH - sectionH) {
        if (x >= halfW - stroke && x <= halfW) {
            return true;
        }
    }

    // Bottom cap (rounded)
    if (y >= halfH - sectionH && y <= halfH) {
        // Bottom horizontal bar
        if (y >= halfH - stroke && y <= halfH && x >= -halfW && x <= halfW) {
            return true;
        }
        // Right vertical of bottom curve
        if (x >= halfW - stroke && x <= halfW && y >= halfH - sectionH && y <= halfH) {
            return true;
        }
        // Left vertical of bottom curve
        if (x >= -halfW && x <= -halfW + stroke && y >= halfH - stroke * 1.5 && y <= halfH) {
            return true;
        }
    }

    return false;
}

class Particle {
    constructor(x, y, color, isLogo) {
        this.x = x;
        this.y = y;
        this.originX = x;
        this.originY = y;
        this.color = color;
        this.size = pixelSize;
        this.vx = 0;
        this.vy = 0;
        this.friction = 0.95;
        this.ease = 0.1;
        this.affected = false;
        this.isLogo = isLogo; // True if this pixel is part of "S.S"
    }

    update() {
        // If this pixel is part of the logo, it never moves
        if (this.isLogo) {
            return;
        }

        // Only check mouse interaction if mouse position is valid
        if (mouse.x !== null && mouse.y !== null) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius) {
                this.affected = true;
                const angle = Math.atan2(dy, dx);
                const force = (mouse.radius - distance) / mouse.radius;

                this.vx -= Math.cos(angle) * force * 8;
                this.vy -= Math.sin(angle) * force * 8;
            }
        }

        if (this.affected) {
            this.vy += 0.3; // gravity
            this.vx *= this.friction;
            this.vy *= this.friction;

            this.x += this.vx;
            this.y += this.vy;

            // Don't reset - let them fall off screen completely
            if (this.y > canvas.height + 100) {
                // Keep them falling
                this.y = canvas.height + 100;
            }
        } else {
            const dx = this.originX - this.x;
            const dy = this.originY - this.y;
            this.x += dx * this.ease;
            this.y += dy * this.ease;
        }
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }

    reset() {
        this.x = this.originX;
        this.y = this.originY;
        this.vx = 0;
        this.vy = 0;
        this.affected = false;
    }
}

function createPixelGrid() {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < canvas.height; y += pixelSize) {
        for (let x = 0; x < canvas.width; x += pixelSize) {
            // Sample from the center of each pixel block for better color accuracy
            let sampleX = Math.min(x + Math.floor(pixelSize / 2), canvas.width - 1);
            let sampleY = Math.min(y + Math.floor(pixelSize / 2), canvas.height - 1);

            const index = (sampleY * canvas.width + sampleX) * 4;
            const r = imageData.data[index];
            const g = imageData.data[index + 1];
            const b = imageData.data[index + 2];

            // Always create particles (images should be fully opaque)
            const color = `rgb(${r},${g},${b})`;
            const isLogo = isPartOfLogo(x, y, canvas.width, canvas.height);
            particles.push(new Particle(x, y, color, isLogo));
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    requestAnimationFrame(animate);
}

// Mouse events
canvas.addEventListener('mousemove', function(e) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
});

canvas.addEventListener('mouseleave', function() {
    mouse.x = null;
    mouse.y = null;
});

// Touch events for mobile
canvas.addEventListener('touchstart', function(e) {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    mouse.x = touch.clientX - rect.left;
    mouse.y = touch.clientY - rect.top;
}, { passive: false });

canvas.addEventListener('touchmove', function(e) {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    mouse.x = touch.clientX - rect.left;
    mouse.y = touch.clientY - rect.top;
}, { passive: false });

canvas.addEventListener('touchend', function() {
    mouse.x = null;
    mouse.y = null;
});

window.addEventListener('resize', function() {
    particles = [];
    initCanvas();
    createPixelGrid();
});
