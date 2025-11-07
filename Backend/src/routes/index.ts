import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRotues } from "../modules/auth/auth.route";
import { ItemRoutes } from "../modules/item/item.route";
import { RentRoutes } from "../modules/rental/rental.route";
import { AdminRoutes } from "../modules/admin/admin.route";

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
    },{
        path: '/admin',
        route: AdminRoutes
    }
]


moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});