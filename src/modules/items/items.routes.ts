import { Router } from "express";
import * as itemsController from "./items.controller.js";

const router = Router();

router.get("/", itemsController.listItemsCtrl);
router.get("/:id", itemsController.getItemCtrl);
router.put("/:id", itemsController.updateItemCtrl);
router.delete("/:id", itemsController.deleteItemCtrl);

export default router;
