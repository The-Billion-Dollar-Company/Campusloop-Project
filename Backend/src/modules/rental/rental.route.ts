import { Router } from "express";
import { Role } from "../user/user.interface";
import { checkAuth } from "../../middlewares/checkAuth";
import { RentalController } from "./rental.controller";

const router = Router();

router.post('/', checkAuth(Role.BUYER, Role.SELLER), RentalController.createRental)
router.get('/', checkAuth(Role.BUYER, Role.SELLER), RentalController.allRentals)
router.get('/:id', checkAuth(Role.BUYER, Role.SELLER), RentalController.rentalInfoById);
router.patch('/:id/status', checkAuth(Role.BUYER, Role.SELLER), RentalController.updateRentalStatus);


router.delete('/:id', checkAuth(Role.ADMIN, Role.SUPER_ADMIN), RentalController.deleteRental);

export const RentRoutes = router;