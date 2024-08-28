import { Router } from "express";

import passport from "passport";

const router = Router();
router.post(
  "/registro",
  passport.authenticate("registro", { failureRedirect: "/api/session/error" }),
  async (req, res) => {
    let newUser = req.user;
    res.setHeader("Content-Type", "application/json");
    return res.status(201).json({ newUser });
  }
);

router.get("/logout", (req, res) => {

    let {web}=req.query

    req.session.destroy(error=>{
        if(error){
            res.setHeader('Content-Type','application/json');
            return res.status(500).json({error:`Error en logout`})
        }

        if(web){
            return res.redirect("/login?mensaje=Logout exitoso...!!!")
        }
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({payload:"Logout exitoso"});
    })
})

// router.post("/login", async (req, res) => {
//   try {
//     let { email, password } = req.body;
//     let usuario = await usuarioDao.existeUsuario({ email, password });
//     if (!usuario) {
//       res.setHeader("Content-Type", "application/json");
//       return res.status(401).json({ error: `Credenciales invalidas` });
//     }
//     delete usuario.password;
//     req.session.usuario = usuario;

//     res.setHeader("Content-Type", "application/json");
//     res.status(200).json({ payload: "Login exitoso", usuario });
//   } catch (error) {
//     console.log(error);
//     res.setHeader("Content-Type", "application/json");
//     res.status(500).json({
//       error: `Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
//       detalle: `${error.message}`,
//     });
//   }
// });
router.get("/github",passport.authenticate("github",{}),(req,res)=>{})
router.get("/callback",passport.authenticate("github",{failureRedirect:"/api/session/error"}),(req,res)=>{
})
router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/api/session/error" }),
  async (req, res) => {
    req.session.usuario = req.user;
    res.setHeader("Content-Type", "application/json");
    return res
      .status(200)
      .json({ payload: "login exitoso", logUsuario: req.user });
  }
);
router.get("/error", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  return res.status(500).json({
    error: `Error al autenticar con passport`,
  });
});
// router.post("/registro", async (req, res) => {
//   try {
//     //Esto, por mas que yp ya lo haya hecho en el front, lo hago aca, para que el back
//     let { nombre, email, password } = req.body;
//     if(!nombre || !email ||!password){
//      res.setHeader('Content-Type','application/json');
//      return res.status(401).json({error:`Ingrese todos los datos`})
//     }
//      const existe= await usuarioDao.existeUsuario({email});
//      if (existe){
//       res.setHeader('Content-Type','application/json');
//       return res.status(401).json({error:`El mail ${email}ya exise, intente con otro`})
//      }
//        let usuarioNuevo = await usuarioDao.createUsuario({
//       nombre,
//       email,
//       password: hashing(password)
//     });
//     console.log(usuarioNuevo);

//     res.setHeader("Content-Type", "application/json");
//  res.status(201).json({ usuarioNuevo });
//   } catch (error) {
//     console.error(error);
//     res.setHeader("Content-Type", "application/json");
//     res
//       .status(500)
//       .json({
//         status: "error",
//         msg: "Error interno del servidor",
//       });
//   }
// });

export default router;
