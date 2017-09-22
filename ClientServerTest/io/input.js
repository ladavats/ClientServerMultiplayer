class Input {

    constructor(canvas) {
        this.mouseX = 0;
        this.mouseY = 0;



        canvas.addEventListener('mousemove', function (evt) {
            var rect = canvas.getBoundingClientRect();

            this.mouseX = (evt.clientX - rect.left);
            this.mouseY = (evt.clientY - rect.top);
            console.log("Mouse move");
            //var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
            //writeMessage(canvas, message);
        }, false);
    }
}



