let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];
let available = [];

let ai = 'X';
let human = 'O';

let w;
let h;

let wait = false;

function setup() {
    createCanvas(400, 400);
    frameRate(5);

    background(255);
    strokeWeight(8);
    noFill();

    w = width / 3;
    h = height / 3;

    stroke(0);
    line(w, 0, w, height);
    line(w * 2, 0, w * 2, height);
    line(0, h, width, h);
    line(0, h * 2, width, h * 2);
    stroke(0);

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            available.push([i, j]);
        }
    }
}

function draw() {

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let x = w * i + w / 2;
            let y = h * j + h / 2;
            let spot = board[i][j];

            if (spot === ai) {
                let xr = w / 4;
                line(x - xr, y - xr, x + xr, y + xr);
                line(x + xr, y - xr, x - xr, y + xr);
                stroke(0);
            } else if (spot === human) {
                ellipse(x, y, w / 2);
                stroke(0);
            }
        }
    }
}


function mouseReleased() {

    if (true === wait) {
        return;
    }

    let i = floor(mouseX / w);
    let j = floor(mouseY / h);

    // bloquer si il y a déjà quelqu'un
    if (board[i][j] !== '') {
        return;
    }

    board[i][j] = human;

    // remove from available
    available = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                available.push([i, j]);
            }
        }
    }

    if (!victory()) {
        wait = true;
        setTimeout(function () {
            nextTurnO();
        }, 500);
    }
}

function equals3(a, b, c) {
    return a === b && b === c && a !== '';
}

function checkWinner() {
    let winner = null;

    // horizontal
    for (let i = 0; i < 3; i++) {
        if (equals3(board[i][0], board[i][1], board[i][2])) {
            winner = board[i][0];
        }
    }

    // Vertical
    for (let i = 0; i < 3; i++) {
        if (equals3(board[0][i], board[1][i], board[2][i])) {
            winner = board[0][i];
        }
    }

    // Diagonal
    if (equals3(board[0][0], board[1][1], board[2][2])) {
        winner = board[0][0];
    }
    if (equals3(board[2][0], board[1][1], board[0][2])) {
        winner = board[2][0];
    }

    let openSpots = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] == '') {
                openSpots++;
            }
        }
    }

    if (winner == null && openSpots == 0) {
        return 'tie';
    }

    return winner;
}

function nextTurnO() {

    stupid();
    // bestMove();
    victory();
    wait = false;
}

function stupid() {
    let index = floor(random(available.length));
    let turn = available.splice(index, 1)[0];

    if (!turn) {
        return;
    }

    let i = turn[0];
    let j = turn[1];

    board[i][j] = ai;
}

function victory() {

    let winner = checkWinner();
    console.log(winner);
    if (null !== winner) {

        let t = 'Bravo ' + winner + ' !';
        if (winner === 'tie') {
            t = 'Match nul !';
        }

        createP(t)
            .style('font-family', 'Arial')
            .style('font-size', '32pt');
        noLoop();
        return true;
    }
    return false;
}