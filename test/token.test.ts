import {
	CorsignPayload,
	CorsignPayloadPerson,
	corsignPayloadPersonPositiveTestSchema,
	corsignPayloadPersonSchema,
	corsignPayloadSchema,
} from '../src/token';

describe('person payload schema validation', () => {
	test('person payload phoneNumber and email empty should fail validation', () => {
		const personPayload: CorsignPayloadPerson = {
			firstname: 'Max',
			lastname: 'Mustermann',
			sex: 'M',
			birthday: '2020-04-21',
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
			birthday: '2020-04-21',
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
			birthday: '2020-04-21',
		};

		const validationResult = corsignPayloadPersonSchema.validate(
			personPayload
		);
		expect(() => validationResult.error === undefined);
	});
});

describe('person payload for positive test schema validation', () => {
	test('phoneNumber and email empty should fail validation', () => {
		const personPayload: CorsignPayloadPerson = {
			firstname: 'Max',
			lastname: 'Mustermann',
			sex: 'M',
			birthday: '2020-04-21',
			street1: 'Musterstraße',
			zip: '123456',
			city: 'Musterstadt',
			country: 'DE',
		};

		const validationResult = corsignPayloadPersonPositiveTestSchema.validate(
			personPayload
		);
		expect(() => validationResult.error !== undefined);
	});

	test('with phoneNumber should pass validation ', () => {
		const personPayload: CorsignPayloadPerson = {
			firstname: 'Max',
			lastname: 'Mustermann',
			phoneNumber: '+49 123 456 78',
			sex: 'M',
			birthday: '2020-04-21',
			street1: 'Musterstraße',
			zip: '123456',
			city: 'Musterstadt',
			country: 'DE',
		};

		const validationResult = corsignPayloadPersonPositiveTestSchema.validate(
			personPayload
		);
		expect(() => validationResult.error === undefined);
	});

	test('with phoneNumber and email should pass validation ', () => {
		const personPayload: CorsignPayloadPerson = {
			firstname: 'Max',
			lastname: 'Mustermann',
			phoneNumber: '+49 123 456 78',
			email: 'max@mustermann.de',
			sex: 'M',
			birthday: '2020-04-21',
			street1: 'Musterstraße',
			zip: '123456',
			city: 'Musterstadt',
			country: 'DE',
		};

		const validationResult = corsignPayloadPersonPositiveTestSchema.validate(
			personPayload
		);
		expect(() => validationResult.error === undefined);
	});

	test('street1 and street2 empty string should fail validation', () => {
		const personPayload: CorsignPayloadPerson = {
			firstname: 'Max',
			lastname: 'Mustermann',
			email: 'max@mustermann.de',
			sex: 'M',
			birthday: '2020-04-21',
			street1: '',
			street2: '',
			zip: '123456',
			city: 'Musterstadt',
			country: 'DE',
		};

		const validationResult = corsignPayloadPersonPositiveTestSchema.validate(
			personPayload
		);
		expect(validationResult.error).toBeDefined();
	});

	test('street1 and street2 filled in should pass validation', () => {
		const personPayload: CorsignPayloadPerson = {
			firstname: 'Max',
			lastname: 'Mustermann',
			email: 'max@mustermann.de',
			sex: 'M',
			birthday: '2020-04-21',
			street1: 'Musterstraße 1',
			street2: 'Musterstraße 2',
			zip: '123456',
			city: 'Musterstadt',
			country: 'DE',
		};

		const validationResult = corsignPayloadPersonPositiveTestSchema.validate(
			personPayload
		);
		expect(validationResult.error).toBeUndefined();
	});

	test('street1 filled in should pass validation', () => {
		const personPayload: CorsignPayloadPerson = {
			firstname: 'Max',
			lastname: 'Mustermann',
			email: 'max@mustermann.de',
			sex: 'M',
			birthday: '2020-04-21',
			street1: 'Musterstraße 1',
			street2: '',
			zip: '123456',
			city: 'Musterstadt',
			country: 'DE',
		};
		const personPayload2: CorsignPayloadPerson = {
			firstname: 'Max',
			lastname: 'Mustermann',
			email: 'max@mustermann.de',
			sex: 'M',
			birthday: '2020-04-21',
			street1: 'Musterstraße 1',
			street2: undefined,
			zip: '123456',
			city: 'Musterstadt',
			country: 'DE',
		};

		const validationResult = corsignPayloadPersonPositiveTestSchema.validate(
			personPayload
		);
		const validationResult2 = corsignPayloadPersonPositiveTestSchema.validate(
			personPayload2
		);
		expect(validationResult.error).toBeUndefined();
		expect(validationResult2.error).toBeUndefined();
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
				birthday: '2020-04-21',
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
				birthday: '2020-04-21',
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
				birthday: '2020-04-21',
			},
			information: {
				isNegative: true,
			},
		};

		const validationResult = corsignPayloadSchema.validate(payload);
		expect(validationResult.error).toBeUndefined();
	});
});
