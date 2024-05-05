// Importa los módulos necesarios
import express, { json } from 'express'
import cors from "cors";
import { dbconnect } from './src/db/db.js';
import { employeesRouter } from './src/routers/employesRouter.js';
import { routerRegistro } from './src/routers/registroRouter.js';

// Crea la instancia de la aplicación Express
const app = express();

// Middleware para analizar el cuerpo de las solicitudes
app.use(cors({
  origin: ['http://localhost:5173', 'http://192.168.164.214:5173','https://controlqrvique.netlify.app'],
  methods: ['GET', 'POST','PATCH','DELETE'], 
  allowedHeaders: ['Content-Type'], 
}));
app.use(json());

// Middleware para registrar las solicitudes entrantes
app.use((req, res, next) => {
  console.log(`Solicitud ${req.method} a ${req.path}`);
  next();
});

// Usar el router para gestionar las rutas relacionadas con los empleados
app.use(employeesRouter);

// Usar el router para gestionar las rutas relacionadas con el registro
app.use(routerRegistro);

// Puerto en el que se ejecutará el servidor
const PORT = process.env.PORT || 3000;

// Función para iniciar el servidor
const startServer = async () => {
  // Conexión a la base de datos
  await dbconnect();

  // Iniciar el servidor en el puerto especificado
  app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
  });
}

// Iniciar el servidor
startServer();
