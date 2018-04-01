var can = document.getElementById("can");
var ctx = can.getContext("2d");


var angle = 0, outer_angle = 0;
var points = [];
var rand = Math.random();
var settings = {
    "total particles": 200,
    "total circles": 8,
    "outer radius": 200,
    "inner radius": 50,
    rand: Math.random(),
    a: { constant: rand * 15.0 },
    b: { constant: rand * 15.0 }
};
var settings_copy = {};
function resize() {
    can.width = window.innerWidth;
    can.height = window.innerHeight;
}
function lerp(a, b, t) {
    return (1 - t) * a + t * b;
}

function x(offset, angle, r) {
    if (!r) r = settings["inner radius"];
    return offset + Math.sin(angle) * r;
}
function y(offset, angle, r) {
    if (!r) r = settings["inner radius"];
    return offset + Math.cos(angle) * r;
}
function setup() {
    points = [];
    for (var i = 0; i < settings["total circles"]; ++i) {
        points.push({
            angle: Math.random() * Math.PI * 2
        });
    }
}
function draw() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, can.width, can.height);

    var circles = settings["total circles"];
    var center = {
        x: can.width / 2,
        y: can.height / 2
    };

    for (var i = 0; i < circles; ++i) {
        if (JSON.stringify(settings_copy) != JSON.stringify(settings)) {
            setup();
            settings_copy = Object.assign({}, settings);
        }
        ctx.fillStyle = "#fff";
        var ang = outer_angle + i * 2 * Math.PI / circles;
        var point = {
            x: x(center.x, ang, settings["outer radius"]),
            y: y(center.y, ang, settings["outer radius"])
        };
        var inner_point = {
            x: x(point.x, points[i].angle),
            y: y(point.y, points[i].angle)
        }
        ctx.beginPath();
        ctx.arc(inner_point.x, inner_point.y, 5, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();

        var total = settings["total particles"];


        var ang1 = outer_angle + (i + 1) * 2 * Math.PI / circles;
        var point1 = {
            x: x(center.x, ang1, settings["outer radius"]),
            y: y(center.y, ang1, settings["outer radius"])
        };


        for (var j = 0; j < total; ++j) {
            ctx.beginPath();
            var between = j / total;
            var temp = {
                x: lerp(
                    x(point.x, points[i].angle - between * settings.a.constant),
                    x(point1.x, points[(i + 1) % circles].angle - (1 - between) * settings.b.constant),
                    between
                ),
                y: lerp(
                    y(point.y, points[i].angle - between * settings.a.constant),
                    y(point1.y, points[(i + 1) % circles].angle - (1 - between) * settings.b.constant),
                    between
                )
            };
            ctx.arc(temp.x, temp.y, 1, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
        }
    }


    for (var i = 0; i < circles; ++i) {
        points[i].angle += Math.PI / 120;
    }
    outer_angle += Math.PI / 1800;
    requestAnimationFrame(draw);
}
window.onresize = resize;
resize();
draw();