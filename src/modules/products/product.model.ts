// product.model.ts
import { Schema, model } from "mongoose";
import { Product } from "./product.interface";

const ProductSchema = new Schema<Product>(
    {
        brand: { type: String, required: true },
        model: { type: String, required: true },
        year: { type: Number, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        category: { type: String, required: true },
        quantity: { type: Number, required: true },
        inStock: { type: Boolean, required: true },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt
    }
);

const ProductModel = model<Product>("ProductModel", ProductSchema);

export default ProductModel;