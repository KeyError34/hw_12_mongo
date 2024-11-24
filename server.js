import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './db/index.js'
import productsRoutes from './routes/products.js'

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

// Подключение маршрутов
app.use('/products', productsRoutes);

// Подключение к базе данных и запуск сервера
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is working at http://127.0.0.1:${port}`);
    });
  })
  .catch((error) => {
    console.log(
      'Failed to start the server due to MongoDB connection issue',
      error
    );
  });