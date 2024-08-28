import passport from "passport"
import local from "passport-local"
import github from "passport-github2"
import usuarioDao from "../dao/managers/usuario.dao.js"
import { hashing, validarPasword } from "../utils.js"

export const initPassport=()=>{
    passport.use(
        "registro",
        new local.Strategy(
            {usernameField:"email",
                passReqToCallback:true
            },
            async(req,username,password,done)=>{
                try {
                    let {nombre}=req.body
                    if(!nombre){
                        console.log("falta el nombre")
                     return done(null,false)
                    }
                    let existe= await usuarioDao.existeUsuario({email: username})
                    if(existe){
                        console.log("usruario repetido, ya existe")
                        return done (null,false)
                       
                    }
                    let newUser=await usuarioDao.createUsuario({nombre, email:username, password:hashing(password)})
                    return done (null, newUser)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )

    passport.use("login", new local.Strategy({usernameField:"email"},
        async(username, password,done)=>{
try {
    let usuario=await usuarioDao.existeUsuario({email:username})
    if(!usuario){
        console.log("no existe ese usuario")
        return done(null,false)
    }
    if (!validarPasword(password, usuario.password)){
        console.log("credenciales incorrectas")
        return done(null, false)
    }
    delete usuario.password
    return done(null,usuario)
} catch (error) {
    return done(error)
}
    }))

    passport.use(
        "github",
        new github.Strategy(
          {
            clientID: "Iv23liRfoYfwkSilG7hk",
            clientSecret: "4e25d0a74977460b9b43b413f3a99bd72779a209",
            callbackURL: "http://localhost:3000/api/session/callback",
            scope: ["user:email"],
          },
          async (token, refreshtoken, profile, done) => {
            try {
                let email = profile.emails && profile.emails[0] && profile.emails[0].value;
              let { name } = profile._json;
              if (!email) {
                console.log("falta email")
                return done(null, false);
              }
              let usuario = await usuarioDao.existeUsuario({ email });
              if (!usuario) {
                console.log("no existe usuario")
                usuario = await usuarioDao.createUsuario({
                  nombre: name,
                  email,
                  profile,
                });

              }
              return done(null, usuario);
            } catch (error) {
              return done(error);
            }
          }
        )
      )
 passport.serializeUser(function(user,done){
    return done(null, user);
 })
 passport.deserializeUser(async function(usuario,done){
 
    return done (null,usuario)
 })
}