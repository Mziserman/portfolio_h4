"use strict";

class Skills {
	constructor() {
		this.bindElements()
	}
	onStop() {
		this.$menu.removeClass('active');
	}

	onStart() {
		this.$menu.addClass('active');
	}

	onResize() {

	}

	bindElements() {
		this.$home = $('#skills');
		this.$menu = $('nav .skills')
	}
}