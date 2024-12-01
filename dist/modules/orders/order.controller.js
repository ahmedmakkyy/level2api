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
exports.OrderController = void 0;
const order_service_1 = require("./order.service");
const joi_1 = __importDefault(require("joi"));
// Define Joi schema for the order data
const orderSchema = joi_1.default.object({
    productId: joi_1.default.string().required(),
    price: joi_1.default.number().integer().min(10).required(),
    quantity: joi_1.default.number().integer().min(1).required(),
    email: joi_1.default.string().email().required(),
});
const addOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate request body against the schema
        const { error } = orderSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
        }
        const orderData = req.body;
        const result = yield order_service_1.OrderService.addOrder(orderData);
        res.json({
            success: true,
            message: "Order created successfully!",
            data: result,
        });
    }
    catch (error) { // eslint-disable-line @typescript-eslint/no-explicit-any
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.query;
        const result = yield order_service_1.OrderService.getAllOrders(email);
        res.status(200).json({
            success: true,
            message: `${email ? "Order fetched successfully for " + "'" + email + "'" : "All order fetched successfully!"} `,
            data: result,
        });
    }
    catch (err) { // eslint-disable-line @typescript-eslint/no-explicit-any
        res.status(500).json({
            success: false,
            message: 'Products are not fetched!',
            error: err,
        });
    }
});
exports.OrderController = {
    addOrder,
    getAllOrders,
};
