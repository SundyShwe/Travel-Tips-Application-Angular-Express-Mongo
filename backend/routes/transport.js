import { Router } from "express";
import { getAllTransportsInCity, getTransportById, addTransportinCity, addReviewByTransportId, deleteTransportById } from "../controllers/transportController.js";
const router = Router({ mergeParams: true });

router.post('/', addTransportinCity)
router.get('/', getAllTransportsInCity);

router.post('/:transport_id', addReviewByTransportId);
router.get('/:transport_id', getTransportById);
router.delete('/:transport_id/:review_id', deleteTransportById);

export default router;
