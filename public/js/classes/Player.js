class Player extends Entity {

    constructor()
    {
        super();
        this.tile = game.tile_library['player'];
        this.speed = 1;


        // create party
        this.party = [];
        this.party_size = 4;

        for (let i = 0; i < this.party_size; i++) {
            let new_combat_entity = new CombatEntity({
                name: ROT.RNG.getItem(game.grammar.male_names) + " " + ROT.RNG.getItem(game.grammar.surnames),
            });
            new_combat_entity.job = new FighterJob(new_combat_entity);
            new_combat_entity.job.applyInitialStats();
            this.party.push(new_combat_entity);
        }

        // assign mixins
        this.addMixin('Move');
        this.addMixin('CanUseDoors');
        this.addMixin('CanPickupCoin');

        // update some UI
        let party_names = "";
        for (let i = 0; i < this.party.length; i++) {
            party_names = party_names + this.party[i].name + "<br>";
        }

        document.getElementById("player_name").innerHTML = party_names;

        // pick a room to start in
        this.start_room = game.map.get_random_room();
        this.pos_x = this.start_room.center[0];
        this.pos_y = this.start_room.center[1];

        // add to entity list and scheduler
        game.map.entity_list.push(this);
        game.scheduler.add(this, true);

    }

    act()
    {
        // console.log("starting player turn");
        game.engine.lock();
        window.addEventListener("keydown", this);
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

        console.log('player key handler');

        window.removeEventListener("keydown", this);
        let action = false;
        let movement_x = 0;
        let movement_y = 0;

        // find which virtual key has been pressed
        let virtual_key = game.ui_state.getVirtualKey(e);

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
                console.log( this.getAdjacentTiles() );
                break;

            case "VK_W":
                game.log.write("You wait a moment.");
                action = true;
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

            case "VK_ESC":
                game.ui_state.setState('about');
                return false; // stops engine unlock and keypress loop
        }

        // handle movement
        if (movement_x !== 0 || movement_y !== 0) {
            // noinspection JSValidateTypes -- deliberately toggling between Action object and Boolean
            action = new MoveAction(this, movement_x, movement_y);
        }


        // move onto the next scheduled turn if our action is true
        let result = this.resolveAction(action);

        if (result === true) {
            window.removeEventListener("keydown", this);
            game.engine.unlock();
        } else {
            window.addEventListener("keydown", this);
        }
    }
}
