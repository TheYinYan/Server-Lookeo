import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.js";

export function errorHandler(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ message: error.message });
  }
  console.error("Error interno del servidor: ", error);
  res.status(500).json({ message: "Error interno del servidor" });
}
