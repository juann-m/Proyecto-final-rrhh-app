import { Sequelize } from 'sequelize';
import config from '../config/config.js';

// Crea la instancia de Sequelize
const db = new Sequelize(config.MYSQL_DB, config.MYSQL_USER, config.MYSQL_PASS, {
  host: config.MYSQL_HOST,
  dialect: 'mysql',
  port: config.MYSQL_PORT || 3306,
  logging: false,
});

export default db;
