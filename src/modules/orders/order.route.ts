// order.route.ts
import express from 'express';
import { OrderControllers } from './order.controller';



const router = express.Router();

router.post('/', OrderControllers.addOrder);
router.get('/revenue', OrderControllers.getRevenue);


export const OrderRoute = router;