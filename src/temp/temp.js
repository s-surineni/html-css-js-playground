const needle = require("needle");

console.log('ironman before promise');
function getJoke() {
    needle.get