import { EmpleadosRepository } from "../repository/empleados.repository.js";
import validateEmail from "../validators/validators.model.js";

export const EmpleadosController =  {

    getAllEmpleados: async (req, res) => {
        try {
            const empleados = await EmpleadosRepository.getAll();
            res.json({empleados});
        } catch (error) {
            console.log("Error al obtener los empleados:", error.message);
            res.status(500).json(
                { error: "Error interno del servidor" });
        }
    },

    getEmpleadoById: async (req, res) => {
        const idParam = Number(req.params.id);
        try {
            const empleado = await EmpleadosRepository.getById(idParam);
            res.json({
                status: 200,    
                OK: true,
                message: 'Existe el empleado buscado',
                payload: empleado,
            });
        } catch (error) {
            res.status(404).json({
                status: 404,
                OK: false,
                message: `No existe el empleado con el id ${idParam}`,
            });
        }
    },

    deleteEmpleadoById : async (req, res) => {
        const idParam = Number(req.params.id);
        try {
            const empleadoToDelete = await EmpleadosRepository.getById(idParam);
            await EmpleadosRepository.deleteEmpleadoById(idParam);
            res.json({
                status: 200,
                OK: true,
                message: `Empleado con id ${idParam} ha sido eliminado exitosamente`,
            });
        }
        catch (error) {
            res.status(400).json({
               status: 400,
               OK: false,
               message: error.message,

            });

        }

    },

       createEmpleadoByJson: async (req, res) => {
        try {
            
            const { nombre, apellido, dni, correoElectronico, puesto, capacidades } = req.body;

            
            if (!nombre || !apellido || !dni || !correoElectronico || !puesto || !capacidades) {
                return res.status(400).json({
                    status: 400,
                    OK: false,
                    message: "Faltan datos obligatorios para crear el empleado."
                });
            }

           
            if (!validateEmail(correoElectronico)) {
                return res.status(400).json({
                    status: 400,
                    OK: false,
                    message: "El formato del correo electrónico es inválido."
                });
            }

            
            const nuevoEmpleado = await EmpleadosRepository.create({
                nombre,
                apellido,
                dni,
                correoElectronico,
                puesto,
                capacidades
            });

           
            return res.status(201).json({
                status: 201,
                OK: true,
                message: "Empleado creado exitosamente",
                payload: nuevoEmpleado
            });

        } catch (error) {
          
            console.error("Error al crear empleado:", error.message);
            return res.status(500).json({
                status: 500,
                OK: false,
                message: "Error interno del servidor",
                error: error.message
            });
        }
    },

    updateEmpleadoByJson: async (req, res) => {
    const idParam = Number(req.params.id);
    const { nombre, apellido, dni, correoElectronico, puesto, capacidades } = req.body;

    try {
        const updateData = {
            nombre,
            apellido,
            dni,
            correoElectronico,
            puesto,
            capacidades,
        };

        const empleadoActualizado = await EmpleadosRepository.updateEmpleadoById(idParam, updateData);

        return res.json({
            status: 200,
            OK: true,
            message: `El empleado con id ${idParam} fue actualizado exitosamente`,
            payload: empleadoActualizado,
        });
    } catch (error) {
        return res.status(404).json({
            status: 404,
            OK: false,
            message: error.message,
        });
    }

},

  getReporteCapacidades: async (req, res) => {
    try {
      const empleados = await EmpleadosRepository.getAll();
      
      const distribucion = {};

      empleados.forEach(empleado => {
        if (empleado.capacidades) {
          const nombreCompleto = `${empleado.nombre} ${empleado.apellido}`;
          const capacidades = empleado.capacidades.split(',').map(c => c.trim());

          capacidades.forEach(capacidad => {
            if (!distribucion[capacidad]) {
              distribucion[capacidad] = {
                cantidad: 0,
                empleados: []
              };
            }
            distribucion[capacidad].cantidad++;
            distribucion[capacidad].empleados.push(nombreCompleto);
          });
        }
      });

      const reporte = {
        reporteGenerado: new Date().toISOString(),
        totalCapacidadesUnicas: Object.keys(distribucion).length,
        distribucion
      };

      res.status(200).json(reporte);
    } catch (error) {
      res.status(500).json({ message: 'Error al generar el reporte de capacidades', error: error.message });
    }
  },

buscarPorCapacidad: async (req, res) => {
    try {
      const { capacidad } = req.query; // Obtener el parámetro de la URL

      if (!capacidad) {
        return res.status(400).json({ message: 'El parámetro "capacidad" es requerido.' });
      }

      const empleados = await EmpleadosRepository.findByCapacidad(capacidad);

      if (empleados.length === 0) {
        return res.status(404).json({ message: `No se encontraron empleados con la capacidad: ${capacidad}` });
      }

      res.status(200).json(empleados);
    } catch (error) {
      res.status(500).json({ message: 'Error al buscar empleados por capacidad', error: error.message });
    }
  },

  
}





