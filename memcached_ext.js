var memcached = require('memcached');
var constants = require('../memcached_ext_constants.js');
var memcached_ext_csv = require('./memcached_ext_csv.js');
var to_csv = memcached_ext_csv.to_csv;
var parse_csv = memcached_ext_csv.parse_csv;

// Debugging wrapper
var wrap_callback(method, key, cb) {
	return function(e, r) {
		// Debugging logging
		console.log(method + '(' + key + ') e=' + e + ', r=' + JSON.stringify(r));

		// Pass through to the callback
		return cb(e, r);
	};
};

// Read the CSV
memcached.prototype.get_csv = function(key, cb) {
	// Debugging logging
	if (this.debug) {
		cb = wrap_callback('get', key, cb);
	}

	this.get(key, function(error, csv_values) {
		// Parse the CSV
		// Pass through to the callback
		return cb(error, parse_csv(csv_values));
	});
};

// Store the CSV
memcached.prototype.set_csv = function(key, csv_values, lifetime, cb) {
	if (this.debug) {
		cb = wrap_callback('set', key, cb);
	}

	// Serialize the CSV values
	// Store the string in memcached
	return this.set(key, to_csv(csv_values), lifetime, cb);
}
