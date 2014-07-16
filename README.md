## browser-agents

This module exports properties for each of the major browser families (IE, Opera, Firefox, Chrome, and Safari).

Within those objects, is another object with each version (i.e. '35.0').

And within *those* objects is an array containing known user agent strings for that browser and version.

To get a random user agent string for any version of any browser:

```javascript
var agents = require('browser-agents');
agents.random();
```

To get a random user agent string for a specific browser:

```javascript
var agents = require('browser-agents');
agents.Chrome.random();
agents.Opera.random();
agents.Safari.random();
agents.Firefox.random();
agents['Internet Explorer'].random();
```

And to get a random user agent string for a specific version of a specific browser:

```javascript
var agents = require('browser-agents');
agents.Chrome['34.0'].random();
```
