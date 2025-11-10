import { Router } from "express";
import { Role } from "../user/user.interface";
import { ItemControllers } from "./item.controller";
import { checkAuth } from "../../middlewares/checkAuth";

const router = Router();

router.post('/', checkAuth(Role.BUYER, Role.SELLER), ItemControllers.createItem)

router.get('/', ItemControllers.allItem)

router.get('/:id', ItemControllers.itemById)

router.patch('/:id', checkAuth(Role.BUYER, Role.SELLER), ItemControllers.updateItem)
router.delete('/:id', checkAuth(Role.BUYER, Role.SELLER), ItemControllers.deleteItem)


export const ItemRoutes = router;