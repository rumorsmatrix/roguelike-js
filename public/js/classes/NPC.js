class NPC extends Entity {

    constructor()
    {
        super();
        this.tile = game.tile_library['rat'];
        this.name = "rat";

        // noinspection JSUnusedGlobalSymbols -- this is used, by ROT.scheduler, requires getSpeed in the Entity class
        this.speed = 1;

        // assign mixins
        this.addMixin('Move');
        this.addMixin('Pathfinder');

    }

    act()
    {
        // console.log("Taking AI turn for " + this.name);
        let action = false;

        // check if we have a path already
        if (this.hasMixin('Move') && this.hasMixin('Pathfinder')) {

            if (this.path.length === 0) {
                // pick a new destination
                let target = ROT.RNG.getItem(game.map.empty_tile_list);
                this.generatePath(target[0], target[1]);

                if (ROT.RNG.getUniform() > 0.99) {
                    game.log.write('&lt;<span style="color:red">r</span>at&gt; &quot;sqeak, squeak&quot;');
                }

            }

            if (this.path.length > 0) {
                // move along the path
                let next_step = this.path.shift();
                let dx = next_step[0] - this.pos_x;
                let dy = next_step[1] - this.pos_y;

                if (dx > 1 || dx < -1 || dy > 1 || dy < -1) {
                    // the path has become invalid (probably due to bumping) so throw it away
                    this.path = [];

                } else {
                    // noinspection JSValidateTypes -- deliberately switching between Action objects and Booleans
                    action = new MoveAction(this, dx, dy);
                }
            }

        }


        // resolve the action our little AI brain has decided on
        let result = this.resolveAction(action);

        if (result === false && action.constructor.name === "MoveAction") {
            this.path = [];
            console.log("failed a move, cleared path");
        }


        return result;
    }

}
