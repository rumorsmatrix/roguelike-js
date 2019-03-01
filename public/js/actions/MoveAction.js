class MoveAction extends Action {

    constructor(actor, dx, dy)
    {
        super(actor);
        this.actor = actor;
        this.dx = dx;
        this.dy = dy;
    }

    execute()
    {

        if (this.actor.hasMixin('Move')) {
            if (this.actor.move(this.dx, this.dy)) {
                // move was successful
                return true;

            } else {
                // bumped into something
                return new BumpAction(this.actor, this.dx, this.dy);
            }

        } else {
            // actor does not have the MoveMixin
            return false;
        }
    }


}
