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
exports.ProductControllers = void 0;
const product_service_1 = require("./product.service");
const joi_1 = __importDefault(require("joi"));
const createProductSchema = joi_1.default.object({
    brand: joi_1.default.string().required(),
    model: joi_1.default.string().required(),
    year: joi_1.default.number().required(),
    description: joi_1.default.string().required(),
    price: joi_1.default.number().required(),
    category: joi_1.default.string().required(),
    quantity: joi_1.default.number().required(),
    inStock: joi_1.default.boolean().required(),
});
const updateProductSchema = joi_1.default.object({
    price: joi_1.default.number(),
    quantity: joi_1.default.number()
});
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = createProductSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
        }
        const productData = req.body;
        const result = yield product_service_1.ProductService.addProduct(productData);
        res.json({
            success: true,
            message: "Product created successfully!",
            data: result,
        });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({
                success: false,
                message: 'Failed to create product',
                error: err.message,
            });
        }
    }
});
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm } = req.query;
        const result = yield product_service_1.ProductService.getAllProducts(searchTerm);
        res.status(200).json({
            success: true,
            message: `Products ${searchTerm ? "matching search term '" + searchTerm + "'" : ""} fetched successfully!`,
            data: result,
        });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({
                success: false,
                message: 'Products are not fetched!',
                error: err.message,
            });
        }
    }
});
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const product = yield product_service_1.ProductService.getProductById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }
        res.json({
            success: true,
            message: "Car retrieved successfully",
            data: product,
        });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({
                success: false,
                message: 'Failed to retrieve Car',
                error: err.message,
            });
        }
    }
});
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const { error } = updateProductSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
        }
        const productData = req.body;
        const updatedProduct = yield product_service_1.ProductService.updateProduct(productId, productData);
        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }
        res.json({
            success: true,
            message: 'Product updated successfully!',
            data: updatedProduct,
        });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({
                success: false,
                message: 'Failed to update product',
                error: err.message,
            });
        }
    }
});
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const deletedProduct = yield product_service_1.ProductService.deleteProduct(productId);
        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }
        res.json({
            success: true,
            message: 'Product deleted successfully!',
            data: null,
        });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({
                success: false,
                message: 'Failed to delete product',
                error: err.message,
            });
        }
    }
});
exports.ProductControllers = {
    addProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
