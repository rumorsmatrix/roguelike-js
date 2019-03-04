class UIStateManager {

    constructor()
    {
        this.state = 'explore';
    }


    setState(state)
    {
        this.state = state;
        window.removeEventListener('keydown', game.player);
        window.addEventListener('keydown', this);
        document.getElementById('subscreen_' + state).style.visibility = 'visible';
    }


    unsetState()
    {
        console.log("UNSET STATE: " + this.state);
        console.log(this);
        document.getElementById('map_container').style.visibility = 'visible';
        document.getElementById('log_container').style.visibility = 'visible';
        document.getElementById('sidebar_container').style.visibility = 'visible';

        document.getElementById('subscreen_' + this.state).style.visibility = 'hidden';
        window.removeEventListener('keydown', game.ui_state);
        window.addEventListener('keydown', game.player);
        this.state = 'explore';

        console.log('end of unset state');
    }


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


    handleEvent(e)
    {
        console.log("ui state handled key press");
        e.stopPropagation();

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