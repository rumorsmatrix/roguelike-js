game.mixins.CanUseDoors = {

    // remember "this" in a Mixin context refers to the object this has been mixed into.

    onMoveAdd()
    {

    },

    onMoveRemove()
    {

    },

    openDoor(x, y) {

        if (game.map.tile_map[x][y].glyph === "+") {

            game.map.tile_map[x][y] = game.tile_library['door_open'];
            if (this.constructor.name === 'Player') {
                game.log.write("You open the door.");
            }

            game.map.draw();
            return true;

        } else {
            return false;
        }

    }

};

