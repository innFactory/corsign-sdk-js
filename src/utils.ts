import { CorsignPayloadPerson, CorsignToken } from './token';
import jwt from 'jsonwebtoken';
import QRCode from 'qrcode';

const corsignValidationUrl = 'https://corsign.de/v1/validate';

/**
 *
 * @param person Person payload
 * @param issuer Issuer
 * @param privateKey Optional private key
 * @returns Corsign-JWT
 */
export const generateUnsignedCorsignToken = (
	person: CorsignPayloadPerson,
	issuer: string,
	privateKey: string = 'self'
): string => {
	const token: CorsignToken = {
		iss: issuer,
		aud: 'self',
		pld: { person },
	};
	return jwt.sign(token, privateKey);
};

/**
 * Decodes Encoded Corsign-JWT **without validation**
 *
 * @param token Encoded Corsign-JWT
 * @returns Decoded {@link CorsignToken}
 */
export const decodeCorsignToken = (token: string): CorsignToken =>
	jwt.decode(token) as CorsignToken;

/**
 *
 * @param token Any {@link CorsignToken}
 * @param validationUrl The url the qr code should point to defaults to https://corsign.de/v1/validate/{token}
 * @returns Data URI containing a representation of the QR Code image.
 */
export const generateCorsignQrCode = async (
	token: string,
	validationUrl: string = corsignValidationUrl
): Promise<string> => {
	const code = QRCode.create(`${validationUrl}/${token}`, {});
	return QRCode.toDataURL(code.segments);
};
