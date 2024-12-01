import { Request, Response } from "express";
import { OrderService } from "./order.service";
import Joi from 'joi';

const createOrderSchema = Joi.object({
    email: Joi.string().email().required(),
    car: Joi.string().required(),  // Car ID from the Product collection
    quantity: Joi.number().required(),
    totalPrice: Joi.number().required(),
});

const addOrder = async (req: Request, res: Response) => {
    try {
        const { error } = createOrderSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
        }

        const orderData = req.body;
        const result = await OrderService.addOrder(orderData);
        console.log(result);
        res.json({
            success: true,
            message: "Order created successfully",
            data: result,
           
        });
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({
                success: false,
                message: 'Failed to create order',
                error: err.message,
            });
        }
    }
};

const getRevenue = async (req: Request, res: Response) => {
    try {
        const totalRevenue = await OrderService.calculateRevenue();
        res.json({
            success: true,
            message: "Revenue calculated successfully",
            data: {
                totalRevenue
            },
        });
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({
                success: false,
                message: 'Failed to calculate revenue',
                error: err.message,
            });
        }
    }
};

export const OrderControllers = {
    addOrder,
    getRevenue,
};
