import { Order } from "./order.interface";
import OrderModel from "./order.model";
import ProductModel from "../products/product.model";


// Add a new order
const addOrder = async (payload: Order) => {
    const { car, email, quantity } = payload;
  
    if (!car) {
        throw new Error('Car ID is required');
    }
  
    const product = await ProductModel.findById(car);
    if (!product) {
        throw new Error('Car not found');
    }
  
    if (product.quantity < quantity) {
        throw new Error('Insufficient stock');
    }
  
    // Check if an order exists for this car and email
    const existingOrder = await OrderModel.findOne({ car, email });
    let message;
    let order;

    if (existingOrder) {
        // Update existing order without modifying totalPrice
        existingOrder.quantity += quantity;
        order = await existingOrder.save(); // Return the updated order
        message = 'Existing order updated successfully.';
    } else {
        // Create a new order and save it
        const newOrder = new OrderModel(payload); // Keep initial totalPrice as provided
        order = await newOrder.save(); // Return the created order
        message = 'New order created successfully.';
    }
  
    // Deduct the quantity from product stock
    product.quantity -= quantity;
    if (product.quantity === 0) {
        product.inStock = false;
    }
    await product.save();
  
    // Return the complete order data
    return { success: true, message, order }; // Returning the order data
};

  


// Calculate revenue from all orders
const calculateRevenue = async () => {
    const orders = await OrderModel.aggregate([
        {
            $lookup: {
                from: "productmodels",            // Join with the products collection
                localField: "car",           // Field in the orders collection
                foreignField: "_id",         // Field in the products collection
                as: "carDetails"             // Alias for joined data
            }
        },
        {
            $unwind: "$carDetails"          // Deconstruct the array to objects
        },
        {
            $project: {
                revenue: { $multiply: ["$quantity", "$carDetails.price"] } // Multiply quantity by car price
            }
        },
        {
            $group: {
                _id: null,                  // Group all documents
                totalRevenue: { $sum: "$revenue" } // Sum up the revenue
            }
        }
    ]);

    // Return totalRevenue if calculated, otherwise return 0
    return orders.length > 0 ? orders[0].totalRevenue : 0;
};






export const OrderService = {
    addOrder,
    calculateRevenue,
};
