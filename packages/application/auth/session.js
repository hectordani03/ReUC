import { ValidationError } from "../errors/ValidationError.js";
import {
  verifyRefreshToken,
  generateAccessToken,
  verifyAccessToken,
} from "@reuc/domain/libs/auth/jwt.js";

export function sessionAuth(token, ip, ua) {
  try {
    const decoded = verifyAccessToken(token);

    if (decoded.ip !== ip || decoded.ua !== ua) {
      throw new ValidationError("Token mismatch");
    }

    return decoded;
  } catch (error) {
    throw error;
  }
}

export function sessionRefresh({ token, ip, ua }) {
  try {
    const decoded = verifyRefreshToken(token);

    const newAccessToken = generateAccessToken({
      uuid_user: decoded.uuid_user,
      role: decoded.role,
      ip,
      ua,
    });

    return newAccessToken;
  } catch (error) {
    throw error;
  }
}
