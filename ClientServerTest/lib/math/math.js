//point, line first point, line second point.
var closetPointOnLine = function (px, py, x, y, x2, y2) {
    var APx = px - x;
    var APy = py - y;
    var ABx = x2 - x;
    var ABy = y2 - y;
    var ab2 = ABx * ABx + ABy * ABy;
    var ap_ab = APx * ABx + APy * ABy;
    var t = ap_ab / ab2;

    if (t < 0.0) t = 0.0;
    else if (t > 1.0) t = 1.0;

    return {
        x: x + ABx * t,
        y: y + ABy * t
    };
};

var lineLength = function (x, y, x2, y2) {
    return Math.sqrt((x -= x2) * x + (y -= y2) * y);
};

var lineNormal = function (x, y, x2, y2) {
    var ax = x, bx = x2, ay = y, by = y2;
    var vx2 = bx - ax;
    var vy2 = by - ay;

    var length = Math.sqrt(vx2 * vx2 + vy2 * vy2);

    return {
        nx: (vy2) / length,
        ny: (-vx2) / length
    };

};