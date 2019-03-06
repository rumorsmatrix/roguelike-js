class BumpAction extends Action {

    constructor(actor, dx, dy)
    {
        // dx,dy indicate the movement of the actor toward the location bumped into
        super(actor);
        this.actor = actor;
        this.x = this.actor.pos_x + dx;
        this.y = this.actor.pos_y + dy;
    }

    execute()
    {
        // figure out what we've bumped into and what the context-sensitive result should be
        let bumped_tile = game.map.tile_map[this.x][this.y];

        switch(bumped_tile.glyph) {

            // bumped into a closed door
            case "+":
                return new OpenDoorAction(this.actor, this.x, this.y);
                break;

            case "$":
                // todo: rewrite coin pickup to be a type of bump, for consistency?
        }

        return false;

    }


}
