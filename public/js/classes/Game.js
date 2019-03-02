let game = {};

// display widths and heights need to be even numbers, or the FOV/FOW scrolling can break
game.display_width = 42;  // 42
game.display_height = 34; // 34
game.map_width = 60;  // 60x60
game.map_height = 60;


game.log = new Log("log_container");

game.display = new ROT.Display({
    bg: "#000",
    tileWidth: 14,
    tileHeight: 14,
    fontFamily: "Fira Mono, monospace",
    fontSize: 14,
    forceSquareRatio: true,
    width: game.display_width,
    height: game.display_height
});

game.mixins = {};
game.scheduler = new ROT.Scheduler.Speed();
game.engine = new ROT.Engine(game.scheduler);
