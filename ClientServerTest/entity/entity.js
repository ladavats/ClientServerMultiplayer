class Entity {

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
    }

    positionIsTheSame(x, y) {
        return (x === this.x && y === this.y);
    }

    update_velocity() {

        if (this.positions.length === 0) { return; }

        //this is really important, but i cant really understand why? it should work without it...
        if (this.target_is_set === false && this.positions.length <= this.FRAME_BUFER_COUNT)
            return;

        if (this.target_is_set === false) {
            var target = this.positions.pop();
            if (target === null)
                return;

            this.target_x = target.x;
            this.target_y = target.y;

            //change division number to test latency.
            this.vx = ((this.target_x - this.x) / this.FRAMES_COUNT_PER_SERVER_TICKS); //This must match the time intervall from which we get the packages from the server
            this.vy = ((this.target_y - this.y) / this.FRAMES_COUNT_PER_SERVER_TICKS); //This must match the time intervall from which we get the packages from the server

            this.target_is_set = true;
        }
    }

    update_movement() {
        this.x += this.vx;
        this.y += this.vy;
    }

    update_target() {
        if (this.target_is_set) {
            //try to solve this with ticks instead of calculating the positions.
            var deltax = this.target_x - this.x;
            var deltay = this.target_y - this.y;
            if (Math.abs(deltax) < 1 && Math.abs(deltay) < 1) {
                //make sure to adjust the player at the exact position if drifted
                this.x = this.target_x;
                this.y = this.target_y;
                this.target_is_set = false;
            }
        }
    }

    add_position(x, y) {
        //if we have the same value, we dont add it and stand still.
        if (this.positions.length !== 0 && this.positions[0].X === x && this.positions[0].Y === y)
            return;

        this.positions.unshift({ x: x, y: y });
    }

    update() {
        this.update_velocity();
        this.update_movement();
        this.update_target();
    }

    draw(context) {
        //console.log(this.y + " " +this.y);
        context.drawCircle(this.x, this.y, 15, "blue"); //server interpolated entity
        context.drawCircle(this.target_x, this.target_y, 10, "yellow"); //target position
    }
}