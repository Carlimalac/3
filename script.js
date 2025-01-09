let t = 0; // Time variable to control animations
let points = []; // Stores points for dots in the "dots mode"
let mode = 0; // Tracks the current animation (spiral, wave simple, wave effect, dots)
let popupVisible = true;
let modeDurations = [1, 1, 15, 15]; // Durations: Spiral (1s), Simple Wave (1s), Enhanced Wave (15s), Interactive Dots (15s)
let modeTimer = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(60);

    // Initial points for the dots
    for (let i = 0; i < 200; i++) {
        points.push(createVector(random(width), random(height)));
    }

    // Handle click to dismiss the popup
    document.body.addEventListener('click', () => {
        if (popupVisible) {
            document.getElementById('popup').style.display = 'none';
            popupVisible = false;
        }
    });
}

function draw() {
    background(0); // Black background

    let lineColor = color(random(255), random(255), random(255)); // Vibrant line colors

    if (mode === 0) {
        drawSpiral(lineColor); // Spiral
    } else if (mode === 1) {
        drawWaveSimple(lineColor); // Simple Wave
    } else if (mode === 2) {
        drawWaveEffect(lineColor); // Enhanced Wave Effect
    } else if (mode === 3) {
        drawDots(lineColor); // Interactive Dots
    }

    t += 0.05; // Control animation speed

    modeTimer += deltaTime / 1000; // Increment mode timer in seconds

    // Check if it's time to switch modes
    if (modeTimer > modeDurations[mode]) {
        modeTimer = 0; // Reset timer
        mode = (mode + 1) % modeDurations.length; // Cycle through modes
    }
}

// Spiral Animation
function drawSpiral(lineColor) {
    stroke(lineColor);
    noFill();

    beginShape();
    for (let i = 0; i < 500; i++) {
        let angle = 0.1 * i;
        let radius = 2 * angle;
        let x = width / 2 + cos(angle + t) * radius;
        let y = height / 2 + sin(angle + t) * radius;
        vertex(x, y);
    }
    endShape();
}

// Simple Wave Animation
function drawWaveSimple(lineColor) {
    stroke(lineColor);
    noFill();

    beginShape();
    for (let x = 0; x < width; x++) {
        let y = height / 2 + sin(TWO_PI * (x / 150) + t) * 100;
        vertex(x, y);
    }
    endShape();
}

// Enhanced Wave Effect Animation
function drawWaveEffect(lineColor) {
    stroke(lineColor);
    noFill();

    beginShape();
    for (let x = 0; x < width; x++) {
        let y = height / 2 + sin(TWO_PI * (x / 150) + t) * 100;
        vertex(x, y);

        // Add enhanced connection effect between wave points and mouse
        if (dist(x, y, mouseX, mouseY) < 200) {
            strokeWeight(2);
            line(x, y, mouseX, mouseY);

            // Add additional particles for visual effect
            ellipse(x, y, 5, 5);
        }
    }
    endShape();
}

// Interactive Dots Animation
function drawDots(lineColor) {
    stroke(lineColor);
    strokeWeight(4);

    for (let i = 0; i < points.length; i++) {
        let p = points[i];
        point(p.x, p.y);

        // Connect dots to the mouse
        line(mouseX, mouseY, p.x, p.y);
    }
}

// Add new points when clicking
function mousePressed() {
    points.push(createVector(mouseX, mouseY));
}

// Resize canvas on window resize
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
