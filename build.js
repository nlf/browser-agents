var Fs = require('fs');
var Async = require('async');
var Nipple = require('nipple');
var Cheerio = require('cheerio');

var agents = {};

var parseVersion = function (version) {

    var re = /[^\.]*\.[^\.]*/.exec(version);

    if (re) {
        return re[0];
    }
    else {
        return version;
    }
};

var parse = function (context) {

    var versions = {};
    var $ = Cheerio.load(context);

    $('h4').each(function (index, header) {

        var version = parseVersion($(header).text().split(' ').pop());

        if (!versions[version]) {
            versions[version] = [];
        }

        versions[version].random = function () {

            var randomItem = versions[version][Math.floor(Math.random() * versions[version].length)];
            if (typeof randomItem === 'function') {
                return versions[version].random();
            }

            return randomItem;
        };

        $('li > a', $(header).next('ul')).each(function (index, str) {

            var s = $(str).text();
            if (s.toLowerCase().indexOf('mobile') === -1) {
                versions[version].push($(str).text());
            }
        });

        if (!versions[version].length) {
            delete versions[version];
        }
    });

    return versions;
};

var browsers = ['Internet Explorer', 'Chrome', 'Firefox', 'Safari', 'Opera'];

Async.each(browsers, function (browser, cb) {

    Nipple.get('http://www.useragentstring.com/pages/' + browser + '/', { }, function (err, res, body) {

        agents[browser] = parse(body);
        cb();
    });
}, function () {

    Fs.writeFileSync('./browsers.json', JSON.stringify(agents), 'utf8');
});
