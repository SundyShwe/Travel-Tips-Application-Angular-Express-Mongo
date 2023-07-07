import { Router } from "express";
import { deleteUserByID, getAllUsers, addBadegesToUser, getUserByID, changePassword } from "../controllers/userController.js";
const router = Router();

router.get('/', getAllUsers);
router.get('/:user_id/', getUserByID);
router.post('/:user_id/', changePassword);
router.post('/:user_id/badges', addBadegesToUser);

router.delete('/:user_id/', deleteUserByID);
export default router;

