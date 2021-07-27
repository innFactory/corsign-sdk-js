import { Alpha2Code } from 'i18n-iso-countries';
import Joi from 'joi';
/**
 * Personally identifiable information
 *
 * Either phoneNumber or email are required
 */
export type CorsignPayloadPerson = {
	/**
	 * One of:
	 * - ID-Card number
	 * - Driver's license number
	 * - Passport number
	 */
	idCardNumber?: string;

	/**
	 * Firstname
	 *
	 * **REQUIRED**
	 */
	firstname: string;

	/**
	 * Lastname
	 *
	 * **REQUIRED**
	 */
	lastname: string;

	/**
	 * Female, Male or Diverse
	 */
	sex?: 'F' | 'M' | 'D';

	/**
	 * Timestamp YYYY-MM-DD
	 */
	birthday: string;

	/**
	 * Email address
	 */
	email?: string;

	/**
	 * Phone number
	 */
	phoneNumber?: string;

	/**
	 * Adress line 1
	 */
	street1?: string;

	/**
	 * Adress line 2
	 */
	street2?: string;

	/**
	 * City
	 */
	city?: string;

	/**
	 * Zip code
	 */
	zip?: string;

	/**
	 * 2 letter Alpha-2 country code as defined in [ISO 3166](https://www.iso.org/obp/ui/#search)
	 */
	country?: Alpha2Code;
};

export const corsignPayloadPersonSchema = Joi.object<CorsignPayloadPerson>({
	idCardNumber: Joi.string()
		.allow('')
		.optional(),
	firstname: Joi.string().required(),
	lastname: Joi.string().required(),
	sex: Joi.string()
		.valid('F', 'M', 'D')
		.optional(),
	birthday: Joi.string().required(),
	email: Joi.string()
		.email({ tlds: { allow: false } })
		.required(),
	phoneNumber: Joi.string().required(),
	street1: Joi.string().optional(),
	street2: Joi.string()
		.allow('')
		.optional(),
	city: Joi.string().required(),
	zip: Joi.string().required(),
	country: Joi.string().required(),
}).or('street1', 'street2');

/**
 * Covid19 relevant data and optional third-party application data
 */
export type CorsignPayloadInformation = {
	/**
	 * Firstname and lastname of the person who carried out the test
	 */
	carriedOutBy?: string;

	/**
	 * Test responsibility
	 */
	creatorType?: 'on-site' | 'company' | 'service-provider' | string;

	/**
	 * Wether or not the administered SarS-CoV-2 test was negative or not
	 */
	isNegative?: boolean;

	/**
	 * Wheter or not the administered SarS-CoV-2 test was invalid or not
	 */
	invalid?: boolean;

	/**
	 * Type of test used e.g. pcr-test|pcr-rapid-test|antigen-rapid-test|ag-rapid-test-w-supervision|...
	 */
	testType?:
		| 'pcr-test'
		| 'pcr-rapid-test'
		| 'antigen-rapid-test'
		| 'ag-rapid-test-w-supervision'
		| string;

	/**
	 * Name of the test
	 */
	testName?: string;

	/**
	 * Manufacturer of the test
	 */
	testManufacturer?: string;

	/**
	 * Mostly a number which depends on the test. All Test-Ids are defined here (Device ID): https://ec.europa.eu/health/sites/default/files/preparedness_response/docs/covid-19_rat_common-list_en.pdf
	 */
	testId?: string;

	/**
	 * Wether or not the [CorsignPayloadPerson] was vaccinated or not
	 */
	isVaccinated?: boolean;

	/**
	 * Shortname of the administered vaccine like BNT162b2|mRNA-1273|...
	 */
	vaccine?: 'BNT162b2' | 'mRNA-1273' | string;

	/**
	 * Additional third-party app data 1
	 */
	appData1?: Record<string, string>;

	/**
	 * Additional third-party app data 2
	 */
	appData2?: Record<string, string>;

	/**
	 * Wether or not the [CorsignPayloadPerson] is immune or not
	 */
	isImmune?: boolean;
};

export const corsignPayloadInformationSchema = Joi.object<
	CorsignPayloadInformation
>({
	carriedOutBy: Joi.string().required(),
	creatorType: Joi.string().required(),
	isNegative: Joi.boolean().required(),
	invalid: Joi.boolean().required(),
	testType: Joi.string().required(),
	testName: Joi.string().required(),
	testManufacturer: Joi.string().required(),
	isVaccinated: Joi.boolean().optional(),
	vaccine: Joi.string()
		.allow('')
		.optional(),
	appData1: Joi.any().optional(),
	appData2: Joi.any().optional(),
});

export type CorsignPayload = {
	/**
	 * {@link CorsignPayloadPerson}
	 */
	person: CorsignPayloadPerson;

	/**
	 * {@link CorsignPayloadInformation}
	 */
	information?: CorsignPayloadInformation;
};

export const corsignPayloadSchema = Joi.object<CorsignPayload>({
	person: corsignPayloadPersonSchema,
	information: corsignPayloadInformationSchema,
});

export type CorsignToken = {
	/**
	 * UUID (Unique User IDentifier) which could be used in third-party applications such as SORMAS, valid until a new test is performed.
	 */
	sub?: string;

	/**
	 * The token expires after a pre-defined duration (e.g 24 hours) passed since the Sars-CoV-2 was done
	 *
	 * UTC timestamp
	 */
	exp?: number;

	/**
	 * Date and time of the Sars-Cov-2 test **or** for unsigned tokens date of creation
	 *
	 * UTC timestamp
	 */
	iat?: number;

	/**
	 * Valid not before Sars-Cov-2 test date and time
	 *
	 * UTC timestamp
	 */
	nbf?: number;

	/**
	 * Issuer of this Token
	 */
	iss: string;

	/**
	 * Place for the signer, can be used to store additional information for a third-party application
	 */
	aud: string;

	/**
	 * Token payload
	 */
	pld: CorsignPayload;
};

export const corsignTokenSchema = Joi.object<CorsignToken>({
	sub: Joi.string().optional(),
	exp: Joi.number().optional(),
	iat: Joi.number().optional(),
	nbf: Joi.number().optional(),
	iss: Joi.string().required(),
	aud: Joi.string().required(),
	pld: corsignPayloadSchema,
});
