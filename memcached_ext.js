// 
// Extend the Memcached Class
// 
var _memcached = require('memcached');
module.exports = _memcached;

var _ext_csv = require('./memcached_ext_csv.js');
var to_csv = _ext_csv.to_csv;
var parse_csv = _ext_csv.parse_csv;

var _ext_json = require('./memcached_ext_json.js');
var to_json = _ext_json.to_json;
var parse_json = _ext_json.parse_json;

// Debugging wrapper
var wrap_callback = function(method, key, cb) {
	return function(e, r) {
		// Debugging logging
		console.log(method + '(' + key + ') e=' + e + ', r=' + JSON.stringify(r));

		// Pass through to the callback
		return cb(e, r);
	};
};


// ===========
// CSV Parsing
// ===========
// 

// 
// Get the CSV from Memcached
// 
// Input:            ->Output:
//  undefined        -> undefined
//  null             -> null
//  true/false       -> true/false
//  String           -> Array (split by ',')
//  any other value  -> Converted to String (see above)
// 
_memcached.prototype.get_csv = function(key, cb) {
	if (this.debug) {
		cb = wrap_callback('get', key, cb);
	}

	// Parse the CSV & Pass through to the callback
	var cb2 = function(error, values) {
		// console.log('get_csv=' + values);
		return cb(error, parse_csv(values));
	};

	// Get the data from memcached
	this.get(key, cb2);
};


// 
// Save the CSV in Memcached
// 
// Input:            ->Output:
//  undefined        -> ''
//  null             -> ''
//  true/false       -> "true"/"false"
//  Array            -> String (joined by ',')
//  any other value  -> Converted to Array (see above)
// 
_memcached.prototype.set_csv = function(key, values, lifetime, cb) {
	if (this.debug) {
		cb = wrap_callback('set', key, cb);
	}

	// Serialize the CSV values & Store the string in memcached
	return this.set(key, to_csv(values), lifetime, cb);
}



// ============
// JSON Parsing
// ============

// 
// Get the JSON from Memcached
// 
// Input:            ->Output:
//  undefined        -> undefined
//  null             -> null
//  true/false       -> true/false
//  any other value  -> Parsed JSON
// 
_memcached.prototype.get_json = function(key, cb) {
	if (this.debug) {
		cb = wrap_callback('get', key, cb);
	}

	// Parse the JSON & Pass through to the callback
	var cb2 = function(error, values) {
		return cb(error, parse_json(values));
	};
	this.get(key, cb2);
};


// 
// Save the JSON in Memcached
// 
// Input:            ->Output:
//  undefined        -> 'undefined'
//  null             -> 'null'
//  true/false       -> "true"/"false"
//  any other value  -> Converted to JSON string
// 
_memcached.prototype.set_json = function(key, json_values, lifetime, cb) {
	if (this.debug) {
		cb = wrap_callback('set', key, cb);
	}

	// Serialize the JSON values & Store the string in memcached
	return this.set(key, to_json(json_values), lifetime, cb);
}
