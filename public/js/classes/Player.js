class Player extends Entity {

    // todo: what does a "Player" object represent if the player is a Party of characters? Hmmm.

    constructor()
    {
        super();
        // todo: grab mixins here

        this.tile = game.tile_library['player'];
        this.name = ROT.RNG.getItem(game.grammar.male_names) + " " + ROT.RNG.getItem(game.grammar.surnames);
        document.getElementById("player_name").innerHTML = this.name;

        // pick a room to start in
        this.start_room = game.map.get_random_room();
        this.pos_x = this.start_room.center[0];
        this.pos_y = this.start_room.center[1];

        window.addEventListener("keydown", this);
        this.handleEvent();
    }


    handleEvent(e)
    {

        if (e === undefined) return false;

        let movement_x = 0;
        let movement_y = 0;

        // find which virtual key has been pressed
        let virtual_key = "";
        for (let key_name in ROT.KEYS) {
            if (ROT.KEYS.hasOwnProperty(key_name) && ROT.KEYS[key_name] === e.keyCode && key_name.indexOf("VK_") === 0) {
                virtual_key = key_name;
                break; // no need to keep looking now
            }
        }

        // handle key press
        // https://nethackwiki.com/wiki/Commands

        switch (virtual_key) {

            case "VK_UP":
                movement_y = -1;
                break;

            case "VK_DOWN":
                movement_y = +1;
                break;

            case "VK_LEFT":
                movement_x = -1;
                break;

            case "VK_RIGHT":
                movement_x = +1;
                break;

            case "VK_A":
                console.log( this.get_adjacent_tiles() );
                break;

            case "VK_W":
                game.log.write("You wait a moment.");
                break;

            case "VK_I":
                game.log.write("You try to check your inventory, but it hasn't been implemented yet.");
                break;

            case "VK_O":
                game.log.write("You try to open the door but it's impossible right now.");
                break;

            case "VK_C":
                game.log.write("You try to close the door but, like, you can't even.");
                break;

        }

        // handle movement
        if (movement_x !== 0 || movement_y !== 0) {
            if (this.move(movement_x, movement_y)) {

                // TODO: refactor this so the classes and IDs are on the tile itself so I don't have to write them all out here
                //  also move it to a function of it's own so it can be called on draw() or game init or something...
                document.getElementById("commands_doors_open").classList.add("hidden");
                document.getElementById("commands_doors_close").classList.add("hidden");

                const adjacent_tiles = this.get_adjacent_tiles();
                for (let t in adjacent_tiles) {
                    if (adjacent_tiles[t].tile.glyph === "+") {
                        document.getElementById("commands_doors_open").classList.remove("hidden");
                    }

                    if (adjacent_tiles[t].tile.glyph === "-") {
                        document.getElementById("commands_doors_close").classList.remove("hidden");
                    }

                }

            } else {
                // TODO: Couldn't move, so we've (maybe) bumped something. Make a bump handler that works with get_adjacent_tiles
                //  to work out a context-sensitive action; ie: open a closed door, etc
                //  (it's also possible something else and un-bumpable stopped movement (trap, etc.) so be careful?
                console.log('bump');
            }
        }

    }
}
