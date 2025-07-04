import session from "@reuc/application/auth/index.js";
import { Warning } from "@reuc/application/errors/Warning.js";
import { ValidationError } from "@reuc/application/errors/ValidationError.js";

const REFRESH_TOKEN_EXPIRES = process.env.REFRESH_TOKEN_EXPIRES_INT;

export async function registerHandler(req, res, isWeb = true) {
  try {
    const response = await session.register({
      body: req.body,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    });

    if (isWeb) {
      return res
        .cookie("refreshToken", response.tokens.refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "Strict",
          maxAge: REFRESH_TOKEN_EXPIRES,
        })
        .status(201)
        .json({
          success: true,
          data: {
            user: response.user,
            accessToken: response.tokens.accessToken,
          },
        });
    } else {
      return res.status(201).json({
        success: true,
        data: {
          user: response.user,
          tokens: response.tokens,
        },
      });
    }
  } catch (err) {
    const code = err instanceof ValidationError ? 422 : 400;

    return res.status(code).json({ success: false, err: err.message });
  }
}

export async function loginHandler(req, res, isWeb = true) {
  try {
    const response = await session.login({
      data: req.body,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    });

    if (isWeb) {
      return res
        .cookie("refreshToken", response.tokens.refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "Strict",
          maxAge: REFRESH_TOKEN_EXPIRES,
        })
        .status(201)
        .json({
          success: true,
          data: {
            user: response.user,
            accessToken: response.tokens.accessToken,
          },
        });
    } else {
      return res.status(201).json({
        success: true,
        data: {
          user: response.user,
          tokens: response.tokens,
        },
      });
    }
  } catch (err) {
    const code =
      err instanceof Warning ? 500 : err instanceof ValidationError ? 422 : 400;

    const success = err instanceof Warning;

    return res.status(code).json({
      success,
      err: err.message,
    });
  }
}

export function refreshHandler(req, res, isWeb = true) {
  try {
    const refreshToken = isWeb
      ? req.cookies.refreshToken
      : req.body.refreshToken;

    if (!refreshToken)
      return res.status(400).json({ error: "Falta el token de autenticación" });

    const accessToken = session.refresh({
      token: refreshToken,
      ip: req.ip,
      ua: req.headers["user-agent"],
    });

    res.json({ accessToken });
  } catch {
    res.status(401).json({ error: "Token inválido." });
  }
}
