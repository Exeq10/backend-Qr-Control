import express, { json } from 'express'
import cors from "cors";

import { dbconnect } from './src/db/db.js';
import { employeesRouter } from './src/routers/employesRouter.js';
import {routerRegistro} from './src/routers/registroRouter.js';




const app = express();

// Middleware para analizar el cuerpo de las solicitudes
app.use(cors())
app.use(json());



// Usar el router para gestionar las rutas relacionadas con el escaneo
app.use(employeesRouter );
app.use(routerRegistro );



const PORT = process.env.PORT || 3000;

const startServer = async ()  => {

  await dbconnect()


   app.listen(PORT ,() => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
}


startServer()