import { CorsignPayload, CorsignToken } from './token';

const corsignApiUrl = 'https://corsign.de/v1';

export interface GenerateSignedCorsignTokenResponse {
	/**
	 * Encoded Corsign-JWT
	 */
	token: string;

	/**
	 * QRCode Data URI
	 */
	qrCode: string;
}

/**
 *
 * @param payload The payload for the Corsign-Token
 * @param signerToken
 * @param tokenId
 * @param apiUrl
 * @returns Encoded Token and QRCode {@link GenerateSignedCorsignTokenResponse}
 */
export const generateSignedCorsignToken = async (
	payload: CorsignPayload,
	signerToken: string,
	tokenId: string,
	apiUrl: string = corsignApiUrl
): Promise<GenerateSignedCorsignTokenResponse> => {
	const response = await fetch(`${apiUrl}/sign`, {
		method: 'POST',
		headers: {
			'X-SIGNER-TOKEN': signerToken,
			'X-TOKEN-ID': tokenId,
			'content-type': 'application/json;charset=UTF-8',
		},
		body: JSON.stringify(payload),
	});

	const { data, errors } = await response.json();

	if (response.ok) {
		return data as GenerateSignedCorsignTokenResponse;
	} else {
		return Promise.reject(errors);
	}
};

/**
 *
 * @param token Encoded Corsign-JWT
 * @param apiUrl
 * @returns Decoded ({@link CorsignToken}) if successfull
 */
export const validateCorsignToken = async (
	token: string,
	apiUrl: string = corsignApiUrl
): Promise<CorsignToken> => {
	const response = await fetch(`${apiUrl}/validate/${token}`);

	const { data, errors } = await response.json();

	if (response.ok) {
		return data as CorsignToken;
	} else {
		return Promise.reject(errors);
	}
};
