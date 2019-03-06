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
        if (game.map.getTile(this.pos_x + diff_x, this.pos_y + diff_y).passable === true) {

            // todo: remember that moving off your PathfinderMixin path will invalidate it!
            let old_x = this.pos_x;
            let old_y = this.pos_y;
            let result = true;

            // check if there's an entity already in this spot
            if (game.map.entity_map[this.pos_x + diff_x][this.pos_y + diff_y].length > 0) {
                // see if we can handle being in the same space somehow, given that we can only handle
                // one entity per position...

                for (let i = 0; i < game.map.entity_map[this.pos_x + diff_x][this.pos_y + diff_y].length; i++) {
                    if (game.map.entity_map[this.pos_x + diff_x][this.pos_y + diff_y][i].tile.glyph === "$") {
                        let action = new PickupCoinAction(this, this.pos_x + diff_x, this.pos_y + diff_y, i);
                        result = action.execute();
                    }
                }

            }

            if (result === false) return false;

            // okay, we're all good; update entity map with new position
            this.pos_x += diff_x;
            this.pos_y += diff_y;


             for (let i=0; i< game.map.entity_map[old_x][old_y].length; i++) {
                 if (game.map.entity_map[old_x][old_y][i] === this) {
                     game.map.entity_map[old_x][old_y].splice(i, 1);
                 }
             }




            game.map.entity_map[this.pos_x][this.pos_y].push(this);

            game.map.draw();
            return true;

        } else {
            return false;
        }
    }


};

