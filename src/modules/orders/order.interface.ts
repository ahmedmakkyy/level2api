export type Order = {
  email: string;          // Customer email
  car: string;            // Product (Car) ID
  quantity: number;       // Quantity of the car ordered
  totalPrice: number;     // Total price of the order
  createdAt: Date;        // Timestamp when the order was created
  updatedAt: Date;        // Timestamp when the order was last updated
};
