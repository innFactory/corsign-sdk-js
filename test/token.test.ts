import { corsignPayloadPersonSchema, CorsignPayloadPerson } from '../src/token';

test('person payload phoneNumber and email empty should fail validation', () => {
	const personPayload: CorsignPayloadPerson = {
		firstname: 'Max',
		lastname: 'Mustermann',
	};

	const validationResult = corsignPayloadPersonSchema.validate(personPayload);
	expect(() => validationResult.error !== undefined);
});

test('person payload with phoneNumber should pass validation ', () => {
	const personPayload: CorsignPayloadPerson = {
		firstname: 'Max',
		lastname: 'Mustermann',
		phoneNumber: '+49 123 456 78',
	};

	const validationResult = corsignPayloadPersonSchema.validate(personPayload);
	expect(() => validationResult.error === undefined);
});

test('person payload with phoneNumber and email should pass validation ', () => {
	const personPayload: CorsignPayloadPerson = {
		firstname: 'Max',
		lastname: 'Mustermann',
		phoneNumber: '+49 123 456 78',
		email: 'max@mustermann.de',
	};

	const validationResult = corsignPayloadPersonSchema.validate(personPayload);
	expect(() => validationResult.error === undefined);
});
