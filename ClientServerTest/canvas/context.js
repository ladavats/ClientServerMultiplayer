class Context {
    constructor(contextName) {
        this.canvas = document.getElementById(contextName);
        if (this.canvas == null) {
            //could not init context.
        }
        this.context = this.canvas.getContext('2d');
    }

    clearRect() {
        this.context.clearRect(0, 0, 1000, 500);
    }

    drawCircle(x, y, radius, color) {
        this.context.beginPath();
        this.context.arc(x, y, radius, 0, 2 * Math.PI, false);
        this.context.fillStyle = color;
        this.context.fill();
        this.context.lineWidth = 5;
        this.context.strokeStyle = '#003300';
        this.context.stroke();
    }

    drawText(messageText,x,y) {
        this.context.fillStyle = "white";
        this.context.font = "bold 16px Arial";
        this.context.fillText(messageText, x, y);
    }
}