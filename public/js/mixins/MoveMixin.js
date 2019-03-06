game.mixins.Move = {
    // remember "this" in a Mixin context refers to the object this has been mixed into.

    onMoveAdd()
    {
        this.pos_x = 0;
        this.pos_y = 0;
    },

    onMoveRemove()
    {
        this.pos_x = null;
        this.pos_y = null;
    },

    move(diff_x, diff_y)
    {
        let old_x = this.pos_x;
        let old_y = this.pos_y;
        let result = true;

        if (game.map.getTile(this.pos_x + diff_x, this.pos_y + diff_y).passable === true) {

            // check if there's an entity already in this spot
            if (game.map.entity_map[this.pos_x + diff_x][this.pos_y + diff_y].length > 0) {
                for (let i = 0; i < game.map.entity_map[this.pos_x + diff_x][this.pos_y + diff_y].length; i++) {

                    // handle coins
                    if (game.map.entity_map[this.pos_x + diff_x][this.pos_y + diff_y][i].tile.glyph === "$") {
                        let action = new PickupCoinAction(this, this.pos_x + diff_x, this.pos_y + diff_y, i);
			// todo: this needs to be entity.resolveAction!
                        result = action.execute();
                    }

                }
            }

            if (result === false) return false;

            // okay, we're all good; update entity map with new position
            this.pos_x += diff_x;
            this.pos_y += diff_y;

             // remove this entity from the entity_map array at the old position
             for (let i=0; i< game.map.entity_map[old_x][old_y].length; i++) {
                 if (game.map.entity_map[old_x][old_y][i] === this) {
                     game.map.entity_map[old_x][old_y].splice(i, 1);
                 }
             }

            // add this entity in the current position
            game.map.entity_map[this.pos_x][this.pos_y].push(this);

            game.map.draw();
            return true;

        } else {
            return false;
        }
    }

};

