var constants = require('./memcached_ext_constants.js');

// CSV Serializer
module.exports = {};
module.exports.to_csv = function(values) {
	// Check the constructor type
	if (undefined === values || null === values || false === values) {
		return constants.EMPTY_VALUE;
	}
	
	if ('' === values) {
		values = [];
	}
	if (values.constructor != Array) {
		values = [values]
	}
	return values.join(constants.CSV_DELIMITER);
};

// CSV Parser
module.exports.parse_csv = function(values) {
	// Check the constructor type
	if (undefined === values || null === values || false === values || values === constants.EMPTY_VALUE) {
		return null;
	}

	if (values.constructor != String) {
		values = values.toString();
	}
	
	if ('' === values) {
		return [];
	}
	
	return values.split(constants.CSV_DELIMITER);
};
