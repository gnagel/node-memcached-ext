var constants = require('./memcached_ext_constants.js');

// CSV Serializer
module.exports = {};
module.exports.to_csv = function(values) {
	// Set the default value
	values = values || constants.EMPTY_VALUE;

	// Check the constructor type
	if (values && values.constructor != Array) {
		values = [values]
	}

	return values.join(constants.CSV_DELIMITER);
};

// CSV Parser
module.exports.parse_csv = function(values) {
	// Check the constructor type
	if (undefined === values || null === values || false === values) {
		values = constants.EMPTY_VALUE;
	} else if (values.constructor != String) {
		values = values.toString();
	}

	if (values === constants.EMPTY_VALUE) {
		return null;
	}
	if (values.length === 0) {
		return [];
	}
	return values.split(constants.CSV_DELIMITER);
};
