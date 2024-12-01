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
exports.OrderService = void 0;
// order.service.ts
const product_model_1 = __importDefault(require("../products/product.model"));
const order_model_1 = __importDefault(require("./order.model"));
const addOrder = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId, quantity } = orderData;
        // Fetch the product from the database
        const product = yield product_model_1.default.findById(productId);
        if (!product) {
            throw new Error("Product not found");
        }
        // Update the inventory
        if (product.inventory.quantity < quantity) {
            throw new Error("Insufficient quantity available in inventory");
        }
        product.inventory.quantity -= quantity;
        product.inventory.inStock = product.inventory.quantity > 0;
        // Save the updated product
        yield product.save();
        // Create a new order
        const existingOrder = yield order_model_1.default.findOne({ email: orderData.email });
        // If an order with the provided email and product exists, update the quantity
        if (existingOrder) {
            existingOrder.quantity += orderData.quantity;
            yield existingOrder.save();
            // Return the updated order
            return existingOrder;
        }
        // If no order with the provided email and product exists, create a new order
        const order = yield order_model_1.default.create(orderData);
        // Return the created order
        return order;
    }
    catch (error) {
        console.error("Error adding order:", error);
        throw error;
    }
});
const getAllOrders = (emailId) => __awaiter(void 0, void 0, void 0, function* () {
    let query = {};
    if (emailId) {
        query = {
            $or: [
                { email: { $regex: emailId, $options: 'i' } },
            ]
        };
    }
    const result = yield order_model_1.default.find(query);
    return result;
});
exports.OrderService = {
    addOrder,
    getAllOrders,
};
