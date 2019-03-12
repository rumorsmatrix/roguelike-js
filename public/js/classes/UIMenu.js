class UIMenu {

    constructor(data)
    {
        this.container = null;
        this.items = [];
        this.selected_index = 0;

        // load values from data
        for (let index in data) {
            if (data.hasOwnProperty(index)) {
                this[index] = data[index];
            }
        }

        this.container = document.getElementById(this.container);
        this.updateHTML();
    }


    updateHTML()
    {
        if (this.container === null) return false;

        let html = "<ul class=\"ui_menu\">";
        for (let i = 0; i < this.items.length; i++) {
            html += "<li class=\"ui_menu_item\" data-index=\"" + i + "\"><strong>";
            html += (i === this.selected_index) ? "[" : "&nbsp;";
            html += i+1;
            html += (i === this.selected_index) ? "]" : "&nbsp;";
            html += "</strong>&nbsp;";
            html += this.items[i];
            html += "</li>";
        }
        html += "</ul>";
        this.container.innerHTML = html;
    }


    handleKeyEvent(key)
    {
        switch(key) {

            case "VK_UP":
            case "VK_ARROW_UP":
                this.selected_index--;
		        if (this.selected_index === -1) {
                    this.selected_index = (this.items.length - 1);
                }
                break;

            case "VK_DOWN":
            case "VK_ARROW_DOWN":
                this.selected_index++;
		        if (this.selected_index === this.items.length) {
                    this.selected_index = 0;
                }
                break;

            case "VK_1":
            case "VK_2":
            case "VK_3":
            case "VK_4":
            case "VK_5":
            case "VK_6":
            case "VK_7":
            case "VK_8":
            case "VK_9":
            case "VK_0":
                let num = key.charAt(3);
                if (num <= this.items.length) {
                    this.selected_index = num - 1;
                    this.handleSelected(this.selected_index);
                }
                break;

            case "VK_ENTER":
            case "VK_ESC":
                this.handleSelected(-1);
                break;
        }

        this.updateHTML();
    }


    handleSelected(index)
    {
        // to be implemented by individual menus
    }

}
