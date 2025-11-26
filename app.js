import config from './src/config/config.js';
import sequelize from './src/databases/mysql.cnx.js';
import server from './src/server.js';

const runServer = async () => {
  try {
    await sequelize.authenticate();
    console.log(`Conexión a la base de datos MySQL exitosa. ${config.MYSQL_HOST}`);
    server.listen(config.SERVER_PORT, config.SERVER_HOST, () => {
      console.log(`Servidor escuchando en http:// ${config.SERVER_HOST}:${config.SERVER_PORT}`);
    });
  } catch (error) {
    console.error(
      `No se pudo conectar a la base de datos MySQL: ${config.SERVER_HOST}`,
      error.message,
    );
  }
};

runServer();

export default server;
