var sPlane = function (a, b) {
    this.a = a;
    this.b = b;
};
sPlane.prototype.closetPointOnLine = function (p) {

    var x = this.a.x;
    var y = this.a.y;
    var x2 = this.b.x;
    var y2 = this.b.y;

    var px = p.x;
    var py = p.y;

    var APx = px - x;
    var APy = py - y;
    var ABx = x2 - x;
    var ABy = y2 - y;
    var ab2 = ABx * ABx + ABy * ABy;
    var ap_ab = APx * ABx + APy * ABy;
    var t = ap_ab / ab2;

    if (t < 0.0) t = 0.0;
    else if (t > 1.0) t = 1.0;

    var res_x = x + ABx * t;
    var res_y = y + ABy * t;

    var closest = Victor(res_x, res_y);

    return closest;

};

//var vPos = Victor(350, 240);


//var a = Victor(100, 100);
//var b = Victor(400, 400);


//var t1 = Victor(400, 400);
//var t2 = Victor(600, 80);

//var splane1 = new sPlane(a, b);
//var splane2 = new sPlane(t1, t2);