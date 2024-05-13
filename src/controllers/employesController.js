// empleadoController.js
import { Empleado } from "../models/empleadoModel.js";

const createUser = async (req, res) => {
  const usuario = new Empleado({
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    documento: req.body.documento,
    key_secret: req.body.key_secret,
    pic_url:req.body.pic_url,
    direccion:req.body.direccion,
    p_salud :req.body.p_salud,
    tel:req.body.tel
  });

  try {
    const nuevoUsuario = await usuario.save();
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const usuario = await Empleado.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const usuario = await Empleado.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }
    usuario.nombre = req.body.nombre || usuario.nombre;
    usuario.apellido = req.body.apellido || usuario.apellido;
    usuario.documento = req.body.documento || usuario.documento;
    usuario.key_secret = req.body.key_secret || usuario.key_secret;
    const usuarioActualizado = await usuario.save();
    res.json(usuarioActualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const usuario = await Empleado.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }
    await usuario.remove();
    res.json({ message: "Empleado eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const usuarios = await Empleado.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserByNombreDocumento = async (req, res) => {
  const { nombre, documento } = req.body;
  try {
    const usuario = await Empleado.findOne({ nombre, documento });
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { 
  createUser, 
  getUserById, 
  updateUser, 
  deleteUser, 
  getAllUsers,
  getUserByNombreDocumento
};
