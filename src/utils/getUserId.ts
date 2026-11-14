import { Request } from "express";
import { AppError } from "./AppError.js";

export function getUserId(req: Request) {
  if (!req.userId) {
    throw new AppError("Usuario no autenticado", 401);
  }
  return req.userId;
}
