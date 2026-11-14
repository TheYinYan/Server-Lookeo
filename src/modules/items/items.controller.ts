import type { Request, Response, NextFunction } from "express";
import { getUserId } from "../../utils/getUserId.js";
import { getIdFromParams } from "../../utils/getIdFromParams.js";
import {
  listItems,
  findItemById,
  updateItem,
  deleteItem,
} from "./items.service.js";

export async function listItemsCtrl(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = getUserId(req);
    const items = await listItems(userId);
    res.json(items);
  } catch (error: unknown) {
    next(error);
  }
}

export async function getItemCtrl(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = getUserId(req);
    const itemId = getIdFromParams(req);
    const item = await findItemById(itemId, userId);
    res.json(item);
  } catch (error: unknown) {
    next(error);
  }
}

export async function updateItemCtrl(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = getUserId(req);
    const itemId = getIdFromParams(req);
    const item = await updateItem(itemId, userId, req.body);
    res.json(item);
  } catch (error: unknown) {
    next(error);
  }
}

export async function deleteItemCtrl(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = getUserId(req);
    const itemId = getIdFromParams(req);
    await deleteItem(itemId, userId);
    res.status(204).send();
  } catch (error: unknown) {
    next(error);
  }
}
