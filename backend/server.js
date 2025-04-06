const express = require("express");
const prestataireRouter = require("./routes/prestataires.router")
const adminRouter = require("./routes/admin.router");
const sponsorsRouter = require("./routes/sponsors.router");
const cors = require('cors');
const PORT = 3000;
const app = express();
const sync = require("./database/sync");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const passport = require("passport");
const Utilisateur = require("./database/models/Utilisateur");
const userRouter = require("./routes/users.router")(passport);
const bodyParser = require("body-parser");
const path = require("path");


const session = require("express-session")

const serverRouter = express.Router();
//require pour la boutique
const produitRouter = require("./routes/produit.router");
const categorieProduitRouter = require("./routes/categorieproduit.router");
const commandeRouter = require("./routes/commande.router");
const avisProduitRouter = require("./routes/avisproduit.router");
const suiviCommandeRouter = require("./routes/suivicommande.router");
const boutiqueStatusRouter = require("./routes/boutiquestatus.router");


// Autoriser toutes les origines
//app.use(cors());

// Ou pour autoriser une origine spécifique :

app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true
}));

//sync()
/** Swagger Initialization - START */
const swaggerOption = {
    swaggerDefinition: (swaggerJsdoc.Options = {
        openapi: '3.0.0',
        info: {
            title: "API SAE",
            description: "API documentation",
            contact: {
                name: "Festival des Canes",
            },
            servers: ["http j://localhost:3000/"],
        },
    }),
    apis: ["server.js", "./routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOption);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
/** Swagger Initialization - END */

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuration de la session
app.use(session({
    secret: process.env.SECRET || "default_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 } // 1 heure
}));

// Initialisation de Passport
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport/passport")(passport, Utilisateur); // Configuration Passport

// Middleware traitement JSON
app.use(express.json());
app.use("/", serverRouter)
app.use("/api/users",userRouter);
app.use("/api/prestataires",prestataireRouter);
app.use("/api/administrateur",adminRouter);
app.use("/api/sponsors",sponsorsRouter);
app.use('/api/associations', require('./routes/associations.router'));
app.use('/api/event', require('./routes/event.router'));
app.use("/api/produits", produitRouter);
app.use("/api/categories-produits", categorieProduitRouter);
app.use("/api/commandes", commandeRouter);
app.use("/api/avis-produits", avisProduitRouter);
app.use("/api/suivi-commande", suiviCommandeRouter);
app.use("/api/boutique-status", boutiqueStatusRouter);

// Middlewaires Gestion erreurs
app.use("*",(req,res,next)=>{
    const error = new Error("Route non trouvée");
    error.status = 404;
    next(error);
});
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ error: err.message });
});


app.listen(PORT,()=>{
    console.log(`Serveur ecoute sur port ${PORT}`);
})

