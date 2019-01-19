class Map {

	constructor(width, height) {
		this.width = width;
		this.height = height;

		this.center_x = (width / 2);
		this.center_y = (height / 2);

		this.tile_map = this.construct_2d_array(width, height, 0);
		this.fow_map = this.construct_2d_array(width, height, 0);
		this.empty_tile_list = [];
		this.entity_map = this.construct_2d_array(width, height);

	}


	construct_2d_array(width, height, default_value = null) {
		var new_array = [];
		for (var i=0; i< height; i++) {
			new_array[i] = [];
			for (var j=0; j< width; j++) {
				new_array[i][j] = default_value;
			}
		}
		return new_array;
	}


	generate_dungeon() {
		var rot_map = new ROT.Map.Digger(game.map_width, game.map_height);
		rot_map.create(function(x, y, value) {

			var new_tile = null;
			if (value == 0) {
				new_tile = game.tile_library['floor'];
			} else {
				new_tile = ROT.RNG.getWeightedValue({
					"wall": 70,
					"wall2": 15,
					"wall3": 15
				});
				new_tile = game.tile_library[new_tile];
			}
			game.map.tile_map[x][y] = new_tile;

			if (value == 0) game.map.empty_tile_list.push([x,y]);
		});

		this.rooms = [];
		var rooms = rot_map.getRooms();
		for (var i=0; i<rooms.length; i++) {

			var doors = [];
			rooms[i].getDoors(function(x, y) {

				// TO DO
				// not every "door" should have an actual door, make this randomised
				// still record that this is a door position -- for pathfinding -- but also store
				// a flag to state if an actual door is present...
				doors.push([x, y]);

				var new_door_tile = ROT.RNG.getWeightedValue({
					"door_closed": 20,
					"door_open": 30,
					"floor": 70
				});
				game.map.tile_map[x][y] = game.tile_library[new_door_tile];


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
	}


	get_random_room() {
		return ROT.RNG.getItem(this.rooms);
	}


	draw() {

		// center the "camera" on the player
		this.center_x = game.player.pos_x;
		this.center_y = game.player.pos_y;

		// Make sure the x-axis doesn't go to the left of the left bound
		var topLeftX = Math.max(0, this.center_x - (game.display_width / 2));

		// Make sure we still have enough space to fit an entire game screen
		topLeftX = Math.min(topLeftX, game.map_width - game.display_width);

		// Make sure the y-axis doesn't above the top bound
		var topLeftY = Math.max(0, this.center_y - (game.display_height / 2));

		// Make sure we still have enough space to fit an entire game screen
		topLeftY = Math.min(topLeftY, game.map_height - game.display_height);

		// Iterate through all visible map cells
		for (var x = topLeftX; x < topLeftX + game.display_width; x++) {
		    for (var y = topLeftY; y < topLeftY + game.display_height; y++) {

		    	// either blank out tiles we don't know about or show darkened
		    	// versions for tiles in the "fog of war"
		        var glyph = "";
		        if (game.map.fow_map[x][y] == 1) {
		        	glyph += "_" + game.map.tile_map[x][y].glyph;
		        }

	        	game.display.draw(
	            	x - topLeftX,
	            	y - topLeftY,
	            	glyph
		        );
		    }
		}


		var fov = new ROT.FOV.PreciseShadowcasting(function(x, y) {
			if (x > game.map_width-1 || y > game.map_height-1) return false;
			if (x < 0 || y < 0) return false;

			// console.log(game.map.tile_map[x][y].light_passes);
			return (game.map.tile_map[x][y].light_passes);
		});

		fov.compute(game.player.pos_x, game.player.pos_y, 5, function(x, y, r, visibility) {
			if (visibility > 0) {
				game.display.draw(x - topLeftX, y - topLeftY, game.map.tile_map[x][y].glyph);
				game.map.fow_map[x][y] = 1;
			}
		});


		// Render the player
		game.display.draw(
		    this.center_x - topLeftX,
		    this.center_y - topLeftY,
		    game.tile_library['player'].glyph
		);
	}

}



class Tile {
	constructor(glyph, light_passes) {
		this.glyph = glyph;
		this.light_passes = light_passes;
		this.passable = light_passes;
	}
}
