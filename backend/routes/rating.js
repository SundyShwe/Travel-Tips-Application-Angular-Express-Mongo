import { Router } from "express";
const router = Router();

import { getRatings, addRatings } from "../controllers/ratingController.js";


router.get('/:activity_id', getRatings);
router.post('/:activity_id', addRatings);

export default router;
