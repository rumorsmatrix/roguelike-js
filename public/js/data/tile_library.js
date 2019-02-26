game.tile_library = {};


// actors -- players, monsters, etc
game.tile_library['player']         = new Tile("@", '#fff', '', true);
game.tile_library['rat']            = new Tile("r", '#fff', '', true);

// flooring
game.tile_library['floor']          = new Tile(".", '#333', '#222',true);

// walls
game.tile_library['wall']           = new Tile("#", '#666', '#111',false);

// doors
game.tile_library['door_closed']    = new Tile("+", '#bbb', '#111',false);
game.tile_library['door_open']      = new Tile("-", '#bbb', '#111',true);

