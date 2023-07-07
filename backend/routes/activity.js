import { Router } from "express";
import itemRouter from './item.js'
import { getAllActivities, getActivityById, addActivity, updateActivityById, deleteActivityById } from "../controllers/activityController.js";

const router = Router();

// POST request for creating one activity list.
router.post('/', addActivity);
// GET request for list of all activities.
router.get('/', getAllActivities);

// GET request for one activity list.
router.get('/:activity_id', getActivityById);
// POST request to update Author.
router.post('/activity_id', updateActivityById);
// GET request to delete one activity list.
router.delete('/:activity_id', deleteActivityById);

router.use('/:activity_id/items', itemRouter); //add, update, delete the items list of the activity

export default router;

