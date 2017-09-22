class ClientEntity {

    constructor(userId, x, y) {
        this.userId = userId;
        this.x = x;
        this.y = y;

        this.vx = 0;
        this.vy = 0;

        this.target_x = x;
        this.target_y = y;

        this.positions = [];
        this.target_is_set = false;

        this.FRAME_BUFER_COUNT = 2;
        this.FRAMES_COUNT_PER_SERVER_TICKS = 7;

        this.previous_x = x;
        this.previous_y = y;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    newPositionIsNotTheSameAsPrevious(x, y) {
        return (x !== this.previous_x || y !== this.previous_y);
    }

    setPreviousPosition(x, y) {
        this.previous_x = x;
        this.previous_y = y;
    }

    draw(context) {
        context.drawCircle(this.x, this.y, 15, "blue"); //server interpolated entity
        //context.drawCircle(this.target_x, this.target_y, 10, "yellow"); //target position
        context.drawText(this.userId, this.x, this.y - 20);
    }
}