function createPerlinField(fieldIntensity, fieldScale) {
    var f = {};
    f.fieldIntensity = fieldIntensity;
    f.fieldScale = fieldScale;
    f.getFieldValue = function(position, p, sign) {
        return sign * p.noise(position.x / f.fieldScale, position.y / f.fieldScale) * f.fieldIntensity;
    };
    return f;
}