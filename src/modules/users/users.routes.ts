import { Router } from "express";
import * as usersController from "./users.controller.js";

const router = Router();

router.get("/", usersController.listUsersCtrl);
router.get("/:id", usersController.getUserCtrl);
router.put("/:id", usersController.updateUserCtrl);
router.delete("/:id", usersController.deleteUserCtrl);

export default router;