import  Empleado  from '../model/empleado.model.js';
import { Op } from 'sequelize';


// Implementación por medio de sequelize
// https://sequelize.org/

export const EmpleadosRepository = {

  getAll: async () => {
    return await Empleado.findAll();
  },

  getById: async (id) => {
    const empleado = await Empleado.findByPk(Number(id));
    if (!empleado) {
      throw new Error('Empleado no encontrado');
    }
    return empleado;
  },

  create: async (empleadoData) => {
    const nuevoEmpleado = await Empleado.create(empleadoData);
    return nuevoEmpleado;
  },

  
  // ojo porque el método destroy no devuevle un objeto sino un número
  deleteEmpleadoById: async (id) => {
    const deletedCount = await Empleado.destroy({
      where: { id: Number(id) },
    });
    if (deletedCount === 0) {
      throw new Error('El empleado que estás queriendo eliminar no fue encontrado');
    }

    return deletedCount;
  },

  updateEmpleadoById: async (id, updateData) => {

    const empleado = await Empleado.findByPk(Number(id));
    if (!empleado) {
      throw new Error('Empleado no encontrado');
    }

    await empleado.update(updateData);
    return empleado;
  },

  findByCapacidad: async (capacidad) => {
    const empleados = await Empleado.findAll({
      where: {
        capacidades: {
          [Op.like]: `%${capacidad}%` 
        }
      }
    });
    return empleados;
  },

  
    
};