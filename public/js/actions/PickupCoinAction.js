class PickupCoinAction extends Action {

    constructor(actor, x, y, z)
    {
        // x, y, z indicate the position of the coin being picked up
        super(actor);
        this.actor = actor;
        this.x = x;
        this.y = y;
        this.z = z;
    }

    execute()
    {
        if (this.actor.hasMixin('CanPickupCoin') === true) {
            return this.actor.pickupCoin(this.x, this.y, this.z);

        } else {
            // actor does not have the PickupCoinMixin
            return true; // coins do not block movement
        }
    }


}
