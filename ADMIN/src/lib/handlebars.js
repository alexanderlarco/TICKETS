const timeago = require('timeago.js');
const timeagoInstance = timeago;

const timeReturn = (savedTimestamp) => {
	return timeagoInstance.format(savedTimestamp);
};

const state = (val, options) => {
	var fnTrue = options.fn,
		fnFalse = options.inverse;

	return val == 1 ? fnTrue(this) : fnFalse(this);
};

const selectedOption = (val1 = 1, val2) => {
	console.log('aaaaaaaaaaaaaaaaa', val1, val2);

	if (val1.toString() == val2) {
		return 'selected';
	}
};

module.exports = { timeReturn, state, selectedOption };
