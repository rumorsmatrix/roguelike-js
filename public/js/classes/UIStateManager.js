class UIStateManager {

    constructor()
    {
        this.state = 'explore';
        this.UIHandlers = {
            'test_menu': new UIMenu({
                'container': 'subscreen_test_menu',
                'items': ['Item One', 'Item Two', 'Item Three'],
                'handleSelected': function(index) {
                    if (index === -1) {
                        game.ui_state.unsetState('test_menu');
                        return true;
                    }

                    game.log.write("You selected index [" + index + "]: " + this.items[index] );
                    return true;
                }
            }),
        };
    }


    setState(state)
    {
        this.state = state;
        window.removeEventListener('keydown', game.player);
        // noinspection JSUnresolvedFunction
        window.addEventListener('keydown', this);
        document.getElementById('subscreen_container').style.display = 'block';
        document.getElementById('subscreen_' + state).style.display = 'block';
    }


    unsetState()
    {
        console.log("UNSET STATE: " + this.state);

        document.getElementById('map_container').style.display = 'block';
        document.getElementById('log_container').style.display = 'block';
        document.getElementById('sidebar_container').style.display = 'block';
        document.getElementById('subscreen_container').style.display = 'none';
        document.getElementById('subscreen_' + this.state).style.display = 'none';
        window.removeEventListener('keydown', game.ui_state);
        window.addEventListener('keydown', game.player);
        this.state = 'explore';
    }


    // noinspection JSMethodCanBeStatic -- just because it can doesn't mean it should
    getVirtualKey(e)
    {
        let virtual_key = "";
        for (let key_name in ROT.KEYS) {
            if (ROT.KEYS.hasOwnProperty(key_name) && ROT.KEYS[key_name] === e.key && key_name.indexOf("VK_") === 0) {
                virtual_key = key_name;
                break; // no need to keep looking now
            }
        }
        return virtual_key;
    }


    // noinspection JSUnusedGlobalSymbols -- handleEvent is obviously called at runtime
    handleEvent(e)
    {
        console.log("ui state handled key press");
        e.stopPropagation();

        if (this.UIHandlers[this.state] !== undefined) {
            return this.UIHandlers[this.state].handleKeyEvent(this.getVirtualKey(e));
        }


        // todo: these hardcoded states need turning into objects
        if (this.state === 'title') {
            this.unsetState();
            return true;
        }

        if (this.state === 'about') {
            switch (this.getVirtualKey(e)) {
                case 'VK_ESC':
                    console.log("escape key");
                    console.log(this.state);
                    this.unsetState();
                    break;
                case 'VK_1':
                    window.open('https://twitter.com/rumorsmatrix', '_blank');
                    break;
                case 'VK_2':
                    window.open('https://rumorsmatrix.com', '_blank');
                    break;
                case 'VK_3':
                    window.open('http://ondras.github.io/rot.js/hp/', '_blank');
                    break;
            }
        }

    }


}
