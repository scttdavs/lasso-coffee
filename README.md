lasso-coffee
==============

Lasso.js plugin to support compilation of [CoffeeScript](http://coffeescript.org/) dependencies. Note, this plugin will defer to your version of coffeescript, so you should make sure to include that in your app's `package.json`.

# Installation

```sh
npm install lasso-coffee --save
```

The `lasso-coffee` plugin will then need to be registered as shown below before you can start adding CoffeeScript dependencies:

```javascript
require('lasso').configure({
    ...
    plugins: [
        'lasso-coffee',
        ...
    ]
});
```

# Basic Usage

**browser.json**

```json
{
    "dependencies": [
        "./foo.coffee",
        "./bar.coffee"
	]
}
```

The `lasso-coffee` plugin will concatenate all of the CoffeeScript dependencies targeted for the same bundle and pass that as input to the CoffeeScript renderer. Therefore, given the following contents of each file:

_foo.coffee:_

```coffee
foo = 'foo'
```

_bar.coffee:_

```coffee
bar = 'bar'
```

The output will be the following:

```javascript
var foo = 'foo';

var bar = 'bar';
```
