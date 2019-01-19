game.tile_library = [];


// player, monsters, NPCs
game.tile_library['player']	= new Tile("@", true);
game.tile_library['rat']	= new Tile("r", true);


// flooring
game.tile_library['floor'] 	= new Tile(".", true);


// walls
game.tile_library['wall'] 	= new Tile("#", false);
game.tile_library['wall2'] 	= new Tile("#2", false);
game.tile_library['wall3'] 	= new Tile("#3", false);


// doors and gates
game.tile_library['door_closed'] = new Tile("+", false);
game.tile_library['door_open'] 	 = new Tile("-", true);




class TileLibrary {
	constructor() {}
}