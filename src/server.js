import express from 'express';
import EmpleadosRouter from './router/empleados.router.js';
import WelcomeRouter from "./router/welcome.router.js";
import notFoundHandler from "./middleware/notFoundHandler.js";
import ApiUserRouter from './router/user.router.js';
import { rateLimit } from 'express-rate-limit';
import { apiReference } from '@scalar/express-api-reference'
import path from 'path';
import fs from 'fs';

const server = express();

// Set up rate limiter: maximum of 10 requests per minute
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10,
});
server.use(limiter);


server.use(express.json());

server.use('/openapi.yml', express.static(path.join(process.cwd(), 'openapi.yml')));


server.use(
  '/docs',
  apiReference({
    theme: 'purple',
    spec: {
      url: '/openapi.yml',  
    },
  })

)

server.use('/api/empleados',EmpleadosRouter);




// user authentication by JWT --> login | signup --> 
server.use("/api/user", ApiUserRouter)

// presentacion del server
server.use("/", WelcomeRouter)

// not found
server.use(notFoundHandler)

export default server;
