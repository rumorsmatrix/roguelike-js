class Entity {

	constructor()
    {
		this.pos_x = 0;
		this.pos_y = 0;
	}


	get_adjacent_tiles()
    {

		// TODO: should this include diagonals even though you can't move diagonally??

		let adjacent_tiles = [];
		for (let t of [
			[0, -1], // n
			[+1, 0], // e
			[0, +1], // s
			[-1, 0], // w
		]) {
			if (game.map.tile_map[this.pos_x + t[0]][this.pos_y + t[1]]) {
				adjacent_tiles.push({
					"offset_x": t[0],
					"offset_y": t[1],
					"tile": game.map.tile_map[this.pos_x + t[0]][this.pos_y + t[1]]
				});
			}
		}
		return adjacent_tiles;
	}

	// todo: mixin registration
	//  it's hard to actually remove a mixin without looking at the protoypes and doing horrible comparisons, so we'll
	//  just keep a list and assume that we're not going to be dynamically adding/removing them very often at runtime...

	addMixin(mixin)
	{

	}

	removeMixin(mixin)
	{

	}

	hasMixin(mixin)
	{

	}
	
}
