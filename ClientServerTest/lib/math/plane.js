
var Plane = function (x, y, x2, y2) {
    this.x = x;
    this.y = y;
    this.x2 = x2;
    this.y2 = y2;
};

Plane.prototype.lineLength = function () {
    var x = this.x;
    var y = this.y;
    var x2 = this.x2;
    var y2 = this.y2;

    var length = Math.sqrt((x -= x2) * x + (y -= y2) * y);
    return length;
};

Plane.prototype.closetPointOnLine = function (px, py) {
    var APx = px - this.x;
    var APy = py - this.y;
    var ABx = this.x2 - this.x;
    var ABy = this.y2 - this.y;
    var ab2 = ABx * ABx + ABy * ABy;
    var ap_ab = APx * ABx + APy * ABy;
    var t = ap_ab / ab2;

    if (t < 0.0) t = 0.0;
    else if (t > 1.0) t = 1.0;

    return {
        x: this.x + ABx * t,
        y: this.y + ABy * t
    };
};
Plane.prototype.normal = function (px, py) {
    var cx = this.closetPointOnLine(px, py).x;
    var cy = this.closetPointOnLine(px, py).y;
    var length_closest_to_player = lineLength(px, py, cx, cy);

    return {
        nx: ((px - cx) / length_closest_to_player),
        ny: ((py - cy) / length_closest_to_player)
    };
};

Plane.prototype.lineNormal = function () {
    var ax = this.x, bx = this.x2, ay = this.y, by = this.y2;

    var vx2 = bx - ax;
    var vy2 = by - ay;

    var length = Math.sqrt(vx2 * vx2 + vy2 * vy2);

    return {
        nx: (vy2) / length,
        ny: (-vx2) / length
    };

};

Plane.prototype.slidingPlane = function (px, py, vx, vy) {
    var nx = this.normal(px, py).nx;
    var ny = this.normal(px, py).ny;
    var dotN = ((vx * nx) + (vy * ny));
    vx -= nx * dotN;
    vy -= ny * dotN;
    return {
        vx: vx,
        vy: vy
    };
};
Plane.prototype.VdotN = function (vx, vy) {
    var line_normal_x = this.lineNormal().nx;
    var line_normal_y = this.lineNormal().ny;
    var VdotN = vx * line_normal_x + vy * line_normal_y;
    return VdotN;
};

Plane.prototype.isFacingPlane = function (vx, vy) {
    return (this.VdotN(vx, vy) < 0);
};
Plane.prototype.distance = function (px, py) {
    var cx = this.closetPointOnLine(px, py).x;
    var cy = this.closetPointOnLine(px, py).y;
    var distance = lineLength(px, py, cx, cy);
    return distance - SPHERE_RADIUS;
};
Plane.prototype.isOnLine = function (px, py) {
    return (this.distance(px, py) < 0);
};
Plane.prototype.collisionAmount = function (px, py) {
    var dist = this.distance(px, py);
    if (dist < 0) {
        return dist;
    }
    return 0;
};
//This might only work on one direction if player facing the  plane
Plane.prototype.pushVectorLineNormal = function (px, py) {
    var dist = this.distance(px, py);
    if (dist < 0) {
        return {
            vx: (Math.abs(dist) * this.lineNormal().nx),
            vy: (Math.abs(dist) * this.lineNormal().ny)
        };
    }
    return {
        vx: 0,
        vy: 0
    };
};
Plane.prototype.time = function (px, py, vx, vy) {
    var timeOfImpact = 1.0;
    var current_time = (this.distance(px, py) / Math.abs(this.VdotN(vx, vy)));
    if (current_time < timeOfImpact) {
        return current_time;
    }
    else {
        return timeOfImpact;
    }
};