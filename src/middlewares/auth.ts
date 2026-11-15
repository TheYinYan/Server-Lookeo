import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { AppError } from "../utils/AppError.js";

export function authenticate(req: Request, _res: Response, next: NextFunction) {
  const authorization = req.headers.authorization;

  if (!authorization?.startsWith("Bearer ")) {
    return next(new AppError("Token no proporcionado", 401));
  }

  const token = authorization.substring(7);

  try {
    const payload = jwt.verify(token, env.JWT_SECRET);

    if (
      typeof payload !== "object" ||
      payload === null ||
      typeof payload.sub !== "number"
    ) {
      return next(new AppError("Token inválido", 401));
    }

    req.userId = payload.sub;
    next();
  } catch {
    next(new AppError("Token inválido o expirado", 401));
  }
}
