var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var mouse = {
    x: undefined,
    y: undefined
}

var colorArray = ["#D63031", "#B83227", "#67E6DC", "#F3B431", "#E74292"];
// window.addEventListener('');




window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;

});

class Circle {
    constructor(x, y, dx, dy, radius) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.draw = function () {
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            // c.strokeStyle = `${colorArray[Math.floor(Math.random() * colorArray.length)]}`;
            //c.fill = colorArray[Math.floor(Math.random() * colorArray.length)];
            // c.fillStyle(colorArray[Math.floor(Math.random() * colorArray.length)]);
            c.fill = colorArray[Math.floor(Math.random() * colorArray.length)];
            c.stroke();
        };
        this.update = function () {

            if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
                this.dx = -this.dx;
            }
            if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
                this.dy = -this.dy;
            }
            this.x += this.dx;
            this.y += this.dy;
            //interactivity

            if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
                if (this.radius < 40) {
                    this.radius += 1;
                }
            }
            else if (this.radius > 2) {
                this.radius -= 1;
            }
            this.draw();
        };
    }
}


var circleArray = [];
for (let i = 0; i < 500; i++) {
    var radius = 90;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = (Math.random() - 0.5);
    var dy = (Math.random() - 0.5);
    circleArray.push(new Circle(x, y, dx, dy, radius));
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}

animate();

