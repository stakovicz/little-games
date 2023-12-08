class Ball {
    constructor() {
        this.x = width / 2;
        this.y = height / 2;
        this.xspeed = 0;
        this.yspeed = 0;
        this.r = 12;

        this.color = [255,255,255];

        this.reset();
    }

    checkPaddleLeft(p) {
        if (
            this.y - this.r < p.y + p.h / 2 &&
            this.y + this.r > p.y - p.h / 2 &&
            this.x - this.r < p.x + p.w / 2
        ) {
            if (this.x > p.x) {
                let diff = this.y - (p.y - p.h / 2);
                let rad = radians(45);
                let angle = map(diff, 0, p.h, -rad, rad);
                this.xspeed = speed * cos(angle);
                this.yspeed = speed * sin(angle);
                this.x = p.x + p.w / 2 + this.r;

                return true;
            }
        }
    }
    checkPaddleRight(p) {
        if (
            this.y - this.r < p.y + p.h / 2 &&
            this.y + this.r > p.y - p.h / 2 &&
            this.x + this.r > p.x - p.w / 2
        ) {
            if (this.x < p.x) {
                let diff = this.y - (p.y - p.h / 2);
                let angle = map(diff, 0, p.h, radians(225), radians(135));
                this.xspeed = speed * cos(angle);
                this.yspeed = speed * sin(angle);
                this.x = p.x - p.w / 2 - this.r;

                return true;
            }
        }
    }

    update() {
        this.x += this.xspeed;
        this.y += this.yspeed;
    }

    reset() {
        speed = 3;
        this.x = width / 2;
        this.y = height / 2;
        let angle = random(-PI / 4, PI / 4);
        this.xspeed = speed * Math.cos(angle);
        this.yspeed = speed * Math.sin(angle);

        this.color = [
            floor(random(255)),
            floor(random(255)),
            floor(random(255))
        ];
    }

    edges() {
        if (this.y < 0 || this.y > height) {
            this.yspeed *= -1;
        }

        if (this.x - this.r > width) {
            leftscore++;
            this.reset();
        }

        if (this.x + this.r < 0) {
            rightscore++;
            this.reset();
        }
    }

    show() {
        fill(this.color[0], this.color[1], this.color[2]);
        ellipse(this.x, this.y, this.r * 2);
    }
}
