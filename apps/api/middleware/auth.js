import session from "@reuc/application/auth/index.js";
import { ValidationError } from "@reuc/application/errors/ValidationError.js";

export function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json({ success: false, err: "Falta el token de autorización" });

  try {
    const decoded = session.auth(token, req.ip, req.headers["user-agent"]);

    req.user = decoded;

    next();
  } catch (err) {
    if (err instanceof ValidationError)
      return res.status(403).json({ success: false, err: err.message });

    return res.status(401).json({ success: false, err: "Token inválido" });
  }
}

export function requireMobileClient(req, res, next) {
  const clientType = req.headers["x-client-type"];
  if (clientType !== "mobile") {
    return res
      .status(403)
      .json({ error: "Acceso denegado: se requiere cliente móvil" });
  }
  next();
}

export const requireOutsider = (req, res, next) => {
  const [role, uuid_outsider] = req.user?.role?.split(":") || [];
  if (role !== "outsider") {
    return res.status(403).json({
      success: false,
      err: "Sin acceso a estas funcionalidades",
    });
  }

  req.outsider = { role, uuid_outsider };

  next();
};
