var path = require('path');
var mocha = require('mocha');
var chai = require('chai');
var should = chai.should();

var constants = require('../memcached_ext_constants.js');

describe('memcached_ext: CSV Parsing', function() {

	describe('to_csv', function() {
		var to_csv = require('../memcached_ext_csv.js')
			.to_csv;


		describe('Invalid Inputs return EMPTY_VALUE', function() {
			it('undefined', function() {
				chai.assert.deepEqual(to_csv(undefined), constants.EMPTY_VALUE);
			});

			it('null', function() {
				chai.assert.deepEqual(to_csv(null), constants.EMPTY_VALUE);
			});

			it('false', function() {
				chai.assert.deepEqual(to_csv(false), constants.EMPTY_VALUE);
			});

			it('EMPTY_VALUE', function() {
				chai.assert.deepEqual(to_csv(constants.EMPTY_VALUE), constants.EMPTY_VALUE);
			});
		});


		describe('Generates CSV String', function() {
			it('[] -> ""', function() {
				chai.assert.deepEqual(to_csv([]), '');
			});

			it('["Hello"] -> "Hello"', function() {
				chai.assert.deepEqual(to_csv(['Hello']), 'Hello');
			});

			it('["Hello","World"] -> "Hello,World"', function() {
				chai.assert.deepEqual(to_csv(['Hello', 'World']), 'Hello,World');
			});
		});
	});

	describe('parse_csv', function() {
		var parse_csv = require('../memcached_ext_csv.js')
			.parse_csv;

		describe('Invalid Inputs return NULL', function() {
			it('undefined', function() {
				chai.assert.deepEqual(parse_csv(undefined), null);
			});

			it('null', function() {
				chai.assert.deepEqual(parse_csv(null), null);
			});

			it('false', function() {
				chai.assert.deepEqual(parse_csv(false), null);
			});

			it('EMPTY_VALUE', function() {
				chai.assert.deepEqual(parse_csv(constants.EMPTY_VALUE), null);
			});
		});

		describe('Parses CSV string', function() {
			it('"" -> []', function() {
				chai.assert.deepEqual(parse_csv(''), []);
			});

			it('"Hello" -> ["Hello"]', function() {
				chai.assert.deepEqual(parse_csv('Hello'), ['Hello']);
			});

			it('"Hello,World" -> ["Hello", "World"]', function() {
				chai.assert.deepEqual(parse_csv('Hello,World'), ['Hello', 'World']);
			});
		});
	});

});
