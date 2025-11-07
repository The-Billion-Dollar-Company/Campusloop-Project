import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRotues } from "../modules/auth/auth.route";
import { ItemRoutes } from "../modules/item/item.route";
import { RentRoutes } from "../modules/rental/rental.route";

export const router = Router()

const moduleRoutes = [
    {
        path:'/user',
        route: UserRoutes,
    },{
        path: '/auth',
        route: AuthRotues
    },{
        path: '/item',
        route: ItemRoutes
    },{
        path: '/rent',
        route: RentRoutes
    }
]


moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});