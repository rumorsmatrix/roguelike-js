class NPC extends Entity {

    constructor()
    {
        super();
        this.tile = game.tile_library['rat'];
        this.name = "rat";
        this.speed = 1;

        // assign mixins
        this.addMixin('Move');

        // this.pos_x = 0;
        // this.pos_y = 0;
        //
        this.handleEvent();
    }


    act()
    {
        console.log("Taking AI turn for " + this.name);
        return true;
    }


    handleEvent(e)
    {
        if (e === undefined) {
            return false;
        } else {
            console.log(this.name + " handleEvent:");
            console.log(e);
        }
    }

}
