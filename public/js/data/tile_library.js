game.tile_library = {};


// actors -- players, monsters, etc
game.tile_library['player']         = new Tile("@", '#fff', '', true);
game.tile_library['rat']            = new Tile("r", '#fff', '', true);

// floor and walls, used as defaults during map creation
game.tile_library['floor']          = new Tile(".", '#343', '#232', true);
game.tile_library['wall']           = new Tile("#", '#676', '#121', false);

// doors
game.tile_library['door_closed']    = new Tile("+", '#bbb', '#121', false);
game.tile_library['door_open']      = new Tile("'", '#bbb', '#121', true);

