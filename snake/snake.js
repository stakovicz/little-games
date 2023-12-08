// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/AaGK-fj-BAM

function Snake() {
    this.x = 0;
    this.y = 0;
    this.xspeed = 1;
    this.yspeed = 0;
    this.total = 0;
    this.tail = [];
    this.end = false;

    this.eat = function(pos) {
        let d = dist(this.x, this.y, pos.x, pos.y);
        if (d < 1) {
            this.total++;
            return true;
        } else {
            return false;
        }
    };

    this.dir = function(x, y) {
        this.xspeed = x;
        this.yspeed = y;
    };

    this.death = function() {
        for (let i = 0; i < this.tail.length; i++) {
            let pos = this.tail[i];
            let d = dist(this.x, this.y, pos.x, pos.y);
            if (d < 1) {
                this.end = true;
                this.total = 0;
                this.tail = [];
            }
        }
    };

    this.update = function() {
        for (let i = 0; i < this.tail.length - 1; i++) {
            this.tail[i] = this.tail[i + 1];
        }
        if (this.total >= 1) {
            this.tail[this.total - 1] = createVector(this.x, this.y);
        }

        this.x = this.x + this.xspeed * scl;
        this.y = this.y + this.yspeed * scl;

        this.x = constrain(this.x, 0, width - scl);
        this.y = constrain(this.y, 0, height - scl);
    };

    this.show = function() {
        colorMode(RGB);
        fill(0, 0, 255);

        let w = scl;
        for (let i = 0; i < this.tail.length; i++) {
            w = scl/(this.tail.length-i+1) + scl/3;
            ellipse(this.tail[i].x + scl/2, this.tail[i].y + scl/2, w, w);
        }

        ellipse(this.x + scl/2, this.y + scl/2, scl, scl);
    };

}
