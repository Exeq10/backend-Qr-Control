// empleadoModel.js
import mongoose from "mongoose";


const empleadoSchema = new mongoose.Schema({
  nombre:{
    type: String,
    trim:true
  },
  apellido: {
    type:String,
    trim:true,
  },
  documento: {
    type:String,
    trim:true
  },
  key_secret: String,
  totalHoras: { type: Number, default: 0 }, // Total de horas acumuladas del empleado
  timestamp: { type: Date, default: Date.now },
});

const Empleado = mongoose.model("Empleado", empleadoSchema);

export { Empleado };
