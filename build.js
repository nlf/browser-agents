var Fs = require('fs');
var Useragent = require('useragent');

var agents = {};
var whitelist = [
    'IE',
    'Chrome',
    'Safari',
    'Firefox',
    'Opera',
    'Mobile Safari',
    'Opera Mobile',
    'Firefox Mobile',
    'IE Mobile'
];

Fs.readFile('./user_agents.txt', 'utf8', function (err, file) {

    file.split('\n').forEach(function (line) {

        var agent = Useragent.parse(line);
        if (whitelist.indexOf(agent.family) === -1) {
            return;
        }

        agents[agent.family] = agents[agent.family] || {};
        agents[agent.family][agent.major + '.' + agent.minor] = line;
    });

    Fs.writeFileSync('./browsers.json', JSON.stringify(agents), 'utf8');
});
