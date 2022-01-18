import express from "express";
import passport from "passport";
import session from "express-session";
import mongo_store from "connect-mongo";
import dotenv from "dotenv";
import handlebars from "express-handlebars";

import AuthRoute from "../routes/auth-route.js";
import WrongRoute from "../routes/fail.js";
import MainRoute from "../routes/main.js";

dotenv.config({
    path:"./config/.env"
});
const app = express();
const __dirname = process.cwd();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(session({
        store : mongo_store.create({
            //ttl:60000,
            mongoUrl: process.env.MONGODB,
            mongoOptions: {
                useNewUrlParser: true, 
                useUnifiedTopology: true
            }
        }),
        secret:process.env.SECRETKEY,
        resave:true,
        saveUninitialized:true,
    }
));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname+"/public"));
app.use("/CSS",express.static(__dirname+"/node_modules/bootstrap/dist/css"));
app.use("/JS",express.static(__dirname+"/node_modules/dist/js/"));

app.engine("hbs",handlebars.engine({
    extname:".hbs",
    defaultLayout:"base.hbs",
    layoutsDir:__dirname+"/views/layouts",
    partialsDir:__dirname+"/views/partials"
}));
app.set("views",__dirname+"/views");
app.set("view engine","hbs");

app.use("/",MainRoute);
app.use("/auth",AuthRoute);
app.use("*",WrongRoute);

export default app;