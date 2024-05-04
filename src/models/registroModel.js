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
  marcaTiempo: { type: Date, default: Date.now }, // Marca de tiempo de la entrada, salida o descanso
});

const Registro = mongoose.model("Registro", registroSchema);

export default Registro;
