class Log {

	constructor(html_container)
	{
		this.container = document.getElementById(html_container);
	}


	write(str, css_class)
	{
		let new_p = document.createElement("p");
		let node = document.createTextNode(str);
		new_p.classList.add(css_class);
		new_p.appendChild(node);

		this.container.appendChild(new_p);
		this.container.scrollTop = this.container.scrollHeight;
	}


	clear()
	{
		this.container.innerHTML = "";
	}

}
