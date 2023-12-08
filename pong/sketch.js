// port of Daniel Shiffman's Pong coding challenge
// by madacoo

let leftscore = 0;
let rightscore = 0;
let speed = 3;

function setup() {
    createCanvas(600, 400);
    puck = new Ball();
    left = new Player(true);
    right = new Player(false);
}

function draw() {
    background(0);

    if(puck.checkPaddleRight(right)) {
        speed ++;
    }
    if(puck.checkPaddleLeft(left)) {
        speed ++;
    }

    left.show();
    right.show();
    left.update();
    right.update();

    puck.update();
    puck.edges();
    puck.show();

    fill(255);
    textSize(32);
    text(leftscore, 32, 40);
    text(rightscore, width - 64, 40);
}

function keyReleased() {
    left.move(0);
    right.move(0);
}

function keyPressed() {
    if (key == 'a') {
        left.move(-10);
    } else if (key == 'q') {
        left.move(10);
    }

    if (key == 'p') {
        right.move(-10);
    } else if (key == 'm') {
        right.move(10);
    }
}
