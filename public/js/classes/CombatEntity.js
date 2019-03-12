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


    getSpeed()
    {
        let multiplier = 1;
        if (this.statuses.includes('haste')) { multiplier = 2.0; }
        if (this.statuses.includes('slow'))  { multiplier = 0.5; }
        if (this.statuses.includes('dead'))  { multiplier = 0.0; }
        return (this.speed * multiplier);
    }


    adjustHP(diff)
    {
        this.hp = this.hp + diff;
        if (this.hp > this.max_hp) this.hp = this.max_hp;
        if (this.hp <= 0) {
            this.statuses.push('dead');
        }
    }


    adjustMP(diff)
    {
        this.mp = this.mp + diff;
        if (this.mp > this.max_mp) this.mp = this.max_hp;
        if (this.hp < 0) this.mp = 0;
    }


}
