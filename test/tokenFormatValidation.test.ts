import {
	CorsignPayload,
	CorsignPayloadInformation,
	CorsignPayloadPerson,
	CorsignToken,
} from '../src/token';
import {
	hasFormatOfCorsignPayload,
	hasFormatOfCorsignPayloadInformation,
	hasFormatOfCorsignPayloadPerson,
	hasFormatOfCorsignToken,
} from '../src/tokenFormatValidation';

describe('hasFormatOfCorsignToken', () => {
	test('undefined token object', () => {
		const value = undefined;

		const isOfFormat = hasFormatOfCorsignToken(value);
		expect(isOfFormat).toBe(false);
	});
	test('minimal defined token object', () => {
		const value: CorsignToken = {
			sub: undefined,
			exp: undefined,
			iat: undefined,
			nbf: undefined,
			iss: '',
			aud: '',
			pld: {
				person: {
					firstname: '',
					lastname: '',
				},
			},
		};
		const value2: CorsignToken = {
			iss: '',
			aud: '',
			pld: {
				person: {
					firstname: '',
					lastname: '',
				},
			},
		};

		const isOfFormat = hasFormatOfCorsignToken(value);
		const isOfFormat2 = hasFormatOfCorsignToken(value2);
		expect(isOfFormat).toBe(true);
		expect(isOfFormat2).toBe(true);
	});
	test('defined token object', () => {
		const value: CorsignToken = {
			sub: '',
			exp: 0,
			iat: 0,
			nbf: 0,
			iss: '',
			aud: '',
			pld: {
				person: {
					firstname: '',
					lastname: '',
				},
			},
		};

		const isOfFormat = hasFormatOfCorsignToken(value);
		expect(isOfFormat).toBe(true);
	});
	test('undefined required values in token object', () => {
		const value = {
			iss: undefined,
			aud: undefined,
			pld: undefined,
		};
		const value2 = {};

		const isOfFormat = hasFormatOfCorsignToken(value);
		const isOfFormat2 = hasFormatOfCorsignToken(value2);
		expect(isOfFormat).toBe(false);
		expect(isOfFormat2).toBe(false);
	});
});

describe('hasFormatOfCorsignPayload', () => {
	test('undefined payload object', () => {
		const value = undefined;

		const isOfFormat = hasFormatOfCorsignPayload(value);
		expect(isOfFormat).toBe(false);
	});
	test('minimal defined payload object', () => {
		const value: CorsignPayload = {
			person: {
				firstname: '',
				lastname: '',
			},
			information: undefined,
		};
		const value2: CorsignPayload = {
			person: {
				firstname: '',
				lastname: '',
			},
		};

		const isOfFormat = hasFormatOfCorsignPayload(value);
		const isOfFormat2 = hasFormatOfCorsignPayload(value2);
		expect(isOfFormat).toBe(true);
		expect(isOfFormat2).toBe(true);
	});
	test('defined payload object', () => {
		const value: CorsignPayload = {
			person: {
				firstname: '',
				lastname: '',
			},
			information: {},
		};

		const isOfFormat = hasFormatOfCorsignPayload(value);
		expect(isOfFormat).toBe(true);
	});
	test('undefined person in payload object', () => {
		const value = {
			person: undefined,
		};
		const value2 = {};

		const isOfFormat = hasFormatOfCorsignPayload(value);
		const isOfFormat2 = hasFormatOfCorsignPayload(value2);
		expect(isOfFormat).toBe(false);
		expect(isOfFormat2).toBe(false);
	});
});

describe('hasFormatOfCorsignPayloadPerson', () => {
	test('undefined person object', () => {
		const value = undefined;

		const isOfFormat = hasFormatOfCorsignPayloadPerson(value);
		expect(isOfFormat).toBe(false);
	});
	test('minimal defined values of person object', () => {
		const value: CorsignPayloadPerson = {
			idCardNumber: undefined,
			firstname: '',
			lastname: '',
			sex: undefined,
			birthday: undefined,
			email: undefined,
			phoneNumber: undefined,
			street1: undefined,
			street2: undefined,
			city: undefined,
			zip: undefined,
			country: undefined,
		};
		const value2: CorsignPayloadPerson = {
			firstname: '',
			lastname: '',
		};

		const isOfFormat = hasFormatOfCorsignPayloadPerson(value);
		const isOfFormat2 = hasFormatOfCorsignPayloadPerson(value2);
		expect(isOfFormat).toBe(true);
		expect(isOfFormat2).toBe(true);
	});
	test('defined values of person object', () => {
		const value: CorsignPayloadPerson = {
			idCardNumber: '',
			firstname: '',
			lastname: '',
			sex: 'F',
			birthday: 0,
			email: '',
			phoneNumber: '',
			street1: '',
			street2: '',
			city: '',
			zip: '',
			country: 'DE',
		};

		const isOfFormat = hasFormatOfCorsignPayloadPerson(value);
		expect(isOfFormat).toBe(true);
	});
	test('undefined required values of person object', () => {
		const value = {
			firstname: undefined,
			lastname: undefined,
		};
		const value2 = {};

		const isOfFormat = hasFormatOfCorsignPayloadPerson(value);
		const isOfFormat2 = hasFormatOfCorsignPayloadPerson(value2);
		expect(isOfFormat).toBe(false);
		expect(isOfFormat2).toBe(false);
	});
});

describe('hasFormatOfCorsignPayloadInformation', () => {
	test('undefined information object', () => {
		const value = undefined;

		const isOfFormat = hasFormatOfCorsignPayloadInformation(value);
		expect(isOfFormat).toBe(false);
	});
	test('minimal defined values of information object', () => {
		const value: CorsignPayloadInformation = {
			isNegative: undefined,
			testType: undefined,
			isVaccinated: undefined,
			vaccine: undefined,
			appData1: undefined,
			appData2: undefined,
		};
		const value2: CorsignPayloadInformation = {};

		const isOfFormat = hasFormatOfCorsignPayloadInformation(value);
		const isOfFormat2 = hasFormatOfCorsignPayloadInformation(value2);
		expect(isOfFormat).toBe(true);
		expect(isOfFormat2).toBe(true);
	});
	test('defined values of information object', () => {
		const value: CorsignPayloadInformation = {
			isNegative: true,
			testType: '',
			isVaccinated: true,
			vaccine: '',
			appData1: {},
			appData2: {},
		};

		const isOfFormat = hasFormatOfCorsignPayloadInformation(value);
		expect(isOfFormat).toBe(true);
	});
});
