import { generaJWT } from "../utils.js";

export const registro = async (req, res) => {
  let newUser = req.user;
  res.setHeader("Content-Type", "application/json");
  return res.status(201).json({ newUser });
};

export const login = async (req, res) => {
  let token = generaJWT(req.user);
  res.cookie("cookieMica", token, { httpOnly: true });
  res.setHeader("Content-Type", "application/json");
  return res
    .status(200)
    .json({ payload: "login exitoso", logUsuario: req.user });
};

export const logOut = (req, res) => {
  res.clearCookie("cookieMica", { httpOnly: true });

  let { web } = req.query;

  if (web) {
    // Redirigir a la página de login con un mensaje de éxito
    return res.redirect("/login?mensaje=Logout exitoso...!!!");
  }
  res.setHeader("Content-Type", "application/json");
  return res.status(200).json({ payload: "Logout exitoso" });
};

export const callback = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  return res.status(200).json({
    message: "Login exitoso",
    usuarioLogueado: req.user,
  });
};

export const current = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "No autorizado" });
  }

  console.log(req.user)

  res.setHeader("Content-Type", "application/json");
  res.status(200).json({ usuario: req.user });
};

export const error = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  return res.status(500).json({
    error: "Error al autenticar con passport",
  });
};

export const pageNotFound = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  return res.status(404).json({
    error: "page not found | 404",
    detalle: "La ruta solicitada no existe.",
  });
};
