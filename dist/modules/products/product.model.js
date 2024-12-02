"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// product.model.ts
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt
});
const ProductModel = (0, mongoose_1.model)("ProductModel", ProductSchema);
exports.default = ProductModel;
