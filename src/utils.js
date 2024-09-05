import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "./config/config.js";
import passport from "passport";
export const hashing= password=>bcrypt.hashSync(password,bcrypt.genSaltSync(10));

//es para comparar la contrasena que escribí con el hash y ver que sean correctaas
export const validarPasword=(pass,hash)=>bcrypt.compareSync(pass,hash);

export const generaJWT= usuario=>jwt.sign(usuario, config.SECRET,{expiresIn:1800})
export const varifyToken=token=>jwt.verify(token, config.SECRET)

export const passportCall = (estrategia) => function (req, res, next) {
    passport.authenticate(estrategia, function (err, user, info, status) {
        if (err) { return next(err) }  // desde passport.config hago un return done(error)
        if (!user) {
            res.setHeader('Content-Type','application/json');
            return res.status(401).json({
                error:`${info.message?info.message:info.toString()}`,
                detalle:`${info.detalle?info.detalle:"-"}`
            })
        }   // desde passport.config hago un return done(null, false)
        
        req.user=user
        return next()
    })(req, res, next);
}