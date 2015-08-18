'use strict';
var chai = require('chai');
chai.Assertion.includeStack = true;
require('chai').should();
var expect = require('chai').expect;
var nodePath = require('path');
var fs = require('fs');

var coffeePlugin = require('../'); // Load this module just to make sure it works
var lasso = require('lasso');

describe('lasso-coffee' , function() {

    beforeEach(function(done) {
        for (var k in require.cache) {
            if (require.cache.hasOwnProperty(k)) {
                delete require.cache[k];
            }
        }
        done();
    });

    it('should render a simple CoffeeScript dependency', function(done) {

        var myLasso = lasso.create({
                fileWriter: {
                    fingerprintsEnabled: false,
                    outputDir: nodePath.join(__dirname, 'static')
                },
                bundlingEnabled: true,
                plugins: [
                    {
                        plugin: coffeePlugin,
                        config: {

                        }
                    }
                ]
            });

        myLasso.lassoPage({
                name: 'testPage',
                dependencies: [
                    nodePath.join(__dirname, 'fixtures/project1/simple.coffee')
                ]
            },
            function(err, optimizedPage) {
                if (err) {
                    return done(err);
                }

                var output = fs.readFileSync(nodePath.join(__dirname, 'static/testPage.js'), {encoding: 'utf8'});
                expect(output).to.equal('(function() {\n  var foo;\n\n  foo = \'bar\';\n\n}).call(this);\n');
                done();
            });
    });

});
