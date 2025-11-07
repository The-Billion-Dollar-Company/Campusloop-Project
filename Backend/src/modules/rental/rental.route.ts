import { Router } from "express";
import { Role } from "../user/user.interface";
import { checkAuth } from "../../middlewares/checkAuth";
import { RentalController } from "./rental.controller";

const router = Router();

router.post('/', checkAuth(Role.BUYER, Role.SELLER), RentalController.createRental)


export const RentRoutes = router;