import { prisma } from "../../config/db.js";
import { Prisma } from "@prisma/client";
import { AppError } from "../../utils/AppError.js";
import type { CreateItemInput, UpdateItemInput } from "./items.schema.js";

export async function createItem(userId: number, data: CreateItemInput) {
  try {
    return await prisma.item.create({
      data: { userId, ...data },
      select: {
        id: true,
        type: true,
        color: true,
        season: true,
        style: true,
        imgUrl: true,
        notes: true,
      },
    });
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2003") {
        throw new AppError("No se ha podido asociar la prenda al usuario", 409);
      }
      throw error;
    }
    throw error;
  }
}

export async function findItemById(id: number, userId: number) {
  const item = await prisma.item.findUnique({
    where: { id, userId },
    select: {
      id: true,
      type: true,
      color: true,
      season: true,
      style: true,
      imgUrl: true,
      notes: true,
    },
  });

  if (!item) {
    throw new AppError("Prenda no encontrada", 404);
  }

  return item;
}

export async function listItems(userId: number) {
  return await prisma.item.findMany({
    where: { userId },
    select: {
      id: true,
      type: true,
      color: true,
      season: true,
      style: true,
      imgUrl: true,
      notes: true,
    },
    orderBy: { id: "asc" },
  });
}

export async function updateItem(
  id: number,
  userId: number,
  data: UpdateItemInput,
) {
  try {
    return await prisma.item.update({
      where: { id, userId },
      data,
      select: {
        id: true,
        type: true,
        color: true,
        season: true,
        style: true,
        imgUrl: true,
        notes: true,
        createdAt: true,
      },
    });
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        throw new AppError("Prenda no encontrada", 404);
      }
      throw error;
    }
    throw error;
  }
}

export async function deleteItem(id: number, userId: number) {
  try {
    return await prisma.item.delete({ where: { id, userId } });
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        throw new AppError("Prenda no encontrada", 404);
      }
      throw error;
    }
    throw error;
  }
}
