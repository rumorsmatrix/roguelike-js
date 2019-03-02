game.mixins.Move = {

    // remember "this" in a Mixin context refers to the object this has been mixed into.

    onMoveAdd()
    {
        this.pos_x = 0;
        this.pos_y = 0;
    },

    onMoveRemove()
    {

    },

    move(diff_x, diff_y)
    {
        if (game.map.getTile(this.pos_x + diff_x, this.pos_y + diff_y).passable === true) {

            let old_x = this.pos_x;
            let old_y = this.pos_y;
            this.pos_x += diff_x;
            this.pos_y += diff_y;

            // update entity map with new position
            game.map.entity_map[old_x][old_y] = null;
            game.map.entity_map[this.pos_x][this.pos_y] = this;

            game.map.draw();
            return true;

        } else {
            return false;
        }
    }


};

