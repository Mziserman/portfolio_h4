"use strict";

class Home {
	constructor() {
		this.bindElements();
		this.setupParameters();
	}

	onStop() {
		this.$home.find('canvas').remove();
		this.out = true;
		this.$menu.removeClass('active');
	}

	onStart() {
		this.out = false;
		this.p5 = new p5(this.perlinCircle.bind(this), "home");
		this.$menu.addClass('active');
		this.bindElements();
		this.bindEvents();
	}

	onResize() {
		this.$home.find('canvas').remove();
		this.setupParameters();
		this.p5 = new p5(this.perlinCircle.bind(this), "home");
	}

	bindElements() {
		this.$home = $('#home');
		this.$menu = $('nav .home');
		this.$projects = $('.project');
	}

	bindEvents() {
		this.$projects.click(function(e) {
			if ($(e.currentTarget).hasClass('active')) {
				this.$projects.removeClass('active');
			} else {
				this.$projects.removeClass('active')
				this.$projects.addClass('inactive')
				$(e.currentTarget).addClass('active');	
			}
			
			
		}.bind(this))
		this.$projects.click(function(e) {

		})
	}

	setupParameters() {
		this.width = this.$home.width();
		this.height = this.$home.height();
		this.fieldIntensity = 10;
		this.fieldScale = 350;
		this.agentCount = 400;
		this.circleRadius = this.width > this.height ? this.height / 2.5 : this.width / 2.5;
		this.circleAlpha = 20;
		this.circleLineWeight = 0.3;
		this.circleHue = 200;
		this.circleSaturation = 100;
		this.circleBrightness = 60;
		this.hueStep = 0.6;
		this.saturationStep = -0.02;
		this.brightnessStep = 0.1;
	}

	perlinCircle(p) {
		var self = this;
		var agents;
		var fader;
		var fader2;
		var field;
		p.setup = function() {
			p.createCanvas(self.width, self.height);
			field = createPerlinField(self.fieldIntensity, self.fieldScale);
			var angleStep = p.TWO_PI / self.agentCount;
			agents = [];
			var a, x, y;
			for (var i = self.agentCount - 1; i >= 0; i--) {
				x = p.width / 2 + p.cos(i * angleStep) * self.circleRadius;
				y = p.height / 2 + p.sin(i * angleStep) * self.circleRadius;
				a = createAgent(p.createVector(x, y), p);
				a.isPositionResetWhenOutside = false;
				a.sign = a.position.y > p.height / 2 ? 1 : -1;
				agents.push(a);
			};

			fader = createColorFader(0, self.circleSaturation, self.circleBrightness, 0, self.saturationStep, self.brightnessStep);
			fader2 = createColorFader(self.circleHue, 0, 0, self.hueStep, 0, 0); // On utilise ici un second fader pour faire évoluer la teinte du cercle au cours du temps

			p.background(0);
			p.colorMode(p.HSB, 360, 100, 100, 255);
			p.loop();
		};
		p.draw = function() {
			p.beginShape();
			agents.forEach(function(a) {
				// if (a.isOutsideSketch() == 1 || a.isOutsideSketch() == 3) {
				// 	a.sign = a.sign * -1
				// }
				a.angle = field.getFieldValue(a.position, p, a.sign);
				a.updatePosition();
				p.stroke(fader2.x, fader.y, fader.z, self.circleAlpha); // 'fader2' contrôle la teinte, 'fader' la saturation et la luminosité
				p.strokeWeight(self.circleLineWeight);
				p.noFill();
				p.curveVertex(a.position.x, a.position.y);
			});
			if (agents.length > 3) {
				p.curveVertex(agents[0].position.x, agents[0].position.y);
				p.curveVertex(agents[1].position.x, agents[1].position.y);
				p.curveVertex(agents[2].position.x, agents[2].position.y);
			}
			p.endShape();
			if (self.out) {
				p.noLoop();
			}
			if (p.frameCount % (Math.floor(self.circleRadius * 8)) == 0) {
				p.noLoop();
			}
		};
	}
}