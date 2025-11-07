import { Router } from "express";
import { Role } from "../user/user.interface";
import { ItemControllers } from "./item.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { fileUploader } from "../../helper/fileUpload";

const router = Router();

router.post('/', checkAuth(Role.BUYER, Role.SELLER), fileUploader.upload.single("image"), ItemControllers.createItem)

router.get('/', ItemControllers.allItem)

router.get('/:id', ItemControllers.itemById)

router.patch('/:id', checkAuth(Role.BUYER, Role.SELLER), ItemControllers.updateItem)
router.delete('/:id', checkAuth(Role.BUYER, Role.SELLER), ItemControllers.deleteItem)

// ADMIN-->
router.patch('/:id/status', checkAuth(Role.ADMIN, Role.SUPER_ADMIN), ItemControllers.toggleStatus)


export const ItemRoutes = router;