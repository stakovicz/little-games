// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/AaGK-fj-BAM

let s;
let scl = 20;   // Taille de base des éléments

let food;
let run = true; // On est en pause ?

let width = 600;
let height = 600;

let total; // afficher le total
let result; // Afficher le Perdu !

let speed = 5;

function setup() {
    createCanvas(width, height);

    s = new Snake();
    frameRate(speed);
    pickLocation();

    total = document.getElementById('total');
    result = createDiv('').id('result');
}

// On place une pomme
function pickLocation() {
    let cols = floor(width / scl);
    let rows = floor(height / scl);
    food = createVector(floor(random(cols)), floor(random(rows)));
    food.mult(scl);
}


function draw() {

    // Fond blanc
    background(255, 255, 255);

    // Si on a mangé une pomme
    if (s.eat(food)) {
        pickLocation();
        // Affiche le total
        total.innerHTML = s.total;

        // On augment la vitesse de 0,5
        speed = speed + 1 / 2;
        frameRate(speed);
    }

    // On vérifie si on est mort
    s.death();

    // Si on est mort
    if (s.end) {
        // On affiche Perdu!
        result.html('Perdu! <a href="./index.html">RECOMMENCER</a>');
        // On arrête le jeu
        noLoop();
    }

    // On déplace le serpent
    s.update();

    // On affiche le serpent
    s.show();

    // Affichage de la pomme
    colorMode(RGB);
    fill(255, 0, 0);
    rect(food.x, food.y, scl, scl);

    // Affichage du contour
    line(0, 0, 0, height);
    line(0, 0, width, 0);
    line(width, 0, width, height);
    line(0, height, width, height);
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        s.dir(0, -1);
    } else if (keyCode === DOWN_ARROW) {
        s.dir(0, 1);
    } else if (keyCode === RIGHT_ARROW) {
        s.dir(1, 0);
    } else if (keyCode === LEFT_ARROW) {
        s.dir(-1, 0);
        // pause
    } else if (keyCode === ESCAPE) {
        if (run) {
            noLoop();
            run = false;
        } else {
            loop();
            run = true;
        }
    }
}
