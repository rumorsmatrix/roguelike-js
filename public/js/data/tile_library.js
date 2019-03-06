game.tile_library = {};

// http://angband.oook.cz/stuff/manual.txt

// glyph, fg color, bg color, passable, light_passes

// actors -- players, monsters, etc
game.tile_library['player']         = new Tile("@", '#fff', '', false, true);
game.tile_library['rat']            = new Tile("r", '#f00', '', false, true);

// flooring
game.tile_library['floor']          = new Tile(".", '#333', '#222', true, true);

// walls
game.tile_library['wall']           = new Tile("#", '#666', '#111', false, false);

// water
game.tile_library['water']          = new Tile("≈", '#99f', '#336', false, true);

// doors
game.tile_library['door_closed']    = new Tile("+", '#bbb', '#111', false, false);
game.tile_library['door_open']      = new Tile("-", '#bbb', '#111', true, true);

// items and pickups
game.tile_library['coin']           = new Tile("$", "#FFD700", '', true, true);

