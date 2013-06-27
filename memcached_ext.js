var memcached = require('memcached');

// Debugging wrapper
var wrap_callback = function(method, key, cb) {
	return function(e, r) {
		// Debugging logging
		console.log(method + '(' + key + ') e=' + e + ', r=' + JSON.stringify(r));

		// Pass through to the callback
		return cb(e, r);
	};
};


// 
// CSV Parsing
// 
var memcached_ext_csv = require('./memcached_ext_csv.js');
var to_csv = memcached_ext_csv.to_csv;
var parse_csv = memcached_ext_csv.parse_csv;

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


// 
// JSON Parsing
// 
var memcached_ext_json = require('./memcached_ext_json.js');
var to_json = memcached_ext_json.to_json;
var parse_json = memcached_ext_json.parse_json;

// Read the JSON
memcached.prototype.get_json = function(key, cb) {
	// Debugging logging
	if (this.debug) {
		cb = wrap_callback('get', key, cb);
	}

	this.get(key, function(error, json_values) {
		// Parse the JSON
		// Pass through to the callback
		return cb(error, parse_json(json_values));
	});
};

// Store the JSON
memcached.prototype.set_json = function(key, json_values, lifetime, cb) {
	if (this.debug) {
		cb = wrap_callback('set', key, cb);
	}

	// Serialize the JSON values
	// Store the string in memcached
	return this.set(key, to_json(json_values), lifetime, cb);
}


// 
// Extend the Memcached Class
// 
module.exports = memcached;
