import { MongoClient } from 'mongodb';
import 'dotenv/config';

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
let dbConnection = null;

const connectDB = async () => {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    dbConnection = client.db();
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
  }
};

function getDB() {
  if (!dbConnection) {
    throw new Error('Database not connected');
  }
  return dbConnection;
}

export { connectDB, getDB };
