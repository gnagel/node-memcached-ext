var path = require('path');
var mocha = require('mocha');
var chai = require('chai');
var should = chai.should();

var constants = require('../memcached_ext_constants.js');

describe('memcached_ext: JSON Parsing', function() {

	describe('to_json', function() {
		var to_json = require('../memcached_ext_json.js')
			.to_json;

		describe('Invalid Inputs return EMPTY_VALUE', function() {
			it('undefined', function() {
				chai.assert.deepEqual(to_json(undefined), constants.EMPTY_VALUE);
			});

			it('null', function() {
				chai.assert.deepEqual(to_json(null), constants.EMPTY_VALUE);
			});

			it('false', function() {
				chai.assert.deepEqual(to_json(false), constants.EMPTY_VALUE);
			});

			it('EMPTY_VALUE', function() {
				chai.assert.deepEqual(to_json(constants.EMPTY_VALUE), constants.EMPTY_VALUE);
			});
		});

		describe('Generates json String', function() {
			it('[] -> ""', function() {
				chai.assert.deepEqual(to_json([]), '[]');
			});

			it('["Hello"] -> "Hello"', function() {
				chai.assert.deepEqual(to_json(['Hello']), '["Hello"]');
			});

			it('["Hello","World"] -> "Hello,World"', function() {
				chai.assert.deepEqual(to_json(['Hello', 'World']), '["Hello","World"]');
			});
		});
	});

	describe('parse_json', function() {
		var parse_json = require('../memcached_ext_json.js')
			.parse_json;

		describe('Invalid Inputs return NULL', function() {
			it('undefined', function() {
				chai.assert.deepEqual(parse_json(undefined), null);
			});

			it('null', function() {
				chai.assert.deepEqual(parse_json(null), null);
			});

			it('false', function() {
				chai.assert.deepEqual(parse_json(false), null);
			});

			it('EMPTY_VALUE', function() {
				chai.assert.deepEqual(parse_json(constants.EMPTY_VALUE), null);
			});
		});

		describe('Parses json string', function() {
			it('"" -> null', function() {
				chai.assert.deepEqual(parse_json(''), null);
			});

			it('"Hello" -> ["Hello"]', function() {
				chai.assert.deepEqual(parse_json('"Hello"'), 'Hello');
			});

			it('"Hello,World" -> ["Hello", "World"]', function() {
				chai.assert.deepEqual(parse_json('["Hello","World"]'), ['Hello', 'World']);
			});
		});
	});

});
