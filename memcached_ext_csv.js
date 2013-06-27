var constants = require('./memcached_ext_constants.js');
var CSV_DELIMITER = constants.CSV_DELIMITER;

// 
// CSV Serializer
// 
// Input:            ->Output:
//  undefined        -> ''
//  null             -> ''
//  true/false       -> "true"/"false"
//  Array            -> String (joined by ',')
//  any other value  -> Converted to Array (see above)
// 
module.exports = {};
module.exports.to_csv = function(values) {
	// Handle invalid values
	if (undefined === values || null === values) {
		// Convert to "Empty Array"
		values = [];
	} else if ('boolean' === (typeof values)) {
		// Convert to Single-Value Array
		values = [values.toString()];
	} else if ('string' === (typeof values)) {
		// Convert to Single-Value Array
		values = [values];
	}

	// Cast to an Array if it not one
	if (values.constructor != Array) {
		values = [values]
	}

	// Join the array
	values = values.join(CSV_DELIMITER);
	
	// Return the string
	return values;
};

// 
// CSV Parser
// 
// Input:            ->Output:
//  undefined        -> undefined
//  null             -> null
//  true/false       -> true/false
//  String           -> Array (split by ',')
//  any other value  -> Converted to String (see above)
// 
module.exports.parse_csv = function(values) {
	// Handle invalid values
	if (undefined === values || null === values || 'boolean' === (typeof values)) {
		// Return the input
		return values;
	}

	// Cast to a string if it is not one
	if (values.constructor != String) {
		values = values.toString();
	}

	// Empty strings get converted to empty arrays
	values = (values.length === 0 ? [] : values.split(CSV_DELIMITER));

	// Return the array
	return values;
};
