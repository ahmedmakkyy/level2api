import express, { Request, Response } from 'express'
import { ProductRoutes } from './modules/products/product.route'
import { OrderRoute } from './modules/orders/order.route';
const app = express()

app.use(express.json());

app.use('/api/cars', ProductRoutes);
app.use('/api/orders', OrderRoute)

// Root URL welcome message
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: "Welcome to API Service"
  });
});

// Route error
app.get('/api', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "API Root"
  });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});


export default app;