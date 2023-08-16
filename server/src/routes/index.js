import { Router } from "express";
import salesRoute from "./salesRoute.js";

const router = Router();

router.use("/sale", salesRoute);

export default router;
