var spawn = require('child_process')
	.spawn;
var exec = require('child_process')
	.exec;

var MemcachedServer = function() {
	this.port = 11211 + Math.round((Math.random() * 100)) + 1;
};


MemcachedServer.prototype.start = function() {
	if (undefined !== this.server) return this;

	var _port = this.port;
	var args  = ['-p', _port];
	if (this.debug) args.push('-vv');

	this.server = spawn('memcached', args);
	this.server.on('exit', function(code) {
		console.log('memcached[' + _port + '] exited with code ' + code);
	});
	this.server.on('close', function(code) {
		console.log('memcached[' + _port + '] closed with code ' + code);
	});
	this.server.stdout.on('data', function(data) {
		console.log('memcached[' + _port + '] >> ' + data);
	});
	this.server.stderr.on('data', function(data) {
		console.log('memcached[' + _port + '] !! ' + data);
	});
	
	return this;
};

MemcachedServer.prototype.stop = function() {
	if (undefined !== this.server) {
		this.server.kill();
	}
	this.server = undefined;
	
	return this;
};


MemcachedServer.prototype.createMemcachedHandle = function(server) {
	if (undefined === this.server) {
		this.start();
	}
	
	var memcached_ext      = require('../memcached_ext.js');
	var memcached_handle   = new memcached_ext('localhost:' + this.port);
	memcached_handle.debug = this.debug;
	return memcached_handle;
};


module.exports = {}
module.exports.createServer = function() {
	return new MemcachedServer();
};
