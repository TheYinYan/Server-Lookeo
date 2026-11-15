import type { Request, Response, NextFunction } from "express";
import { getUserId } from "../../utils/getUserId.js";
import { getIdFromParams } from "../../utils/getIdFromParams.js";
import { createItemSchema, updateItemSchema } from "./items.schema.js";
import {
  createItem,
  listItems,
  findItemById,
  updateItem,
  deleteItem,
} from "./items.service.js";

export async function createItemCtrl(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = getUserId(req);
    const result = createItemSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({ error: result.error.issues });
    }

    const item = await createItem(userId, result.data);
    res.status(201).json(item);
  } catch (error: unknown) {
    next(error);
  }
}

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

    const result = updateItemSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.issues });
    }

    const item = await updateItem(itemId, userId, result.data);
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
