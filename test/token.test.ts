import {
	CorsignPayload,
	CorsignPayloadPerson,
	corsignPayloadPersonSchema,
	corsignPayloadSchema,
} from '../src/token';

describe('person payload schema validation', () => {
	test('person payload phoneNumber and email empty should fail validation', () => {
		const personPayload: CorsignPayloadPerson = {
			firstname: 'Max',
			lastname: 'Mustermann',
			sex: 'M',
			birthday: 0,
		};

		const validationResult = corsignPayloadPersonSchema.validate(
			personPayload
		);
		expect(() => validationResult.error !== undefined);
	});

	test('person payload with phoneNumber should pass validation ', () => {
		const personPayload: CorsignPayloadPerson = {
			firstname: 'Max',
			lastname: 'Mustermann',
			phoneNumber: '+49 123 456 78',
			sex: 'M',
			birthday: 0,
		};

		const validationResult = corsignPayloadPersonSchema.validate(
			personPayload
		);
		expect(() => validationResult.error === undefined);
	});

	test('person payload with phoneNumber and email should pass validation ', () => {
		const personPayload: CorsignPayloadPerson = {
			firstname: 'Max',
			lastname: 'Mustermann',
			phoneNumber: '+49 123 456 78',
			email: 'max@mustermann.de',
			sex: 'M',
			birthday: 0,
		};

		const validationResult = corsignPayloadPersonSchema.validate(
			personPayload
		);
		expect(() => validationResult.error === undefined);
	});
});

describe('payload schema validation', () => {
	test('payload with positive test requires address, but no address given', () => {
		const payload: CorsignPayload = {
			person: {
				firstname: 'Max',
				lastname: 'Mustermann',
				phoneNumber: '+49 123 456 78',
				sex: 'M',
				birthday: 0,
			},
			information: {
				isNegative: false,
			},
		};

		const validationResult = corsignPayloadSchema.validate(payload);
		expect(validationResult.error).toBeDefined();
	});

	test('payload with positive test requires address, address given', () => {
		const payload: CorsignPayload = {
			person: {
				firstname: 'Max',
				lastname: 'Mustermann',
				phoneNumber: '+49 123 456 78',
				sex: 'M',
				birthday: 0,
				street1: 'Musterstraße',
				zip: '123456',
				city: 'Musterstadt',
				country: 'DE',
			},
			information: {
				isNegative: false,
			},
		};

		const validationResult = corsignPayloadSchema.validate(payload);
		expect(validationResult.error).toBeUndefined();
	});

	test('payload with negative test does not require address', () => {
		const payload: CorsignPayload = {
			person: {
				firstname: 'Max',
				lastname: 'Mustermann',
				phoneNumber: '+49 123 456 78',
				sex: 'M',
				birthday: 0,
			},
			information: {
				isNegative: true,
			},
		};

		const validationResult = corsignPayloadSchema.validate(payload);
		expect(validationResult.error).toBeUndefined();
	});
});
