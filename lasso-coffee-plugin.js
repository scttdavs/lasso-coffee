var fs = require('fs');
var coffee = require('coffee-script');

module.exports = function myPlugin(lasso, config) {
    lasso.dependencies.registerRequireType(
        'coffee',
        {
            // Declare which properties can be passed to the dependency type
            properties: {
                'path': 'string'
            },

            // Validation checks and initialization based on properties:
            init: function(context, callback) {
                if (!this.path) {
                    return callback(new Error('"path" is required for a CoffeeScript dependency'));
                }

                // NOTE: resolvePath can be used to resolve a provided relative path to a full path
                this.path = this.resolvePath(this.path);
                callback();
            },

            // Read the resource:
            read: function(context, callback) {
                var path = this.path;

                fs.readFile(path, {encoding: 'utf8'}, function(err, src) {
                    if (err) {
                        return callback(err);
                    }

                    var compiledCode = coffee.compile(src, {
                        bare: true
                    });

                    callback(null, compiledCode);
                });

                // NOTE: A stream can also be returned
            }
            
        });

};
