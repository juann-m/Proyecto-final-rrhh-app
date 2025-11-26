import sequelize from "../databases/mysql.cnx.js";

const AppStatus = {

    welcome: (req, res) => {
        res.json({
            service: "RRHH-App API",
            version: "1.0.0",
            status: "operational",
            message: "Bienvenido a la API de Recursos Humanos",
            health: `${req.protocol}://${req.get("host")}/health`,
            timestamp: new Date().toISOString()
        });
    },

    healthCheck: async (req, res) => {
        try {
            // Intentamos hacer un ping a MySQL
            await sequelize.authenticate();

            res.status(200).json({
                status: "healthy",
                mysql: "connected",
                timestamp: new Date().toISOString()
            });

        } catch (error) {
            console.error("Error al conectar con MySQL:", error.message);

            res.status(503).json({
                status: "degraded",
                mysql: "disconnected",
                error: error.message
            });
        }
    }
};

export default AppStatus;