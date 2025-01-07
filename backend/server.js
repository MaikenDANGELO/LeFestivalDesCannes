const express = require("express");
const userRouter = require("./routes/users.router");
const prestataireRouter = require("./routes/prestataires.router")
const adminRouter = require("./routes/admin.router");
const sponsorsRouter = require("./routes/sponsors.router");
const PORT = 3002;
const app = express();
const sync = require("./database/sync");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const expressSession = require("express-session"),
    cookieParser = require("cookie-parser")
const serverRouter = express.Router();

sync()
/** Swagger Initialization - START */
const swaggerOption = {
    swaggerDefinition: (swaggerJsdoc.Options = {
        openapi: '3.0.0',
        info: {
            title: "my-users app",
            description: "API documentation",
            contact: {
                name: "JAZAR",
            },
            servers: ["http j://localhost:3000/"],
        },
    }),
    apis: ["server.js", "./routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOption);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
/** Swagger Initialization - END */

serverRouter.use(cookieParser("secret_passcode"));
//création de 24 heures à partir de millisecondes
const unJour = 1000*60*60*24;
serverRouter.use(
    expressSession({
        secret: "secret_passcode",
        cookie: {
            maxAge: unJour
        },
        resave: false,
        saveUninitialized: false
    })
);

// Middleware traitement JSON
app.use(express.json());
app.use("/", serverRouter)
app.use("/api/users",userRouter);
app.use("/api/prestataires",prestataireRouter);
app.use("/api/administrateur",adminRouter);
app.use("/api/sponsors",sponsorsRouter);

// Middlewaires Gestion erreurs
app.use("*",(req,res,next)=>{
    const error = new Error("Route non trouvée");
    error.status = 404;
    next(error);
});
app.use((err,req,res,next)=>{
    res.status(err.status).send(err.message);
});

app.listen(PORT,()=>{
    console.log(`Serveur ecoute sur port ${PORT}`);
})