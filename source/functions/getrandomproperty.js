function getRandomProperty(obj) {
    //console.log('Getting random property:');
    //console.log(obj);
    if (obj) {
        var keys = Object.keys(obj);
        //console.log(keys);
        var num = keys.length * Math.random() << 0;
        //console.log(num);
        //console.log('Grp successful.');
        //console.log(obj[keys[num]]);
        return obj[keys[num]];
    } else {
        throw ('Null or undefined object passed to grp.');
    }
}
export default getRandomProperty;
