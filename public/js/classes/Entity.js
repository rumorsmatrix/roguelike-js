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


	move(diff_x, diff_y)
    {

		// todo: this should be a mixin: can_move or somesuch
		if (game.map.tile_map[this.pos_x + diff_x][this.pos_y + diff_y].passable === true) {
			this.pos_x += diff_x;
			this.pos_y += diff_y;

			// TODO: should only redraw if it's the player moving, or an entity moving within sight of the player
			//  also, if it's an entity moving in sight, should probably have a timeout for a pause...
			game.map.draw();
			return true;

		} else {
			return false;
		}
	}

}




/*
class Door extends Entity {

	constructor()
    {
		super();
	}

}


class Rat extends Entity {

	constructor()
	{
		super();
	}

}
*/
