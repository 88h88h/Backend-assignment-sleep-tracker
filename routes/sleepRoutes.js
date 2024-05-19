import { Router } from "express";
import { add, retrieve, deleteRecord } from "../controllers/dataController.js";

const router = Router();

router.post("/sleep", add);
router.get("/sleep/:userId", retrieve);
router.delete("/sleep/:recordId", deleteRecord);

export default router;
