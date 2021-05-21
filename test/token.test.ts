import {
	CorsignPayloadInformation,
	corsignPayloadInformationSchema,
	CorsignPayloadPerson,
	corsignPayloadPersonSchema,
} from '../src/token';

describe('person payload schema validation', () => {
	test('person no payload should fail validation', () => {
		const personPayload = {};

		const validationResult = corsignPayloadPersonSchema.validate(
			personPayload
		);
		expect(validationResult.error).toBeDefined();
	});

	test('person payload phoneNumber and email empty should fail validation', () => {
		const personPayload: CorsignPayloadPerson = {
			firstname: 'Max',
			lastname: 'Mustermann',
			birthday: '2020-04-21',
			street1: 'Teststraße',
			zip: '12345',
			city: 'Teststadt',
			country: 'DE',
		};

		const validationResult = corsignPayloadPersonSchema.validate(
			personPayload
		);
		expect(validationResult.error).toBeDefined();
	});

	test('person payload without email should fail validation ', () => {
		const personPayload: CorsignPayloadPerson = {
			firstname: 'Max',
			lastname: 'Mustermann',
			phoneNumber: '+49 123 456 78',
			birthday: '2020-04-21',
			street1: 'Teststraße',
			zip: '12345',
			city: 'Teststadt',
			country: 'DE',
		};

		const validationResult = corsignPayloadPersonSchema.validate(
			personPayload
		);
		expect(validationResult.error).toBeDefined();
	});

	test('person payload without phoneNumber should fail validation ', () => {
		const personPayload: CorsignPayloadPerson = {
			firstname: 'Max',
			lastname: 'Mustermann',
			email: 'max@mustermann.de',
			birthday: '2020-04-21',
			street1: 'Teststraße',
			zip: '12345',
			city: 'Teststadt',
			country: 'DE',
		};

		const validationResult = corsignPayloadPersonSchema.validate(
			personPayload
		);
		expect(validationResult.error).toBeDefined();
	});

	test('person payload with phoneNumber and email should pass validation ', () => {
		const personPayload: CorsignPayloadPerson = {
			firstname: 'Max',
			lastname: 'Mustermann',
			phoneNumber: '+49 123 456 78',
			email: 'max@mustermann.de',
			birthday: '2020-04-21',
			street1: 'Teststraße',
			zip: '12345',
			city: 'Teststadt',
			country: 'DE',
		};

		const validationResult = corsignPayloadPersonSchema.validate(
			personPayload
		);
		expect(validationResult.error).toBeUndefined();
	});

	test('person payload with street1 should pass validation ', () => {
		const personPayload: CorsignPayloadPerson = {
			firstname: 'Max',
			lastname: 'Mustermann',
			phoneNumber: '+49 123 456 78',
			email: 'max@mustermann.de',
			birthday: '2020-04-21',
			street1: 'Teststraße',
			zip: '12345',
			city: 'Teststadt',
			country: 'DE',
		};

		const validationResult = corsignPayloadPersonSchema.validate(
			personPayload
		);
		expect(validationResult.error).toBeUndefined();
	});

	test('person payload with street2 should pass validation ', () => {
		const personPayload: CorsignPayloadPerson = {
			firstname: 'Max',
			lastname: 'Mustermann',
			phoneNumber: '+49 123 456 78',
			email: 'max@mustermann.de',
			birthday: '2020-04-21',
			street2: 'Teststraße',
			zip: '12345',
			city: 'Teststadt',
			country: 'DE',
		};

		const validationResult = corsignPayloadPersonSchema.validate(
			personPayload
		);
		expect(validationResult.error).toBeUndefined();
	});
});

describe('corsign payload information schema validation', () => {
	test('no payload should fail validation', () => {
		const informationPayload = {};

		const validationResult = corsignPayloadInformationSchema.validate(
			informationPayload
		);
		expect(validationResult.error).toBeDefined();
	});

	test('minimal payload should pass validation', () => {
		const informationPayload: CorsignPayloadInformation = {
			carriedOutBy: 'Tester',
			creatorType: 'on-site',
			isNegative: true,
			invalid: false,
			testType: 'pcr-test',
			testName: 'Testname',
			testManufacturer: 'Test',
		};

		const validationResult = corsignPayloadInformationSchema.validate(
			informationPayload
		);
		expect(validationResult.error).toBeUndefined();
	});
});
