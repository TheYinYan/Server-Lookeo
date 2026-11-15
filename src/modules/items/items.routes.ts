import { Router } from "express";
import * as itemsController from "./items.controller.js";
import { authenticate } from "../../middlewares/auth.js";

const router = Router();
router.use(authenticate);

router.post("/", itemsController.createItemCtrl);
router.get("/", itemsController.listItemsCtrl);
router.get("/:id", itemsController.getItemCtrl);
router.put("/:id", itemsController.updateItemCtrl);
router.delete("/:id", itemsController.deleteItemCtrl);

export default router;
