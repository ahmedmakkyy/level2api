import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    email: { type: String, required: true },
    car: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Reference to Product model
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
}, { timestamps: true });

// Ensure no unique index is mistakenly applied to the `car` field
orderSchema.index({ email: 1, car: 1 }, { unique: true }); // Ensure uniqueness by email + car combination only

const OrderModel = mongoose.model('OrderCar', orderSchema);

export default OrderModel;
