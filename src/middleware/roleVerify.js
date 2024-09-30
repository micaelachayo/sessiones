// middleware/roleVerify.js
export const verificarRol = (rolesPermitidos) => {
  return (req, res, next) => {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ error: "No autorizado. Debe autenticarse." });
    }

    if (!rolesPermitidos.includes(user.role)) {
      return res.status(403).json({ error: "No tiene permiso para acceder a esta ruta." });
    }

    next();
  };
};
