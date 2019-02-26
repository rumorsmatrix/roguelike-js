class Tile {

    constructor(glyph, fg_color, bg_color, light_passes)
    {
        this.glyph = glyph;
        this.fg_color = fg_color;
        this.bg_color = bg_color;

        this.light_passes = light_passes;
        this.passable = light_passes;
    }

}
