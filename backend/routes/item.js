import { Router } from "express";
const router = Router({ mergeParams: true });

import { getAllItemInList, getItemById, addItemToList, completeItembyId, deleteItemById } from "../controllers/itemController.js";


router.get('/', getAllItemInList);
router.get('/:item_id', getItemById);

router.post('/', addItemToList);
router.patch('/:item_id/complete', completeItembyId);
router.delete('/:item_id', deleteItemById);

export default router;
