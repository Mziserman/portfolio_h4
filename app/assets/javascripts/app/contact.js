"use strict";

class Contact {
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
		this.resizePictureContainer();
	}

	bindElements() {
		this.$home = $('#contact');
		this.$menu = $('nav .contact')
	}
}