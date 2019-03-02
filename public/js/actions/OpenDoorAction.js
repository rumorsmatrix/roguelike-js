class OpenDoorAction extends Action {

    constructor(actor, x, y)
    {
        // x, y indicate the position of the door being opened
        super(actor);
        this.actor = actor;
        this.x = x;
        this.y = y;
    }

    execute()
    {
        if (this.actor.hasMixin('CanUseDoors') === true) {
            return this.actor.openDoor(this.x, this.y);

        } else {
            // actor does not have the CanUseDoorsMixin
            return false;
        }
    }


}
