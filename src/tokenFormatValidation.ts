export const hasFormatOfCorsignToken = (token: any): boolean => {
	if (token === undefined || typeof token !== 'object') {
		return false;
	}

	const { sub, exp, iat, nbf, iss, aud, pld } = token;
	const hasCorsignPayloadFormat = hasFormatOfCorsignPayload(pld);

	if (
		isDefinedButNoString(sub) ||
		isDefinedButNoNumber(exp) ||
		isDefinedButNoNumber(iat) ||
		isDefinedButNoNumber(nbf) ||
		isNoString(iss) ||
		isNoString(aud) ||
		!hasCorsignPayloadFormat
	) {
		return false;
	}
	return true;
};

export const hasFormatOfCorsignPayload = (payload: any): boolean => {
	if (payload === undefined || typeof payload !== 'object') {
		return false;
	}

	const { person, information } = payload;
	const isCorsignPayloadPersonFormat = hasFormatOfCorsignPayloadPerson(
		person
	);
	const isCorsingPayloadInformationFormat = hasFormatOfCorsignPayloadInformation(
		information
	);

	if (
		!isCorsignPayloadPersonFormat ||
		(information !== undefined && !isCorsingPayloadInformationFormat)
	) {
		return false;
	}

	return true;
};

export const hasFormatOfCorsignPayloadPerson = (person: any): boolean => {
	if (person === undefined || typeof person !== 'object') {
		return false;
	}

	const {
		idCardNumber,
		firstname,
		lastname,
		sex,
		birthday,
		email,
		phoneNumber,
		street1,
		street2,
		city,
		zip,
		country,
	} = person;

	if (
		isDefinedButNoString(idCardNumber) ||
		isNoString(firstname) ||
		isNoString(lastname) ||
		isNoSex(sex) ||
		isNoString(birthday) ||
		isDefinedButNoString(email) ||
		isDefinedButNoString(phoneNumber) ||
		isDefinedButNoString(street1) ||
		isDefinedButNoString(street2) ||
		isDefinedButNoString(city) ||
		isDefinedButNoString(zip) ||
		isDefinedButNoString(country)
	) {
		return false;
	}

	return true;
};

export const hasFormatOfCorsignPayloadInformation = (
	information: any
): boolean => {
	if (information === undefined || typeof information !== 'object') {
		return false;
	}

	const {
		isNegative,
		testType,
		isVaccinated,
		vaccine,
		appData1,
		appData2,
	} = information;

	if (
		isDefinedButNoBoolean(isNegative) ||
		isDefinedButNoString(testType) ||
		isDefinedButNoBoolean(isVaccinated) ||
		isDefinedButNoString(vaccine) ||
		isDefinedButNoObject(appData1) ||
		isDefinedButNoObject(appData2)
	) {
		return false;
	}

	return true;
};

const isDefinedButNoString = (value: any): boolean => {
	return value !== undefined && typeof value !== 'string';
};

const isDefinedButNoNumber = (value: any): boolean => {
	return value !== undefined && typeof value !== 'number';
};

const isNoSex = (value: any): boolean => {
	return !(value === 'F' || value === 'M' || value === 'D');
};

const isDefinedButNoBoolean = (value: any): boolean => {
	return value !== undefined && typeof value !== 'boolean';
};

const isDefinedButNoObject = (value: any): boolean => {
	return value !== undefined && typeof value !== 'object';
};

const isNoString = (value: any): boolean => {
	return typeof value !== 'string';
};
