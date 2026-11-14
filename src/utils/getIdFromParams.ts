import { Request } from "express";
import { AppError } from "./AppError.js";

export function getIdFromParams(req: Request) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    throw new AppError("ID inválido", 400);
  }
  return id;
}
