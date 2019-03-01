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

    move(diff_x, diff_y) {

        if (game.map.tile_map[this.pos_x + diff_x][this.pos_y + diff_y].passable === true) {
            this.pos_x += diff_x;
            this.pos_y += diff_y;

            if (this.constructor.name === 'Player') {
                game.map.draw();
            }
            return true;

        } else {
            return false;
        }

    }

};

