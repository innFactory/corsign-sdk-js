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
	 * German ID number e.g.: LFC123ABC
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
	 * Phone number matching the following regex
	 *
	 * `\+?[0-9]+([0-9]|\/|\(|\)|\-| ){10,}`
	 */
	phoneNumber?: string;

	/**
	 * Street
	 */
	street?: string;

	/**
	 * City
	 */
	city?: string;

	/**
	 * 6 digit zip code
	 */
	zip?: number;

	/**
	 * 2 letter Alpha-2 country code as defined in [ISO 3166](https://www.iso.org/obp/ui/#search)
	 */
	country?: string;
};

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
	testType?: 'prc' | 'antigen' | string;

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
