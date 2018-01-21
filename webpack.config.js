module.exports = {
    entry: "./source/workers/sim.js",
    output: {
        path: __dirname + '/source/workers/packed',
        filename: "sim.js"
    },
    watch: true
};