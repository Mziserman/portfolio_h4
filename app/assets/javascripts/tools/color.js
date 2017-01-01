function createColorFader(x, y, z, xStep, yStep, zStep) {
    var f = {};
    f.x = x;
    f.y = y;
    f.z = z;
    f.xStep = xStep;
    f.yStep = yStep;
    f.zStep = zStep;
    f.update = function() {
        f.x += f.xStep;
        f.y += f.yStep;
        f.z += f.zStep;
    };
    p5.prototype.registerMethod('pre', f.update);
    return f;
}