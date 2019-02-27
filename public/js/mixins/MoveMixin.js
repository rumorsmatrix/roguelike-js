game.mixins.Move = {

    // remember "this" in a Mixin context refers to the object this has been mixed into.

    move(diff_x, diff_y) {

        if (game.map.tile_map[this.pos_x + diff_x][this.pos_y + diff_y].passable === true) {
            this.pos_x += diff_x;
            this.pos_y += diff_y;

            // TODO: should only redraw if it's the player moving, or an entity moving within sight of the player
            //  also, if it's an entity moving in sight, should probably have a timeout for a pause...
            game.map.draw();
            return true;

        } else {
            return false;
        }
    }

};

