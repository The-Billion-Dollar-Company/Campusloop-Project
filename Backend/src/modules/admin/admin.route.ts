import { Router } from "express";
import { AdminController } from "./admin.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

const router = Router();

router.post(
  "/:id/change-status",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  AdminController.updateUserStatus
);

router.get(
  "/all-items",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  AdminController.allItems
);

router.get(
  "/all-users",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  AdminController.allItems
);

export const AdminRoutes = router;
