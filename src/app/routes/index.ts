import { Router } from "express";
import { authRoutes } from "../modules/user/auth.route";

const router = Router();
const moduleRouter = [
  {
    path: '/users',
    route: authRoutes,
  },
];
moduleRouter.forEach((route) => router.use(route.path, route.route));
export default router;