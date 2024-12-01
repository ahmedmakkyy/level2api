// product.interface.ts



export type Product = {
    brand: string;        // The name of the product
    model: string;        // The name of the product
    year: number;       // The price of the product
    description: string; // A brief description of the product
    price: number;       // The price of the product
    category: string;    // The category to which the product belongs
    quantity: number; // The available quantity of the product in stock
    inStock: boolean; // Indicates whether the product is currently in stock
    createdAt: Date;      // The timestamp when the product was created
    updatedAt: Date;      // The timestamp when the product was last updated
};


