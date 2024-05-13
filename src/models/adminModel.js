import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  nombre: {
    type: String,
    trim: true,
    unique: true
  },
  apellido: {
    type: String,
    trim: true
  },
  documento: {
    type: String,
    trim: true,
    unique: true
  },
  pic_url: String,
  timestamp: { type: Date, default: Date.now },
  
});

const Admin = mongoose.model("Admin", adminSchema);

export { Admin };
