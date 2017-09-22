﻿class EntityRepository {

    constructor() {

        this.entities = [];
        this.drawClientEntity = true;
    }

    entityExists(userId) {
        for (var i = 0; i < this.entities.length; i++) {
            if (this.entities[i].userId === userId) {
                return true;
            }
        }
        return false;
    }

    addEntity(entity) {
        this.entities.push(entity);
    }

    removeEntity(userId) {
        var removeIndex = -1;
        for (var i = 0; i < this.entities.length; i++) {
            if (this.entities[i].userId === userId) {
                removeIndex = i;
                continue;
            }
        }
        if (removeIndex !== -1)
            this.entities.splice(removeIndex, 1);
    }

    addEntityPositions(entityPositions) {
        if (entityPositions.length === 0) {
            return;
        }

        for (var i = 0; i < entityPositions.length; i++) {
            if (this.entityExists(entityPositions[i].UserId)) {
                this.entities[i].add_position(entityPositions[i].X, entityPositions[i].Y);
            } else {
                var newEntity = new Entity(entityPositions[i].UserId, entityPositions[i].X, entityPositions[i].Y);
                newEntity.add_position(entityPositions[i].X, entityPositions[i].Y);
                this.addEntity(newEntity);
            }
        }
    }


    setEntityPreviousPosition(userId, x, y) {
        for (var i = 0; i < this.entities.length; i++) {
            if (this.entities[i].userId === userId) {
                this.entities[i].previous_x = x;
                this.entities[i].previous_y = y;
                continue;
            }
        }
    }

    entityPreviousPositionIsTheSame(userId,x,y) {
        for (var i = 0; i < this.entities.length; i++) {
            if (this.entities[i].userId === userId && this.entities[i].previous_x === x && this.entities[i].previous_y === y) {
                return true;
            }
        }
        return false;
    }

    getClientEntity(userId) {
        for (var i = 0; i < this.entities.length; i++) {
            if (this.entities[i].userId === userId) {
                return this.entities[i];
            }
        }
        return null;
    }

    update() {
        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].update();
        }
    }

    draw(context, userId) {
        for (var i = 0; i < this.entities.length; i++) {

            if (this.entities[i].userId === userId && !this.drawClientEntity)
                continue;

            this.entities[i].draw(context);
        }
    }
}