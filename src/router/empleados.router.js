import express from "express";
import { EmpleadosController } from "../controller/empleados.controller.js";
import { authenticateToken } from "../middleware/authentication.js";

const EmpleadosRouter = express.Router();

EmpleadosRouter.get("/all",EmpleadosController.getAllEmpleados);

//  RUTA DE REPORTE -- implementacion de complejidad moderada: 

EmpleadosRouter.get("/reporte/capacidades", EmpleadosController.getReporteCapacidades);
EmpleadosRouter.get("/buscar", EmpleadosController.buscarPorCapacidad);


// CRUD empleados
EmpleadosRouter.get("/:id", EmpleadosController.getEmpleadoById);
EmpleadosRouter.delete("/:id",authenticateToken, EmpleadosController.deleteEmpleadoById);
EmpleadosRouter.post("/create",authenticateToken, EmpleadosController.createEmpleadoByJson);
EmpleadosRouter.patch("/:id",authenticateToken, EmpleadosController.updateEmpleadoByJson);



export default EmpleadosRouter;