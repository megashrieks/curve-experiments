var can = document.getElementById("can");
var ctx = can.getContext("2d");

const radius = 50;

var angle = 0, angle1 = 0;

var settings = {
    "total particles": 500,
    a: { constant: 1.0 },
    b: { constant: 1.0 }
};

function resize() {
    can.width = window.innerWidth;
    can.height = window.innerHeight;
}
function lerp(a, b, t) {
    return (1 - t) * a + t * b;
}

function x(offset, angle) {
    return offset + Math.sin(angle) * radius;
}
function y(offset, angle) {
    return offset + Math.cos(angle) * radius;
}

function draw() {
    ctx.clearRect(0, 0, can.width, can.height);

    ctx.fillStyle = "#000";

    var a = {
        x: x(can.width * 0.25, angle),
        y: y(can.height / 2, angle)
    }
    var b = {
        x: x(can.width * 0.75, angle1),
        y: y(can.height / 2, angle1)
    }
    ctx.beginPath();
    ctx.arc(a.x, a.y, 3, 0, Math.PI * 2);

    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(b.x, b.y, 3, 0, Math.PI * 2);

    ctx.closePath();
    ctx.fill();
    var total = settings["total particles"];
    for (var i = 0; i < total; ++i) {
        ctx.beginPath();
        var between = i / total;
        var temp = {
            x: lerp(
                x(can.width * 0.25, angle - between * settings.a.constant),
                x(can.width * 0.75, angle1 - (1 - between) * settings.b.constant),
                between
            ),
            y: lerp(
                y(can.height / 2, angle - between * settings.a.constant),
                y(can.height / 2, angle1 - (1 - between) * settings.b.constant),
                between
            )
        };
        ctx.arc(temp.x, temp.y, 1, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }


    angle += Math.PI / 60;
    angle1 += Math.PI / 60;
    requestAnimationFrame(draw);
}
window.onresize = resize;
resize();
draw();