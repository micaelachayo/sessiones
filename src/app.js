import __dirname from "./dirname.js";
import express from "express";
import handlebars from "express-handlebars";
import { conectMongoDB } from "./config/mongoDb.config.js";
import cookieParser from "cookie-parser";
import { router as vista } from "./routes/views.routes.js";
import  register  from "./routes/session.routes.js";
import sessions from "express-session";
import { initPassport } from "./config/passport.config.js";
import passport from "passport";
import { config } from "./config/config.js";

const PORT = 3000;

const app = express();
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// app.use(sessions({ secret: config.SECRET, resave: true, saveUninitialized: true, store:MongoStore.create({
//   mongoUrl:config.MONGO_URL,
//   dbName: config.DB_NAME,
//   ttl:1800
// }) })
// );

initPassport()
app.use(passport.initialize())
// app.use(passport.session())

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use("/",vista);
app.use("/api/session",register);
const server = app.listen(PORT, () => {
  console.log(`Server escuchando en puerto ${PORT}`);
});

conectMongoDB();
