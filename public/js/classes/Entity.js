class Entity {

	constructor()
	{
		this.mixins = {};
		this.speed = 1; // must have a speed for the scheduler
		this.pos_x = 0; // sanity check: if this thing doesn't have a position, is it really an entity?
		this.pos_y = 0;

	}


	getSpeed()
	{
		return this.speed; // required for the scheduler
	}


	resolveAction(action)
	{
		// execute actions until there aren't any Action objects left
		while (typeof action === 'object') {
			action = action.execute();
		}
		return action;
	}


	getAdjacentTiles()
	{
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


	addMixin(mixin)
	{
		if (this.mixins[mixin] === undefined) {
			Object.assign(this, game.mixins[mixin]);
			if (typeof this['on' + mixin + 'Add'] === "function") this['on' + mixin + 'Add']();
			this.mixins[mixin] = true;
			return true;

		} else if(this.mixins[mixin] === false) {
			if (typeof this['on' + mixin + 'Add'] === "function") this['on' + mixin + 'Add']();
			this.mixins[mixin] = true;
			return true;

		} else {
			return false;
		}
	}


	removeMixin(mixin)
	{
		if (typeof this['on' + mixin + 'Remove'] === "function") this['on' + mixin + 'Remove']();
		this.mixins[mixin] = false;
		return true;
	}


	hasMixin(mixin)
	{
		return !(this.mixins[mixin] === undefined || this.mixins[mixin] === false);
	}

}
