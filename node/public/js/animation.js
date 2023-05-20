// HEADER PACK FROM: https://tympanus.net/Development/AnimatedHeaderBackgrounds/

(function() {
    let width; let height; let largeHeader; let canvas; let ctx; let points; let target; let animateHeader = true;

    // Main
    InitHeader();
    InitAnimation();
    AddListeners();

    /**
     *
     */
    function InitHeader() {
        width = window.innerWidth;
        height = window.innerHeight;
        target = { x: width/2, y: height/2 };

        largeHeader = document.getElementById('large-header');
        largeHeader.style.height = height+'px';

        canvas = document.getElementById('demo-canvas');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');

        // create points
        points = [];
        for (let x = 0; x < width; x = x + width/20) {
            for (let y = 0; y < height; y = y + height/20) {
                const px = x + Math.random()*width/20;
                const py = y + Math.random()*height/20;
                const p = { x: px, originX: px, y: py, originY: py };
                points.push(p);
            }
        }

        // for each point find the 5 closest points
        for (let i = 0; i < points.length; i++) {
            const closest = [];
            const p1 = points[i];
            for (let j = 0; j < points.length; j++) {
                const p2 = points[j];
                if (!(p1 == p2)) {
                    let placed = false;
                    for (let k = 0; k < 5; k++) {
                        if (!placed) {
                            if (closest[k] == undefined) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }

                    for (let k = 0; k < 5; k++) {
                        if (!placed) {
                            if (GetDistance(p1, p2) < GetDistance(p1, closest[k])) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }
                }
            }
            p1.closest = closest;
        }

        // assign a circle to each point
        for (const i in points) {
            if (Object.prototype.hasOwnProperty.call(points, i)) {
                const c = new Circle(points[i], 2+Math.random()*2, 'rgba(255,255,255,0.3)');
                points[i].circle = c;
            }
        }

        return;
    }

    /**
     * Adds eventlisteners to the window
     *
     * @return {void} void
     */
    function AddListeners() {
        if (!('ontouchstart' in window)) {
            window.addEventListener('mousemove', MouseMove);
        }
        window.addEventListener('scroll', ScrollCheck);
        window.addEventListener('Resize', Resize);

        return;
    }

    /**
     * @param {event} e is the event
     *
     * @return {void} void
     */
    function MouseMove(e) {
        let posx = posy = 0;
        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        }
        else if (e.clientX || e.clientY) {
            posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        target.x = posx;
        target.y = posy;

        return;
    }

    /**
     * If the user scrolls down, the animation stops
     *
     * @return {void} void
     */
    function ScrollCheck() {
        if (document.body.scrollTop > height) animateHeader = false;
        else animateHeader = true;

        return;
    }

    /**
     * Resizees the canvas
     *
     * @return {void} void
     */
    function Resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        largeHeader.style.height = height + 'px';
        canvas.width = width;
        canvas.height = height;

        return;
    }

    /**
     * Initializes the animation
     *
     * @return {void} void
     */
    function InitAnimation() {
        Animate();

        for (const i in points) {
            if (Object.prototype.hasOwnProperty.call(points, i)) {
                ShiftPoint(points[i]);
            }
        }

        return;
    }

    /**
     * Animates the canvas
     *
     * @return {void} void
     */
    function Animate() {
        if (animateHeader) {
            ctx.clearRect(0, 0, width, height);
            for (const i in points) {
                if (Object.prototype.hasOwnProperty.call(points, i)) {
                    // detect points in range
                    if (Math.abs(GetDistance(target, points[i])) < 4000) {
                        points[i].active = 0.3;
                        points[i].circle.active = 0.6;
                    }
                    else if (Math.abs(GetDistance(target, points[i])) < 20000) {
                        points[i].active = 0.1;
                        points[i].circle.active = 0.3;
                    }
                    else if (Math.abs(GetDistance(target, points[i])) < 40000) {
                        points[i].active = 0.02;
                        points[i].circle.active = 0.1;
                    }
                    else {
                        points[i].active = 0;
                        points[i].circle.active = 0;
                    }

                    DrawLines(points[i]);
                    points[i].circle.draw();
                }
            }
        }
        requestAnimationFrame(Animate);

        return;
    }

    /**
     * Shifts the point
     *
     * @param {number} p point
     *
     * @return {void} void
     */
    function ShiftPoint(p) {
        TweenLite.to(p, 1+1*Math.random(), { x: p.originX-50+Math.random()*100,
            y: p.originY-50+Math.random()*100, ease: Circ.easeInOut,
            onComplete: function() {
                ShiftPoint(p);
            } });

        return;
    }

    /**
     * Draws the lines
     *
     * @param {number} p
     *
     * @return {void} void
     */
    function DrawLines(p) {
        if (!p.active) return;
        for (const i in p.closest) {
            if (Object.prototype.hasOwnProperty.call(p.closest, i)) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p.closest[i].x, p.closest[i].y);
                ctx.strokeStyle = 'rgba(156,217,249,'+ p.active+')';
                ctx.stroke();
            }
        }

        return;
    }

    /**
     * Draw a circle
     *
     * @param {number} pos
     * @param {number} rad
     * @param {string} color
     */
    function Circle(pos, rad, color) {
        const _this = this;

        // constructor
        (function() {
            _this.pos = pos || null;
            _this.radius = rad || null;
            _this.color = color || null;
        })();

        this.draw = function() {
            if (!_this.active) return;
            ctx.beginPath();
            ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'rgba(156,217,249,'+ _this.active+')';
            ctx.fill();
        };

        return;
    }

    /**
     * Get the distance between two points
     *
     * @param {number} p1
     * @param {number} p2
     *
     * @return {number} distance
     */
    function GetDistance(p1, p2) {
        return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    }
})();
