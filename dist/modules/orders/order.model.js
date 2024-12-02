"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true },
    car: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Product', required: true }, // Reference to Product model
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
}, { timestamps: true });
// Ensure no unique index is mistakenly applied to the `car` field
orderSchema.index({ email: 1, car: 1 }, { unique: true }); // Ensure uniqueness by email + car combination only
const OrderModel = mongoose_1.default.model('OrderCar', orderSchema);
exports.default = OrderModel;
