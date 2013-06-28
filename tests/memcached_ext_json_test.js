var path = require('path');
var mocha = require('mocha');
var chai = require('chai');
var should = chai.should();

describe('memcached_ext: JSON Parsing', function() {

	describe('to_json', function() {
		var to_json = require('../memcached_ext_json.js')
			.to_json;

		describe('Invalid Inputs', function() {
			it('undefined -> "undefined"', function() {
				chai.assert.deepEqual(to_json(undefined), 'undefined');
			});

			it('null -> "null"', function() {
				chai.assert.deepEqual(to_json(null), 'null');
			});

			it('false -> "false"', function() {
				chai.assert.deepEqual(to_json(false), 'false');
			});

			it('true -> "true"', function() {
				chai.assert.deepEqual(to_json(true), 'true');
			});

			it('"" -> \'""\'', function() {
				chai.assert.deepEqual(to_json(''), '""');
			});
		});

		describe('Generates json String', function() {
			it('[] -> "[]"', function() {
				chai.assert.deepEqual(to_json([]), '[]');
			});

			it('["Hello"] -> \'["Hello"]\'', function() {
				chai.assert.deepEqual(to_json(['Hello']), '["Hello"]');
			});

			it('["Hello","World"] -> \'["Hello","World"]\'', function() {
				chai.assert.deepEqual(to_json(['Hello', 'World']), '["Hello","World"]');
			});
		});
	});

	describe('parse_json', function() {
		var parse_json = require('../memcached_ext_json.js')
			.parse_json;

		describe('Invalid Inputs return NULL', function() {
			it('undefined', function() {
				chai.assert.deepEqual(parse_json(undefined), undefined);
			});

			it('null', function() {
				chai.assert.deepEqual(parse_json(null), null);
			});

			it('false', function() {
				chai.assert.deepEqual(parse_json(false), false);
			});

			it('false', function() {
				chai.assert.deepEqual(parse_json(true), true);
			});

			it('""', function() {
				chai.assert.deepEqual(parse_json('""'), '');
			});
		});

		describe('Parses json string', function() {
			it('"" -> ""', function() {
				chai.assert.deepEqual(parse_json('""'), '');
			});

			it('"[]" -> []', function() {
				chai.assert.deepEqual(parse_json('[]'), []);
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
