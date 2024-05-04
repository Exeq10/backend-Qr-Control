// registroController.js
import Registro from "../models/registroModel.js";
import { Empleado } from "../models/empleadoModel.js";

const guardarRegistro = async (req, res) => {
  try {
    const usuarioId = req.body.usuario;
    const tipo = req.body.tipo;

    // Verificar si ya hay una marca registrada para el usuario en las últimas 16 horas
    const ultimaMarca = await Registro.findOne({
      usuario: usuarioId,
      tipo: tipo,
      marcaTiempo: { $gte: new Date(new Date() - 16 * 60 * 60 * 1000) },
    });

    if (ultimaMarca) {
      return res.status(400).json({
        error:
          "Ya se ha registrado una marca para este empleado en las últimas 16 horas",
      });
    }

    // Si es una marca de salida, verificar si se ha tomado un descanso de al menos 30 minutos
    if (tipo === "salida") {
      const ultimaDescanso = await Registro.findOne({
        usuario: usuarioId,
        tipo: "descanso",
      }).sort({ marcaTiempo: -1 });

      if (!ultimaDescanso) {
        return res.status(400).json({
          error: "Debe tomar un descanso de al menos 30 minutos antes de marcar salida",
        });
      }

      const diferenciaMinutos = Math.abs(
        (new Date() - ultimaDescanso.marcaTiempo) / (60 * 1000)
      );

      if (diferenciaMinutos < 1) {
        return res.status(400).json({
          error: "Debe tomar un descanso de al menos 1 minutos antes de marcar salida",
        });
      }

      // Actualizar el total de horas acumuladas del empleado
      const empleado = await Empleado.findById(usuarioId);
      empleado.totalHoras += diferenciaMinutos / 60; // Convertir minutos a horas
      await empleado.save();
    }

    // Si es una marca de descanso, verificar que haya pasado al menos 1 minuto desde la entrada
    if (tipo === "descanso") {
      const ultimaEntrada = await Registro.findOne({
        usuario: usuarioId,
        tipo: "entrada",
      }).sort({ marcaTiempo: -1 });

      if (!ultimaEntrada) {
        return res.status(400).json({
          error: "No se encontró una marca de entrada previa para este empleado",
        });
      }

      const diferenciaMinutos = Math.abs(
        (new Date() - ultimaEntrada.marcaTiempo) / (60 * 1000)
      );

      if (diferenciaMinutos < 1) { // Verificar que hayan pasado al menos 1 minuto desde la entrada
        return res.status(400).json({
          error: "Debe pasar al menos 1 minuto desde la entrada para marcar un descanso",
        });
      }

      // Verificar que no haya pasado más de 16 horas desde la última entrada
      const diferenciaHoras = Math.abs(
        (new Date() - ultimaEntrada.marcaTiempo) / (60 * 60 * 1000)
      );

      if (diferenciaHoras > 16) {
        return res.status(400).json({
          error: "No se puede marcar un descanso después de 16 horas desde la última entrada",
        });
      }
    }

    // Crear y guardar el nuevo registro
    const nuevoRegistro = new Registro({
      usuario: usuarioId,
      tipo: tipo,
      marcaTiempo: Date.now(),
    });

    const registroGuardado = await nuevoRegistro.save();
    res.status(201).json(registroGuardado);
  } catch (error) {
    console.error("Error al guardar el registro:", error);
    res.status(500).json({ error: "Error al guardar el registro" });
  }
};

export { guardarRegistro };