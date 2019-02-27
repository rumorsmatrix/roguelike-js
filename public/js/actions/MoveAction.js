class MoveAction extends Action {

    constructor(actor, dx, dy)
    {
        super(actor);
        this.dx = dx;
        this.dy = dy;
    }

    execute()
    {

        if (typeof this.actor.move === 'function') {
            return this.actor.move(this.dx, this.dy);

        } else {
            // actor does not have the MoveMixin
            return false;
        }
    }


}
