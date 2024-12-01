// product.service.ts

import { Types } from "mongoose";
import { Product } from "./product.interface";
import ProductModel from "./product.model";

const addProduct = async (payLoad : Product) => {
    const result = await ProductModel.create(payLoad);
    return result;
};

const getAllProducts = async (searchTerm?: string) => {
    let query = {};
    if (searchTerm) {
        query = {
            $or: [
                { name: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive search by name
                { description: { $regex: searchTerm, $options: 'i' } } // Case-insensitive search by description
            ]
        };
    }
    const result = await ProductModel.find(query);
    return result;
};

const getProductById = async (productId: string) => {
    if (!Types.ObjectId.isValid(productId)) {
        throw new Error('Invalid product ID');
    }
    return await ProductModel.findById(productId);
}

const updateProduct = async (productId: string, productData: Product) => {
    if (!Types.ObjectId.isValid(productId)) {
        throw new Error('Invalid product ID');
    }
    return await ProductModel.findByIdAndUpdate(productId, productData, { new: true });
}


const deleteProduct = async (productId: string) => {
    if (!Types.ObjectId.isValid(productId)) {
        throw new Error('Invalid product ID');
    }
    return await ProductModel.findByIdAndDelete(productId);
};





export const ProductService = {
    addProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
   

}