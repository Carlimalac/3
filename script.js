let t = 0; 
let points = []; 
let mode = 0; 
let popupVisible = true;
let modeDurations = [1, 1, 15, 15]; 
let modeTimer = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(60);

    
    for (let i = 0; i < 200; i++) {
        points.push(createVector(random(width), random(height)));
    }

    
    document.body.addEventListener('click', () => {
        if (popupVisible) {
            document.getElementById('popup').style.display = 'none';
            popupVisible = false;
        }
    });
}

function draw() {
    background(0); 

    let lineColor = color(random(255), random(255), random(255)); 

    if (mode === 0) {
        drawSpiral(lineColor); 
    } else if (mode === 1) {
        drawWaveSimple(lineColor); 
    } else if (mode === 2) {
        drawWaveEffect(lineColor); 
    } else if (mode === 3) {
        drawDots(lineColor); 
    }

    t += 0.05; 

    modeTimer += deltaTime / 1000; 

    
    if (modeTimer > modeDurations[mode]) {
        modeTimer = 0; 
        mode = (mode + 1) % modeDurations.length; 
    }
}


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


function drawWaveEffect(lineColor) {
    stroke(lineColor);
    noFill();

    beginShape();
    for (let x = 0; x < width; x++) {
        let y = height / 2 + sin(TWO_PI * (x / 150) + t) * 100;
        vertex(x, y);

        
        if (dist(x, y, mouseX, mouseY) < 200) {
            strokeWeight(2);
            line(x, y, mouseX, mouseY);

            
            ellipse(x, y, 5, 5);
        }
    }
    endShape();
}


function drawDots(lineColor) {
    stroke(lineColor);
    strokeWeight(4);

    for (let i = 0; i < points.length; i++) {
        let p = points[i];
        point(p.x, p.y);

        
        line(mouseX, mouseY, p.x, p.y);
    }
}


function mousePressed() {
    points.push(createVector(mouseX, mouseY));
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
