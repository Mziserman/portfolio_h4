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

	}

	bindElements() {
		this.$contact = $('#contact');
		this.$menu = $('nav .contact')
	}
}