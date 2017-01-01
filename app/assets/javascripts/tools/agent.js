function createAgent(position, p) {
    var a = {};
    a.position = typeof position !== 'undefined' ? position : p.createVector(p.random(width), p.random(height)); // Si aucune position n'est fournie, initialisation avec une position aléatoire
    a.previousPosition = a.position.copy();
    a.angle = p.random(p.TWO_PI);
    a.stepSize = 1;
    a.isPositionResetWhenOutside = true;
    a.updatePosition = function() {
        a.previousPosition = a.position.copy();
        a.position.x -= p.cos(a.angle) * a.stepSize;
        a.position.y += p.sin(a.angle) * a.stepSize;
        if (a.isPositionResetWhenOutside && a.isOutsideSketch() > 0) {
            a.position = p.createVector(p.random(width), p.random(height));
            a.previousPosition = a.position.copy();
        }
    };
    a.isOutsideSketch = function() {
        if (a.position.y < 0) {
            return 1;
        } else if (a.position.x > p.width) {
            return 2;
        } else if (a.position.y > p.height) {
            return 3;
        } else if (a.position.x < 0) {
            return 4;
        } else {
            return 0;
        }
    };
    return a;
}