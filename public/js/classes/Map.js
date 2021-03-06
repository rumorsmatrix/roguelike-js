class Map {

	constructor(width, height)
	{
		// this.width = width;
		// this.height = height;

		this.center_x = (width / 2);
		this.center_y = (height / 2);

		this.tile_map = this.construct_2d_array(width, height, 0);
		this.fow_map = this.construct_2d_array(width, height, 0);
		this.empty_tile_list = [];

		this.entity_list = [];
		this.entity_map = this.construct_2d_array(width, height, '[]');

	}


	// noinspection JSMethodCanBeStatic
	construct_2d_array(width, height, default_value = null)
	{
		let new_array = [];
		for (let i=0; i< height; i++) {
			new_array[i] = [];
			for (let j=0; j< width; j++) {

				if (default_value === "[]") {
					new_array[i][j] = [];
				} else {
					new_array[i][j] = default_value;
				}

			}
		}
		return new_array;
	}


	generate_dungeon()
	{
		let rot_map = new ROT.Map.Digger(game.map_width, game.map_height);
		rot_map.create(function(x, y, value) {

			let new_tile = null;
			if (value === 0) {
				 new_tile = new Tile(
					game.tile_library['floor'].glyph,
					game.tile_library['floor'].fg_color,
					ROT.Color.toHex(
						ROT.Color.interpolate(
							ROT.Color.fromString(game.tile_library['floor'].bg_color), [50, 50, 50], Math.random()
						)
					),
					game.tile_library['floor'].passable,
					game.tile_library['floor'].light_passes,
				);
				game.map.empty_tile_list.push([x,y]);

			} else {
				new_tile = game.tile_library['wall'];
			}

			game.map.tile_map[x][y] = new_tile;
		});

		this.rooms = [];
		let rooms = rot_map.getRooms();
		for (let i=0; i<rooms.length; i++) {

			let doors = [];
			rooms[i].getDoors(function(x, y) {
				doors.push([x, y]);
				let new_door_tile = ROT.RNG.getWeightedValue({
					"door_closed": 20,
					"door_open": 30,
					"floor": 50
				});
				game.map.tile_map[x][y] = game.tile_library[new_door_tile];
				game.map.removeTileFromEmptyList(x, y);
			});

			this.rooms.push({
				"center": rooms[i].getCenter(),
				"top": rooms[i].getTop(),
				"right": rooms[i].getRight(),
				"bottom": rooms[i].getBottom(),
				"left": rooms[i].getLeft(),
				"doors": doors,
			});
		}

		// water tiles
		// for (let i = 0; i < 50; i++) {
		// 	let water_tile = ROT.RNG.getItem(this.empty_tile_list);
		// 	game.map.tile_map[water_tile[0]][water_tile[1]] = game.tile_library['water'];
		// 	game.map.removeTileFromEmptyList(water_tile[0], water_tile[1]);
		// }


		// add entities: NPCs, items, pickups etc

		// coins
		for (let i = 0; i < 10; i++) {
			let pos = ROT.RNG.getItem(this.empty_tile_list);
			this.entity_map[pos[0]][pos[1]].push( { tile: game.tile_library['coin'], amount: ROT.RNG.getItem([1,1,1,2,2,3]) } );
		}

		// add entities to the map
		for (let r = 0; r < 5; r++) {
			let rat = new NPC();
			let position = ROT.RNG.getItem(this.empty_tile_list);
			rat.name = "Rat " + r.toString();
			rat.tile = game.tile_library['rat'];
			rat.pos_x = position[0];
			rat.pos_y = position[1];
			this.entity_map[rat.pos_x][rat.pos_y].push(rat);
			this.entity_list.push(rat);
		}

		// add entities to the turn scheduler -- remember this doesn't add the player!
		game.scheduler.clear();
		for (let i = 0; i < this.entity_list.length; i++) {
			game.scheduler.add(this.entity_list[i], true);
		}

	}


	getTile(x, y)
	{
		let tile = this.tile_map[x][y];
		let bg_color = tile.bg_color;
		let entities = this.entity_map[x][y];

		// entity_map is an array now...
		tile.entities = entities;

		if (entities.length > 0) {
			tile = entities[entities.length - 1].tile;
			tile.bg_color = bg_color;
			if (entities[entities.length - 1].tile.passable === false) tile.passable = false;
		}
		return tile;
	}

	removeTileFromEmptyList(x, y)
	{
		for (let i=0; i<this.empty_tile_list.length; i++) {
			if (this.empty_tile_list[i][0] === x && this.empty_tile_list[i][1] === y) {
				this.empty_tile_list.splice(i, 1);
				return true;
			}
		}
		return false;
	}


	get_random_room()
	{
		return ROT.RNG.getItem(this.rooms);
	}


	draw()
	{
		// center the "camera" on the player
		this.center_x = game.player.pos_x;
		this.center_y = game.player.pos_y;

		// Make sure the x-axis doesn't go to the left of the left bound
		let topLeftX = Math.max(0, this.center_x - (game.display_width / 2));

		// Make sure we still have enough space to fit an entire game screen
		topLeftX = Math.min(topLeftX, game.map_width - game.display_width);

		// Make sure the y-axis doesn't above the top bound
		let topLeftY = Math.max(0, this.center_y - (game.display_height / 2));

		// Make sure we still have enough space to fit an entire game screen
		topLeftY = Math.min(topLeftY, game.map_height - game.display_height);

		// Iterate through all map cells in the viewport
		for (let x = topLeftX; x < topLeftX + game.display_width; x++) {
		    for (let y = topLeftY; y < topLeftY + game.display_height; y++) {

		    	// either blank out tiles we don't know about or show darkened
		    	// versions for tiles in the "fog of war"
				let glyph = "";

		        if (game.map.fow_map[x][y] === 1) {
		        	glyph = game.map.tile_map[x][y].glyph;
		        }


		        // todo: this method calls game.display.draw() in two places, perhaps it needs wrapping up,
				//  either here or perhaps on the Tile (so Tiles can draw themselves?)

	        	game.display.draw(
	            	x - topLeftX,
		            y - topLeftY,
		            glyph,
					'#222', // todo: this is grey. It should be a darkened version of whatever the tile is?
					'#000'
		        );
		    }
		}

		// calculate tiles in field-of-view
		// todo: this fov creation/computation should be moved to an EYEBALLS mixin/component, I think ----
		let fov = new ROT.FOV.PreciseShadowcasting(function(x, y) {
			if (x > game.map_width-1 || y > game.map_height-1) return false;
			if (x < 0 || y < 0) return false;

			// let tile = game.map.tile_map[x][y];
			// if (game.map.entity_map[x][y] !== null) {
			// 	tile = game.map.entity_map[x][y].tile;
			// }

			return (game.map.getTile(x, y).light_passes);
		});

		fov.compute(game.player.pos_x, game.player.pos_y, 8, function(x, y, r, visibility) {
			if (visibility > 0) {

				// pull tile details for this location
				// let glyph = game.map.tile_map[x][y].glyph;
				// let fg_color = game.map.tile_map[x][y].fg_color;
				// let bg_color = game.map.tile_map[x][y].bg_color;
				//
				// // check if there's an entity in this location and overwrite if needed
				// if (game.map.entity_map[x][y] !== null) {
				// 	glyph = game.map.entity_map[x][y].tile.glyph;
				// 	fg_color = game.map.entity_map[x][y].tile.fg_color;
				// }

				let tile = game.map.getTile(x, y);

				//console.log(tile);

				// draw the resulting tile
				game.display.draw(
					x - topLeftX,
					y - topLeftY,
					tile.glyph,
					tile.fg_color,
					tile.bg_color,
				);
				game.map.fow_map[x][y] = 1; // mark this tile as "seen" in the FoW map
			}
		});

		// render the player
		game.display.draw(
		    this.center_x - topLeftX,
		    this.center_y - topLeftY,
		    game.tile_library['player'].glyph,
			game.tile_library['player'].fg_color,
			game.map.tile_map[game.player.pos_x][game.player.pos_y].bg_color
		);

	}
}

