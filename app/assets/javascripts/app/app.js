"use strict";

class Portfolio {
	constructor() {
		this.bindReferences();
		this.bindElements();
		this.bindEvents();
		this.currentScreen = this.sectionReferences["home"];
		this.currentScreen.reference.onStart();
	}

	bindReferences() {
		this.sectionReferences = {
			"home": {
				position: "-0vh",
				reference: new Home()
			},
			"projects": {
				position: "-100vh",
				reference: new Projects()
			},
			"contact": {
				position: "-200vh",
				reference: new Contact()
			}
		}
	}

	bindElements() {
		this.$main = $('#main');
		this.$wrapper = this.$main.find('.wrapper');
	}

	bindEvents() {
		$('nav ul li a').click(function(e) {
			e.preventDefault();
			var target = e.target.dataset.target;
			this.goTo(target);
		}.bind(this));

		$(window).resize(_.debounce(function(e) {
			console.log(this.sectionReferences);
			_.each(this.sectionReferences, function(value, key) {
				// console.log(value);
				value.reference.onResize();
			})
		}.bind(this), 200));
	}

	goTo(target) {
		if (this.currentScreen == this.sectionReferences[target]) {
			return
		}
		var position = this.sectionReferences[target].position;
		this.$wrapper.css('top', position);
		this.currentScreen.reference.onStop();
		this.sectionReferences[target].reference.onStart();
		this.currentScreen = this.sectionReferences[target];
	}
}