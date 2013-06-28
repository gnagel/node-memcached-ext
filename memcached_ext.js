// 
// Extend the Memcached Class
// 
var _memcached = require('memcached');
var _csv = require('./memcached_ext_csv.js');
var _json = require('./memcached_ext_json.js');
module.exports = _memcached;
module.exports.utils = {
	to_csv: _csv.to_csv,
	parse_csv: _csv.parse_csv,

	to_json: _json.to_json,
	parse_json: _json.parse_json,
};

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
		return cb(error, _csv.parse_csv(values));
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
	return this.set(key, _csv.to_csv(values), lifetime, cb);
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
		return cb(error, _json.parse_json(values));
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
	return this.set(key, _json.to_json(json_values), lifetime, cb);
};
