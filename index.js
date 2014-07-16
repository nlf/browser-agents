var Browsers = require('./browsers.json');

var pickOne = function (obj) {

    var list = Array.isArray(obj) ? obj : Object.keys(obj);
    var item = list[Math.floor(Math.random() * list.length)];
    if (typeof obj[item] === 'function') {
        return pickOne(list);
    }

    return item;
};

Object.keys(Browsers).forEach(function (browser) {

    // Object.keys(Browsers[browser]).forEach(function (version) {
    //
    //     Browsers[browser][version].random = function () {
    //
    //         return pickOne(Browsers[browser][version]);
    //     };
    // });

    Browsers[browser].random = function () {

        return Browsers[browser][pickOne(Browsers[browser])];
    };
});

Browsers.random = function () {

    return Browsers[pickOne(Browsers)].random();
};

module.exports = Browsers;
