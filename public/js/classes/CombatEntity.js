class CombatEntity {

    constructor(entity_data)
    {
        // default values
        this.name = "";
        this.job = null;
        this.level = 1;
        this.xp = 0;

        this.hp = 1;
        this.max_hp = 1;

        this.mp = 1;
        this.max_mp = 1;

        this.phys_atk = 1;
        this.phys_def = 1;
        this.mag_atk = 1;
        this.mag_def = 1;

        this.speed = 1;
        this.luck = 1;

        this.statuses = [];

        // load values from data
        for (let index in entity_data) {
            if (entity_data.hasOwnProperty(index)) {
                this[index] = entity_data[index];
            }
        }

    }


}