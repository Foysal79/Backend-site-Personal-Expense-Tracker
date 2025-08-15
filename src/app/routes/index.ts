import { Router } from "express";

const router = Router();
const moduleRouter = [
  {
    path: '/expenseTracker',
    route: 
  }
];
moduleRouter.forEach((route) => router.use(route.path, route.route));
export default router;