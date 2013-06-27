var path = require('path');
var mocha = require('mocha');
var chai = require('chai');
var should = chai.should();

var constants = require('../memcached_ext_constants.js');

describe('memcached_ext: CSV Parsing', function() {

	describe('to_csv', function() {
		var to_csv = require('../memcached_ext_csv.js')
			.to_csv;

		describe('Invalid Inputs', function() {
			it('undefined -> ""', function() {
				chai.assert.deepEqual(to_csv(undefined), '');
			});

			it('null -> ""', function() {
				chai.assert.deepEqual(to_csv(null), '');
			});

			it('false -> "false"', function() {
				chai.assert.deepEqual(to_csv(false), 'false');
			});

			it('true -> "true"', function() {
				chai.assert.deepEqual(to_csv(true), 'true');
			});

			it('"" -> ""', function() {
				chai.assert.deepEqual(to_csv(''), '');
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

			it('["Zebra","Stripes"] -> "Zebra,Stripes"', function() {
				chai.assert.deepEqual(to_csv(['Zebra', 'Stripes']), 'Zebra,Stripes');
			});
		});
	});

	describe('parse_csv', function() {
		var parse_csv = require('../memcached_ext_csv.js')
			.parse_csv;

		describe('Invalid Inputs', function() {
			it('undefined -> undefined', function() {
				chai.assert.deepEqual(parse_csv(undefined), undefined);
			});

			it('null -> null', function() {
				chai.assert.deepEqual(parse_csv(null), null);
			});

			it('false -> false', function() {
				chai.assert.deepEqual(parse_csv(false), false);
			});

			it('true -> true', function() {
				chai.assert.deepEqual(parse_csv(true), true);
			});

			it('"" -> []', function() {
				chai.assert.deepEqual(parse_csv(''), []);
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

			it('"Zebra,Stripes" -> ["Zebra", "Stripes"]', function() {
				chai.assert.deepEqual(parse_csv('Zebra,Stripes'), ['Zebra', 'Stripes']);
			});
		});
	});

});
