import express from "express";

import {
  createLead,
  getLeads,
  updateLead,
  deleteLead,
} from "../controllers/leadController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createLead);

router.get("/", getLeads);

router.put("/:id", updateLead);

router.delete("/:id", deleteLead);

export default router;