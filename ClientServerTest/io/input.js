class Input {
    constructor() {
        this.mouseX = 0;
        this.mouseY = 0;
    }

    findPos(obj) {
        var curleft = 0, curtop = 0;
        if (obj.offsetParent) {
            do {
                curleft += obj.offsetLeft;
                curtop += obj.offsetTop;
            } while (obj = obj.offsetParent);
            return { x: curleft, y: curtop };
        }
        return undefined;
    }

    setMousePosition(x,y) {
        var pos = this.findPos(this);
        this.mouseX = x - pos.x;
        this.mouseY = y - pos.y;
    }
}

