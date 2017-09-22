class EntityRepository {

    constructor() {

        this.entities = [];
        this.DRAW_CLIENT_ENTITY = false;
    }

    nrOfEntities() {
        return this.entities.length;
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

    update() {
        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].update();
        }
    }

    draw(context, userId) {
        for (var i = 0; i < this.entities.length; i++) {

            if (this.entities[i].userId === userId && !this.DRAW_CLIENT_ENTITY)
                continue;

            this.entities[i].draw(context);
        }
    }
}