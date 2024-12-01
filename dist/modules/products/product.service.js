"use strict";
// product.service.ts
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
exports.ProductService = void 0;
const mongoose_1 = require("mongoose");
const product_model_1 = __importDefault(require("./product.model"));
const addProduct = (payLoad) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.create(payLoad);
    return result;
});
const getAllProducts = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    let query = {};
    if (searchTerm) {
        query = {
            $or: [
                { name: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive search by name
                { description: { $regex: searchTerm, $options: 'i' } } // Case-insensitive search by description
            ]
        };
    }
    const result = yield product_model_1.default.find(query);
    return result;
});
const getProductById = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(productId)) {
        throw new Error('Invalid product ID');
    }
    return yield product_model_1.default.findById(productId);
});
const updateProduct = (productId, productData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(productId)) {
        throw new Error('Invalid product ID');
    }
    return yield product_model_1.default.findByIdAndUpdate(productId, productData, { new: true });
});
const deleteProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(productId)) {
        throw new Error('Invalid product ID');
    }
    return yield product_model_1.default.findByIdAndDelete(productId);
});
exports.ProductService = {
    addProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
