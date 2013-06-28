var path = require('path');
var mocha = require('mocha');
var chai = require('chai');
var should = chai.should();

// Get a handle to the server and start a new instance
var memcached_server = require('./memcached_server.js').createServer().start();

// Enable/Disable verbose logging
memcached_server.debug = false;

// Stop the Memcached Server
process.on('exit', function() {
	console.log('Stopping server ...');
	memcached_server.stop();
});

describe('memcached_ext', function() {
	describe('CSV', function() {

		it('Get CSV for missing key -> false', function(done) {
			var memcached_handle =
memcached_server.createMemcachedHandle();
			
			memcached_handle.get_csv('my-csv', function(error, csv) {
				chai.assert.isUndefined(error);
				chai.assert.isFalse(csv);
				done();
			});
		});

		it('Set/Get CSV for "a,b,c" key -> ["a", "b", "c"]', function(done) {
			var memcached_handle = memcached_server.createMemcachedHandle();
			
			memcached_handle.set_csv('my-csv', ["a", "b", "c"], 30, function(error, results) {
				chai.assert.isUndefined(error);
				chai.assert.isTrue(results);

				memcached_handle.get_csv('my-csv', function(error, csv) {
					chai.assert.isUndefined(error);
					chai.assert.deepEqual(csv, ["a", "b", "c"]);
					done();
				});
			});

		});

	});

	describe('JSON', function() {

		it('Get JSON for missing key -> false', function(done) {
			var memcached_handle =
memcached_server.createMemcachedHandle();
			
			memcached_handle.get_json('my-json', function(error, json) {
				chai.assert.isUndefined(error);
				chai.assert.isFalse(json);
				done();
			});
		});

		it('Set/Get JSON for "a,b,c" key -> ["a", "b", "c"]', function(done) {
			var memcached_handle = memcached_server.createMemcachedHandle();
			
			memcached_handle.set_json('my-json', ["a", "b", "c"], 30, function(error, results) {
				chai.assert.isUndefined(error);
				chai.assert.isTrue(results);

				memcached_handle.get_json('my-json', function(error, json) {
					chai.assert.isUndefined(error);
					chai.assert.deepEqual(json, ["a", "b", "c"]);
					done();
				});
			});

		});

	});
});
