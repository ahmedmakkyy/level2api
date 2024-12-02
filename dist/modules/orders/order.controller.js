"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderControllers = void 0;
const order_service_1 = require("./order.service");
const joi_1 = __importDefault(require("joi"));
const createOrderSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    car: joi_1.default.string().required(), // Car ID from the Product collection
    quantity: joi_1.default.number().required(),
    totalPrice: joi_1.default.number().required(),
});
const addOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = createOrderSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
        }
        const orderData = req.body;
        const result = yield order_service_1.OrderService.addOrder(orderData);
        console.log(result);
        res.json({
            success: true,
            message: "Order created successfully",
            data: result,
        });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({
                success: false,
                message: 'Failed to create order',
                error: err.message,
            });
        }
    }
});
const getRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalRevenue = yield order_service_1.OrderService.calculateRevenue();
        res.json({
            success: true,
            message: "Revenue calculated successfully",
            data: {
                totalRevenue
            },
        });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({
                success: false,
                message: 'Failed to calculate revenue',
                error: err.message,
            });
        }
    }
});
exports.OrderControllers = {
    addOrder,
    getRevenue,
};
