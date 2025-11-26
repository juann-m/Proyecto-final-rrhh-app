import { DataTypes } from 'sequelize';
import sequelize from '../databases/mysql.cnx.js';

const Empleado = sequelize.define(
  'empleado',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING(100), allowNull: false },
    apellido: { type: DataTypes.STRING(100), allowNull: false },
    dni: { type: DataTypes.STRING(15), allowNull: false, unique: true },
    correoElectronico: { type: DataTypes.STRING(150), allowNull: false, unique: true },
    puesto: { type: DataTypes.STRING(100), allowNull: false },
    capacidades: { type: DataTypes.STRING(300), allowNull: false },
  },
  {
    tableName: 'empleados',
    timestamps: false,
  },
);

export default Empleado;
