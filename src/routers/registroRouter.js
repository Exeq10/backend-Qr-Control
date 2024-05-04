import express from 'express';
import { guardarRegistro } from '../controllers/registroController.js';

const routerRegistro = express.Router();

// Ruta para guardar un nuevo registro en la base de datos
routerRegistro.post('/api/marcar-registro', guardarRegistro);

export  {routerRegistro};
