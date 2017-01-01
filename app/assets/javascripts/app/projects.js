"use strict";

class Projects {
	constructor() {
		this.bindElements();
		this.$projectsContainer.css('width', this.$projects.length * 100 + "%");
	}

	onStop() {
		this.$menu.removeClass('active');
		this.unbindEvents();
	}

	onStart() {
		this.$menu.addClass('active');
		this.bindEvents();
		this.goTo(0);
	}

	bindElements() {
		this.$projectsPageContainer = $('#projects');
		this.$projectsContainer = this.$projectsPageContainer.find('.projects');
		this.$projects = this.$projectsContainer.find('.project');
		this.$menu = $('nav .projects');
	}

	bindEvents() {
		$(document).on('keyup.projects', function(e) {
			if (e.keyCode == 37) {
				this.previousProject();
			} else if (e.keyCode == 39) {
				this.nextProject();
			}
		}.bind(this))
	}

	unbindEvents() {
		$(document).off('.projects')
	}

	previousProject() {
		if (this.currentProject == 0) {
			this.goTo(this.$projects.length - 1);
		} else {
			this.goTo(this.currentProject - 1);
		}
	}

	nextProject() {
		if (this.currentProject == this.$projects.length - 1) {
			this.goTo(0);
		} else {
			this.goTo(this.currentProject + 1);
		}
	}

	goTo(projectPosition) {
		var position = -projectPosition * 100;
		this.$projectsContainer.css('left', position + "%");
		this.currentProject = projectPosition;
	} 
}