// registroModel.js
import mongoose from "mongoose";


const registroSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Empleado",
    required: true,
  }, // Referencia al empleado
  tipo: {
    type: String,
    enum: ["entrada", "salida", "descanso"], // Agregar el tipo de marca "descanso"
    required: true
  },
  marcaTiempo: { 
    type: Date, 
    default: Date.now,
    get: timestamp => {
      const options = {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false // Formato de 24 horas
      };
      return new Date(timestamp).toLocaleString('es-ES', options);
    }
  }, // Marca de tiempo de la entrada, salida o descanso
});

const Registro = mongoose.model("Registro", registroSchema);

export default Registro;

