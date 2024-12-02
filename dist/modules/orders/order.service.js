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
const order_model_1 = __importDefault(require("./order.model"));
const product_model_1 = __importDefault(require("../products/product.model"));
// Add a new order
const addOrder = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { car, email, quantity } = payload;
    if (!car) {
        throw new Error('Car ID is required');
    }
    const product = yield product_model_1.default.findById(car);
    if (!product) {
        throw new Error('Car not found');
    }
    if (product.quantity < quantity) {
        throw new Error('Insufficient stock');
    }
    // Check if an order exists for this car and email
    const existingOrder = yield order_model_1.default.findOne({ car, email });
    let message;
    let order;
    if (existingOrder) {
        // Update existing order without modifying totalPrice
        existingOrder.quantity += quantity;
        order = yield existingOrder.save(); // Return the updated order
        message = 'Existing order updated successfully.';
    }
    else {
        // Create a new order and save it
        const newOrder = new order_model_1.default(payload); // Keep initial totalPrice as provided
        order = yield newOrder.save(); // Return the created order
        message = 'New order created successfully.';
    }
    // Deduct the quantity from product stock
    product.quantity -= quantity;
    if (product.quantity === 0) {
        product.inStock = false;
    }
    yield product.save();
    // Return the complete order data
    return { success: true, message, order }; // Returning the order data
});
// Calculate revenue from all orders
const calculateRevenue = () => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_model_1.default.aggregate([
        {
            $lookup: {
                from: "productmodels", // Join with the products collection
                localField: "car", // Field in the orders collection
                foreignField: "_id", // Field in the products collection
                as: "carDetails" // Alias for joined data
            }
        },
        {
            $unwind: "$carDetails" // Deconstruct the array to objects
        },
        {
            $project: {
                revenue: { $multiply: ["$quantity", "$carDetails.price"] } // Multiply quantity by car price
            }
        },
        {
            $group: {
                _id: null, // Group all documents
                totalRevenue: { $sum: "$revenue" } // Sum up the revenue
            }
        }
    ]);
    // Return totalRevenue if calculated, otherwise return 0
    return orders.length > 0 ? orders[0].totalRevenue : 0;
});
exports.OrderService = {
    addOrder,
    calculateRevenue,
};
