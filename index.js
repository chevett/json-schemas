var tv4 = require('tv4'),
	formats = require('tv4-formats'),
	_ = require('lodash');

tv4.addFormat(formats);

function printValidationError(err){
	console.log(err.dataPath + ': ' + err.message);
}

function loadSchema(filePath){
	var schema = require(filePath);
	tv4.addSchema(schema.id, schema);
}

loadSchema('./schemas/focal/schema.json');

var contactInstance = require('./data/contact.json');
var contactSchema = require('./schemas/contact/schema.json');

var validResult = tv4.validateMultiple(contactInstance, contactSchema);

if (_.isEmpty(validResult.errors)){
	console.log('great - the valid data passed.');
} else {
	console.log('ERROR: Validation failed.');
	validResult.errors.forEach(printValidationError);
}
console.dir(validResult);

