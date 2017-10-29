function isNumber(n) {
    return typeof n == 'number' && !isNaN(parseFloat(n)) && isFinite(n);
}
module.exports = isNumber;
