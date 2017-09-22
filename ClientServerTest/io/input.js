
var mousex = 0;
var mousey = 0;

class Input {

    constructor(canvas) {

        canvas.addEventListener('mousemove', function (evt) {
            var rect = canvas.getBoundingClientRect();

            mousex = (evt.clientX - rect.left);
            mousey = (evt.clientY - rect.top);
        }, false);
    }

    getMousePosition() {
        return { x: mousex, y: mousey };
    }
}



