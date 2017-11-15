class StructureRepository {

    constructor() {

        this.structures = [];
    }

    nrOfStructures() {
        return this.structures.length;
    }

    structureExists(id) {
        return false;
    }

    addStructure(structure) {
        this.structures.push(structure);
    }

    removeStructure(id) {
        var removeIndex = -1;
        for (var i = 0; i < this.structures.length; i++) {
            if (this.structures[i].id === id) {
                removeIndex = i;
                continue;
            }
        }
        if (removeIndex !== -1)
            this.structures.splice(removeIndex, 1);
    }

    update() {
        for (var i = 0; i < this.structures.length; i++) {
            this.structures[i].update();
        }
    }

    draw(context) {
        for (var i = 0; i < this.structures.length; i++) {
            this.structures[i].draw(context);
        }
    }
}