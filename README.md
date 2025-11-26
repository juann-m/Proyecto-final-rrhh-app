# Proyecto Final - Aplicación de RRHH

API RESTful desarrollada en Node.js y Express para la gestión de recursos humanos. La aplicación permite administrar una base de datos de empleados, controlar el acceso mediante un sistema de autenticación y generar reportes estratégicos sobre las capacidades del personal.

## Tecnologías Utilizadas

- **Backend:** Node.js, Express.js
- **Bases de Datos:**
  - **MySQL (Aiven Cloud):** Para almacenar los datos principales de los empleados.
  - **Supabase (PostgreSQL):** Utilizado como servicio de autenticación para gestionar usuarios, roles y tokens JWT.
- **ORM:** Sequelize para la interacción con la base de datos MySQL.
- **Autenticación:** JSON Web Tokens (JWT) gestionados por Supabase.
- **Documentación:** OpenAPI 3.1.0 con visualización interactiva a través de `@scalar/express-api-reference`.
- **Seguridad:**
  - Limitación de peticiones (Rate Limiting) con `express-rate-limit`.
  - Variables de entorno con `dotenv`.
  - Rutas protegidas por middleware de autenticación.
- **Testing:** Pruebas de endpoints con la extensión REST Client de VS Code (`api.test.http`).
- **Linting & Formatting:** Biome.js para mantener la calidad y consistencia del código.

## Características Principales

- **Gestión de Empleados:** Operaciones CRUD completas (Crear, Leer, Actualizar, Eliminar) sobre los registros de empleados.
- **Autenticación de Usuarios:** Sistema de registro (`signup`) e inicio de sesión (`login`) para proteger las rutas sensibles de la API.
- **Funcionalidades de Alta Complejidad:**
  1.  **Reporte de Capacidades:** Endpoint que procesa la información de todos los empleados para generar un reporte consolidado que agrupa al personal por sus habilidades.
  2.  **Búsqueda por Habilidad:** Endpoint de búsqueda que permite filtrar y encontrar empleados que posean una capacidad específica.
- **Documentación Interactiva:** Un endpoint `/docs` que presenta una interfaz web para explorar y probar la API, generada a partir de un archivo `openapi.yml`.

## Instalación y Puesta en Marcha

1.  **Clonar el repositorio:**
    ```bash
    git clone <URL-DEL-REPOSITORIO>
    cd proyecto-final-rrhh-app
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar variables de entorno:**
    Crear un archivo `.env` en la raíz del proyecto y llenarlo con las credenciales correspondientes. Puedes usar el siguiente template:
    ```dotenv
    # MySQL Connection
    MYSQL_DB=tu_base_de_datos
    MYSQL_USER=tu_usuario
    MYSQL_PASS=tu_contraseña
    MYSQL_HOST=tu_host
    MYSQL_PORT=tu_puerto
    DIALECT=mysql

    # Server Configuration
    SERVER_HOST=127.0.0.1
    SERVER_PORT=3001

    # Supabase Credentials
    SUPABASE_URL=tu_supabase_url
    SUPABASE_API_KEY=tu_supabase_api_key
    ```

4.  **Iniciar el servidor en modo desarrollo:**
    El servidor se iniciará y se reiniciará automáticamente ante cualquier cambio en los archivos.
    ```bash
    npm run dev
    ```
    La API estará disponible en `http://127.0.0.1:3001`.

## Documentación de Endpoints (API)

La documentación interactiva completa está disponible en el endpoint `/docs` una vez que el servidor está en ejecución. A continuación, se detalla el comportamiento de cada punto de acceso.

---
### 🏷️ Autenticación

| Endpoint              | Descripción                                       | Auth Requerida | Body / Params                               | Respuesta Exitosa (2xx)                               |
| --------------------- | ------------------------------------------------- | :------------: | ------------------------------------------- | ----------------------------------------------------- |
| `POST /api/user/signup` | Registra un nuevo usuario en el sistema.          |       No       | `{ "email": "...", "password": "..." }`     | `201 Created` con mensaje y datos del usuario.        |
| `POST /api/user/login`  | Inicia sesión y devuelve un token JWT de acceso. |       No       | `{ "email": "...", "password": "..." }`     | `200 OK` con mensaje, rol y token JWT.                |

----

### 🏷️ Empleados (CRUD)

| Endpoint                 | Descripción                               | Auth Requerida | Body / Params                               | Respuesta Exitosa (2xx)                               |
| ------------------------ | ----------------------------------------- | :------------: | ------------------------------------------- | ----------------------------------------------------- |
| `GET /api/empleados/all`   | Obtiene una lista de todos los empleados. |       No       | -                                           | `200 OK` con un array de objetos de empleado.         |
| `GET /api/empleados/{id}`  | Obtiene un empleado por su ID.            |       No       | `id` (en la URL)                            | `200 OK` con el objeto del empleado.                  |
| `POST /api/empleados/create` | Crea un nuevo empleado.                   |      **Sí**      | Objeto JSON con los datos del empleado.     | `201 Created` con los datos del nuevo empleado.       |
| `PATCH /api/empleados/{id}`  | Actualiza los datos de un empleado.       |      **Sí**      | `id` (URL) y JSON con los campos a cambiar. | `200 OK` con los datos del empleado actualizado.      |
| `DELETE /api/empleados/{id}` | Elimina un empleado de la base de datos.  |      **Sí**      | `id` (en la URL)                            | `200 OK` con un mensaje de confirmación.              |

---

### 🏷️ Reportes y Búsquedas (Complejidad Moderada/Alta)

| Endpoint                               | Descripción                                                              | Auth Requerida | Body / Params                               | Respuesta Exitosa (2xx)                               |
| -------------------------------------- | ------------------------------------------------------------------------ | :------------: | ------------------------------------------- | ----------------------------------------------------- |
| `GET /api/empleados/reporte/capacidades` | Genera un reporte que agrupa a los empleados por cada habilidad que poseen. |      **Sí**      | -                                           | `200 OK` con el objeto del reporte.                   |
| `GET /api/empleados/buscar`              | Busca empleados que coincidan con una capacidad específica.              |       No       | Query param: `?capacidad=JavaScript`        | `200 OK` con un array de los empleados encontrados.   |

---

## Testing

Para probar los endpoints, se puede utilizar la extensión **REST Client** en Visual Studio Code con el archivo `src/tests/api.test.http`. Este archivo contiene peticiones pre-configuradas para cada endpoint, incluyendo el flujo de autenticación para obtener y usar el token JWT.

## Linting y Formato de Código

El proyecto utiliza Biome.js para asegurar un estilo de código consistente.

- **Verificar el formato y linting:**
  ```bash
  npm run linter:check
  ```
- **Aplicar formato automáticamente:**
  ```bash
  npm run linter:format
  ```