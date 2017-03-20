"use strict";

class Portfolio {
	constructor() {
		this.bindElements();
		this.bindEvents();
		this.setupParameters();
		this.onStart();
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
		$(window).resize(_.debounce(function(e) {
			this.onResize();
		}.bind(this), 200));
	}

	setupParameters() {
		this.width = window.innerWidth - 8;
		this.height = window.innerHeight - 8;
		this.fieldIntensity = 10;
		this.fieldScale = 350;
		this.agentCount = 400;
		this.circleRadius = this.width > this.height ? this.height / 2.5 : this.width / 2.5;
		this.circleAlpha = 20;
		this.circleLineWeight = 1.3;
		this.circleHue = 100;
		this.circleSaturation = 100;
		this.circleBrightness = 100;
		this.hueStep = 1;
		this.saturationStep = 1;
		this.brightnessStep = 0;
		this.agents = [];
	}

	perlinCircle(p) {
		var self = this;
		var fader;
		var fader2;
		var field;
		p.setup = function() {
			p.createCanvas(self.width, self.height);
			field = createPerlinField(self.fieldIntensity, self.fieldScale);
			var angleStep = p.TWO_PI / self.agentCount;
			var a, x, y;
			// for (var i = self.agentCount - 1; i >= 0; i--) {
			// 	x = p.width / 2 + p.cos(i * angleStep) * self.circleRadius;
			// 	y = p.height / 2 + p.sin(i * angleStep) * self.circleRadius;
			// 	a = createAgent(p.createVector(x, y), p);
			// 	a.isPositionResetWhenOutside = false;
			// 	a.sign = a.position.y > p.height / 2 ? 1 : -1;
			// 	self.agents.push(a);
			// };

			fader = createColorFader(0, self.circleSaturation, self.circleBrightness, 0, self.saturationStep, self.brightnessStep);
			fader2 = createColorFader(self.circleHue, 0, 0, self.hueStep, 0, 0); // On utilise ici un second fader pour faire évoluer la teinte du cercle au cours du temps

			p.background(0);
			p.colorMode(p.HSB, 360, 100, 100, 255);
			p.loop();
		};


		$(window).mousemove(function(e) {
			var x = e.pageX;
			var y = e.pageY;
			var a = createAgent(p.createVector(x, y), p);
			a.isPositionResetWhenOutside = false;
			a.sign = a.position.y > p.height / 2 ? 1 : -1;

			self.agents.push(a);
			
			if (self.agents.length > self.agentCount) {
				self.agents.shift();
			}
		})

		p.draw = function() {
			p.beginShape();	
			self.agents.forEach(function(a) {
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
			if (self.agents.length > 3) {
				p.curveVertex(self.agents[0].position.x, self.agents[0].position.y);
				p.curveVertex(self.agents[1].position.x, self.agents[1].position.y);
				p.curveVertex(self.agents[2].position.x, self.agents[2].position.y);
			}
			p.endShape();
			if (self.out) {
				p.noLoop();
			}
			// if (p.frameCount % (Math.floor(self.circleRadius * 8)) == 0) {
			// 	p.noLoop();
			// }
			p.background(255, 0, 0, 15)
		};
	}
}