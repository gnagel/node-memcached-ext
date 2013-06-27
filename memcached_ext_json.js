var constants = require('./memcached_ext_constants.js');

// CSV Serializer
module.exports = {};
module.exports.to_json = function(values) {
	// Check the constructor type
	if (undefined === values || null === values || false === values || constants.EMPTY_VALUE === values) {
		return constants.EMPTY_VALUE;
	}

	return JSON.stringify(values);
};

// CSV Parser
module.exports.parse_json = function(values) {
	// Check the constructor type
	if (undefined === values || null === values || false === values) {
		values = constants.EMPTY_VALUE;
	} else if (values.constructor != String) {
		values = values.toString();
	}
	
	if (constants.EMPTY_VALUE === values  || '' === values) {
		return null;
	}
	return JSON.parse(values);
};
