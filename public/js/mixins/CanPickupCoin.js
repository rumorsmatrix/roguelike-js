game.mixins.CanPickupCoin = {

    // remember "this" in a Mixin context refers to the object this has been mixed into.

    onCanPickupCoinAdd()
    {
        this.coin = 0;
    },

    onCanPickupCoinRemove()
    {

    },

    pickupCoin(x, y, z)
    {
        console.log("pickup coin! " + x + ", " + y + ", " + z);
        let coin = game.map.entity_map[x][y][z];

        if (coin.amount !== undefined) {
            this.coin = this.coin + coin.amount;
            document.getElementById('ui_currency_gold').innerText = this.coin;
            game.log.write("You collect <span class=\"currency_gold\">" + coin.amount + " gold</span>.");

            game.map.entity_map[x][y].splice(z, 1);
            return true;

        } else {
            return false;
        }
    }

};

