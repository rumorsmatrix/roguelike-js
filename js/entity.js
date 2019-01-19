class Entity {

	constructor() {
		this.pos_x = 0;
		this.pos_y = 0;
	}


	get_adjacent_tiles() {

		// TODO
		// should this include diagonals even though you can't move diagonally??

		var adjacent_tiles = [];
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


	get_fov() {

		// TODO
		// move field-of-view calculation from the map to the entity, so that players and
		// monsters/NPCs each have their own FOV

	}


	move(diff_x, diff_y) {
		if (game.map.tile_map[this.pos_x + diff_x][this.pos_y + diff_y].passable == true) {
			this.pos_x += diff_x;
			this.pos_y += diff_y;

			// TODO: should only redraw if it's the player moving, or an entity moving within sight of the player
			// also, if it's an entity moving in sight, should probably have a timeout for a pause...
			game.map.draw();
			return true;

		} else {
			return false;
		}
	}

}


class Player extends Entity {

	constructor() {
		super();

		this.tile = game.tile_library['player'];
		this.name = ROT.RNG.getItem(game.grammar.male_names) + " " + ROT.RNG.getItem(game.grammar.surnames);
		document.getElementById("player_name").innerHTML = this.name;

		// pick a room to start in
		this.start_room = game.map.get_random_room();
		this.pos_x = this.start_room.center[0];
		this.pos_y = this.start_room.center[1];

		window.addEventListener("keydown", this);
	}


	handleEvent(e) {

		var movement_x = 0;
		var movement_y = 0;

		// find which virtual key has been pressed
		for (var key_name in ROT.KEYS) {
			if (ROT.KEYS[key_name] == e.keyCode && key_name.indexOf("VK_") == 0) { var virtual_key = key_name; }
		}


		console.log(virtual_key);

		// https://nethackwiki.com/wiki/Commands

		// handle key press
		switch (virtual_key) {

			case "VK_UP":
				movement_y = -1;
				break;

			case "VK_DOWN":
				movement_y = +1;
				break;

			case "VK_LEFT":
				movement_x = -1;
				break;

			case "VK_RIGHT":
				movement_x = +1;
				break;

			case "VK_A":
				console.log( this.get_adjacent_tiles() );
				break;

			case "VK_W":
				game.log.write("You wait a moment.");
				break;

			case "VK_I":
				game.log.write("You try to check your inventory, but it hasn't been implemented yet.");
				break;

			case "VK_O":
				game.log.write("You try to open the door but it's impossible right now.");
				break;

			case "VK_C":
				game.log.write("You try to close the door but, like, you can't even.");
				break;

		}


		console.log(movement_x + ", " + movement_y);


		// handle movement
		if (movement_x != 0 || movement_y != 0) {
			if (this.move(movement_x, movement_y)) {

				// TODO
				// refactor this so the classes and IDs are on the tile itself so I don't have to write them all out here
				// also move it to a function of it's own so it can be called on draw() or game init or something...
				document.getElementById("commands_doors_open").classList.add("hidden");
				document.getElementById("commands_doors_close").classList.add("hidden");

				var adjacent_tiles = this.get_adjacent_tiles();
				for (let t in adjacent_tiles) {
					if (adjacent_tiles[t].tile.glyph == "+") {
						document.getElementById("commands_doors_open").classList.remove("hidden");
					}

					if (adjacent_tiles[t].tile.glyph == "-") {
						document.getElementById("commands_doors_close").classList.remove("hidden");
					}

				}

			} else {
				// TODO
				// Couldn't move, so we've bumped something. Make a bump handler that works with get_adjacent_tiles to
				// work out a context-sensitive action; ie: open a closed door, etc.
				console.log('bump');
			}
		}

	}
}


class Door extends Entity {

	constructor() {
		super();
	}

}


class Rat extends Entity {

	constructor() {
		super();
	}

}

