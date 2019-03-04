class FighterJob extends Job {

    constructor(entity)
    {
        super(entity);
        this.permitted_weapon_types = [];
        this.permitted_armor_types = [];
        this.focus = "physical";
    }

    applyInitialStats()
    {
        this.entity.max_hp = 6;
        this.entity.hp = 6;
        this.entity.max_mp = 1;
        this.entity.mp = 1;
        this.entity.phys_atk = 5;
        this.entity.phys_def = 5;
        this.entity.mag_atk = 1;
        this.entity.mag_def = 1;
        this.entity.speed = 2;
        this.entity.luck = 2;
    }

}