game.mixins.Pathfinder = {

    // remember "this" in a Mixin context refers to the object this has been mixed into.

    onPathfinderAdd()
    {
        this.path = [];
    },

    onPathfinderRemove()
    {
        this.path = [];
    },

    generatePath(target_x, target_y)
    {
        let path = [];
        let this_pos_x = this.pos_x;
        let this_pos_y = this.pos_y;

        // prepare path to target coords
        let astar = new ROT.Path.AStar(
            target_x,
            target_y,
            function(x, y) {
                // todo: this could be replaced for NPCs with different movement types eg: flying, burrowing
                if (x === this_pos_x && y === this_pos_y) return true;
                return game.map.getTile(x, y).passable;
            },
            { topology: 4 }
        );

        // compute
        astar.compute(
            this.pos_x,
            this.pos_y,
            function(x, y) { path.push([x, y]); }
        );

        this.path = path;
        this.path.shift(); // algorithm includes start position, so discard it
        return this.path;
    },


};

