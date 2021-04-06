import Joi from 'joi';
import { Alpha2Code, getAlpha2Codes } from 'i18n-iso-countries';

export type CorsignToken = {
	/**
	 * UUID (Unique User IDentifier) which could be used in third-party applications such as SORMAS, valid until a new test is performed.
	 */
	sub?: string;

	/**
	 * The token expires after a pre-defined duration (e.g 24 hours) passed since the Sars-CoV-2 was done
	 */
	exp?: string;

	/**
	 * Date and time of the Sars-Cov-2 test
	 */
	iat?: string;

	/**
	 * Valid not before Sars-Cov-2 test date and time
	 */
	nbf?: string;

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
	 * UTC Date in milliseconds since epoch
	 */
	birthday?: number;

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
	idCardNumber: Joi.string().optional(),
	firstname: Joi.string().required(),
	lastname: Joi.string().required(),
	sex: Joi.string()
		.valid('F', 'M', 'D')
		.optional(),
	birthday: Joi.number()
		.integer()
		.optional(),
	email: Joi.string()
		.email({ tlds: { allow: false } })
		.optional(),
	phoneNumber: Joi.string().optional(),
	street1: Joi.string().optional(),
	street2: Joi.string().optional(),
	city: Joi.string().optional(),
	zip: Joi.string().optional(),
	country: Joi.string()
		.length(2)
		.valid(...Object.keys(getAlpha2Codes()))
		.optional(),
}).or('email', 'phoneNumber');

/**
 * Covid19 relevant data and optional third-party application data
 */
export type CorsignPayloadInformation = {
	/**
	 * Wether or not the administered SarS-CoV-2 test was negative or not
	 */
	isNegative?: boolean;

	/**
	 * Type of test used e.g. pcr|antigen|...
	 */
	testType?: 'pcr' | 'antigen' | string;

	/**
	 * Wether or not the [CorsignPayloadPerson] was vaccinated or not
	 */
	isVaccinated?: boolean;

	/**
	 * Shortname of the administered vaccine like BNT162b2|mRNA-1273|...
	 */
	vaccine?: 'BNT162b2' | 'mRNA-1273' | string;

	/**
	 * Additional third-party app data
	 */
	appData?: Record<string, string>;
};
