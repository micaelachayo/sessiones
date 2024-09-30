import { Router } from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import { generaJWT, passportCall } from "../utils.js";
import {
  callback,
  current,
  error,
  login,
  logOut,
  pageNotFound,
  registro,
} from "../controller/session.controller.js";



const router = Router();
router.get("/github", passport.authenticate("github", {}), (req, res) => {});
router.get(
  "/callback",
  passport.authenticate("github", { failureRedirect: "/api/session/error" }),
  callback
);

router.post(
  "/registro",
  passport.authenticate("registro", {
    failureRedirect: "/api/session/error",
    session: false,
  }),
  registro
);

router.post(
  "/login",
  passport.authenticate("login", { session: false }),
  login
);

router.get("/logout", logOut);

router.get("/error", error);
router.get("*", pageNotFound);

router.get("/current", passportCall("current"), current);

export default router;
