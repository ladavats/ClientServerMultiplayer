class EntityRepository {

    constructor() {

        this.entities = [];
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

    removeEntity(entity) {

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

    draw(context) {
        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].draw(context);
        }
    }
}