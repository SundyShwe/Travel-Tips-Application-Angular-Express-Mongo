import { Router } from "express";
import { addBadge, getAllBadges } from "../controllers/badgeController.js";
const router = Router({ mergeParams: true });

router.post('/', addBadge)
router.get('/', getAllBadges);

export default router;
