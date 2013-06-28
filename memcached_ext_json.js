// 
// JSON Serializer
// 
// Input:            ->Output:
//  undefined        -> 'undefined'
//  null             -> 'null'
//  true/false       -> "true"/"false"
//  any other value  -> Converted to JSON string
// 
module.exports = {};
module.exports.to_json = function(values) {
	// Check the constructor type
	if (undefined === values) {
		return 'undefined';
	}

	// Serialize the JSON
	// Automatically handles nulls, booleans, strings, array, object, etc
	values = JSON.stringify(values);

	// Return the JSON 
	return values;
};


// 
// JSON Parser
// 
// Input:            ->Output:
//  undefined        -> undefined
//  null             -> null
//  true/false       -> true/false
//  any other value  -> Parsed JSON
// 
module.exports.parse_json = function(values) {
	// console.log('parse_json=' + values);
	
	// Handle invalid values
	if (undefined === values || null === values || 'boolean' === (typeof values)) {
		// Return the input
		return values;
	}

	// If it is not a string, then return it
	if (values.constructor != String) {
		return values;
	}

	// Check for "undefined"
	if ('undefined' === values) {
		return undefined;
	}

	// Parse the JSON
	values = JSON.parse(values);

	// Return the parsed JSON object
	return values;
};
