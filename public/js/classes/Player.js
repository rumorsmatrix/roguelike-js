class Player extends Entity {

    // todo: what does a "Player" object represent if the player is a Party of characters? Hmmm.
    //  I think it's the "@" and it's location, and should have Characters attatched to it. It's basically the
    //  party AND the characters all lumped in together...

    constructor()
    {
        super();
        this.tile = game.tile_library['player'];
        this.name = ROT.RNG.getItem(game.grammar.male_names) + " " + ROT.RNG.getItem(game.grammar.surnames);

        // assign mixins
        Object.assign(this, game.mixins.Move);
        //Object.assign(this, MoveMixin);


        // update some UI
        document.getElementById("player_name").innerHTML = this.name;

        // pick a room to start in
        this.start_room = game.map.get_random_room();
        this.pos_x = this.start_room.center[0];
        this.pos_y = this.start_room.center[1];

        // noinspection JSUnresolvedFunction (IDE is dumb)
        window.addEventListener("keydown", this);
        this.handleEvent();
    }


    handleEvent(e)
    {

        // todo: or rather maybe do:
        //  if (e.target === this.uid && typeof this[e.type] === 'function') this[e.type](e);
        //  OR, if you skip the e.target check, you can respond to ALL events of a type, so monsters could eg: respond
        //  to seeing their kin take damage, etc

        if (e === undefined) {
            return false;

        } else if (e.type === "keydown") {
            this.handleKeyEvent(e);

        } else {
            console.log(e);
        }
    }


    handleKeyEvent(e) {

        let movement_x = 0;
        let movement_y = 0;

        // find which virtual key has been pressed

        // todo: e.keyCode is now deprecated
        //  https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key

        console.log('Key/New: ' + e.key + ', keyCode/Deprecated: ' + e.keyCode);
        //console.log(e);

        let virtual_key = "";
        for (let key_name in ROT.KEYS) {
            if (ROT.KEYS.hasOwnProperty(key_name) && ROT.KEYS[key_name] === e.key && key_name.indexOf("VK_") === 0) {
                virtual_key = key_name;
                break; // no need to keep looking now
            }
        }

        // handle key press: https://nethackwiki.com/wiki/Commands

        switch (virtual_key) {

            case "VK_UP":
            case "VK_ARROW_UP":
                movement_y = -1;
                break;

            case "VK_DOWN":
            case "VK_ARROW_DOWN":
                movement_y = +1;
                break;

            case "VK_LEFT":
            case "VK_ARROW_LEFT":
                movement_x = -1;
                break;

            case "VK_RIGHT":
            case "VK_ARROW_RIGHT":
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

            let action = new MoveAction(this, movement_x, movement_y);
            action.execute();


        }

    }
}
