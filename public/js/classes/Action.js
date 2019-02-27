class Action {

    constructor(actor, method_to_call = "", parameters = {})
    {
        this.actor = actor;
        this.method_to_call = method_to_call;
        this.parameters = parameters;
    }

    execute()
    {
        // ideally this method should be overwritten by the extending class
        if (typeof this.actor[this.method_to_call] === 'function') {
            this.actor[this.method_to_call](this.parameters);
        }
    }

}
