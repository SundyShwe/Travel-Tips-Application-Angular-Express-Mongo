import { Router } from "express";
import transportRouter from './transport.js'
import { addCity, deleteCityByID, getAllCities, getCityByID, getActivitesByCity } from "../controllers/cityController.js";
const router = Router();

router.get('/', getAllCities);
router.get('/:city_id/', getCityByID);
router.get('/:city_id/activities/', getActivitesByCity);
router.post('/', addCity);
router.delete('/:city_id/', deleteCityByID);

router.use('/:city_id/transports', transportRouter);

export default router;

