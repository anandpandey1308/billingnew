import { Router } from "express";
import {
  createSale,
  deleteSale,
  getSales,
} from "../controllers/salesController.js";

const router = Router();

router.post("/createNew", createSale);
router.get("/", getSales);
router.delete("/:id", deleteSale);

export default router;
