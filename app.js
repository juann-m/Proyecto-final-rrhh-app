import server from './src/server.js';
import 'dotenv/config';
import { connectToDatabase } from './src/databases/mysql.cnx.js';

const PORT = process.env.SERVER_PORT || 3001;

const startServer = async () => {
  try {
    await connectToDatabase();
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();