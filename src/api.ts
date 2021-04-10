import { CorsignPayload, CorsignToken } from './token';
import axios, { AxiosError } from 'axios';

const corsignApiUrl = 'https://api.corsign.de/v1';

export interface GenerateSignedCorsignTokenResponse {
	/**
	 * Encoded Corsign-JWT
	 */
	value: string;

	/**
	 * Info message
	 */
	info?: string;

	/**
	 * QRCode Data URI
	 */
	qr: string;

	/**
	 * Wether or not the confirmation email was sent successfully.
	 */
	emailSendSuccessful?: boolean;

	/**
	 * Might contain error message for why the email wasn't sent
	 */
	emailSendError?: string;

	/**
	 * Wether or not manual transmission of positive test cases is required.
	 */
	requireManualSendOfPositive: boolean;
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
): Promise<GenerateSignedCorsignTokenResponse> =>
	axios
		.post(`${apiUrl}/sign`, {
			headers: {
				'X-SIGNER-TOKEN': signerToken,
				'X-TOKEN-ID': tokenId,
				'content-type': 'application/json;charset=UTF-8',
			},
			body: JSON.stringify(payload),
		})
		.then(response => {
			if (response.status >= 200 && response.status <= 299) {
				return response.data as GenerateSignedCorsignTokenResponse;
			} else {
				return Promise.reject(response.statusText);
			}
		})
		.catch((err: AxiosError) => Promise.reject(err.message));

/**
 *
 * @param token Encoded Corsign-JWT
 * @param apiUrl
 * @returns Decoded ({@link CorsignToken}) if successfull
 */
export const validateCorsignToken = async (
	token: string,
	apiUrl: string = corsignApiUrl
): Promise<CorsignToken> =>
	axios
		.get(`${apiUrl}/validate/${token}`)
		.then(response => {
			if (response.status >= 200 && response.status <= 299) {
				return response.data as CorsignToken;
			} else {
				return Promise.reject(response.statusText);
			}
		})
		.catch((err: AxiosError) => Promise.reject(err.message));
