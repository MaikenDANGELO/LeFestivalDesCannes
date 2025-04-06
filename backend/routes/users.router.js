const express = require("express");
const userController = require("../controllers/users.controller");
const userMiddleware = require("../middlewares/users.middleware");
var router = express.Router();



module.exports = (passport) => {
    /**
     * @swagger
     * api/users/:
     *   get:
     *     summary: Page d'accueil de l'utilisateur
     *     description: Affiche les informations de l'utilisateur connecté (nom, email, adresse, téléphone, rôle).
     *     tags:
     *       - Utilisateur
     *     responses:
     *       200:
     *         description: Retourne les données de l'utilisateur connecté.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: integer
     *                   example: 0
     *                 data:
     *                   type: object
     *                   description: Données de l'utilisateur connecté.
     *                   properties:
     *                     id:
     *                       type: integer
     *                       example: 1
     *                     nom_utilisateur:
     *                       type: string
     *                       example: "Jean Dupont"
     *                     email_utilisateur:
     *                       type: string
     *                       example: "jean.dupont@example.com"
     *                     adresse_utilisateur:
     *                       type: string
     *                       example: "12 Rue de Paris, 75000 Paris"
     *                     telephone:
     *                       type: string
     *                       example: "+33 1 23 45 67 89"
     *                     role:
     *                       type: string
     *                       example: "Client"
     *       401:
     *         description: Utilisateur non authentifié
     *       500:
     *         description: Erreur serveur
     */
    router.get("/", userMiddleware.isLoggedIn, userController.home)



    /**
     * @swagger
     * /api/users/getNextCanardDefileID:
     *   get:
     *     summary: Récupérer l'ID du prochain canard pour le défilé
     *     tags:
     *       - Canard
     *     responses:
     *       200:
     *         description: Retourne l'ID du prochain canard pour le défilé.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: integer
     *                   example: 0
     *                 data:
     *                   type: integer
     *                   example: 5
     *       500:
     *         description: Erreur serveur
     */
    router.get('/getNextCanardDefileID', userController.getNextCanardDefileID)

    /**
     * @swagger
     * /api/users/getNextTimeDefile:
     *   get:
     *     summary: Récupérer l'heure du prochain défilé
     *     tags:
     *       - Canard
     *     responses:
     *       200:
     *         description: Retourne l'heure du prochain défilé.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: integer
     *                   example: 0
     *                 data:
     *                   type: string
     *                   example: "2025-04-07T10:00:00Z"
     *       500:
     *         description: Erreur serveur
     */
    router.get('/getNextTimeDefile', userController.getNextTimeDefile)

    /**
     * @swagger
     * /api/users/logout:
     *   get:
     *     summary: Déconnexion de l'utilisateur
     *     tags:
     *       - Utilisateur
     *     responses:
     *       200:
     *         description: Déconnexion réussie
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: integer
     *                   example: 0
     *                 data:
     *                   type: string
     *                   example: "Déconnexion réussie"
     *       400:
     *         description: Erreur lors de la déconnexion
     */
    router.get("/logout", userMiddleware.isLoggedIn, userController.logout);


    /**
     * @swagger
     * /api/users/getAllUser:
     *     get:
     *       summary: Récupérer tous les utilisateurs
     *       description: Cette route permet de récupérer la liste de tous les utilisateurs.
     *       tags:
     *         - Utilisateur
     *       responses:
     *         '200':
     *           description: Liste des utilisateurs récupérée avec succès.
     *           content:
     *             application/json:
     *               schema:
     *                 type: object
     *                 properties:
     *                   error:
     *                     type: integer
     *                     description: Code d'erreur, 0 si succès
     *                     example: 0
     *                   data:
     *                     type: array
     *                     items:
     *                       $ref: '#/components/schemas/Utilisateur'
     *         '500':
     *           description: Erreur interne du serveur.
     *           content:
     *             application/json:
     *               schema:
     *                 type: object
     *                 properties:
     *                   error:
     *                     type: integer
     *                     description: Code d'erreur
     *                     example: 1
     *                   message:
     *                     type: string
     *                     description: Message d'erreur
     *                     example: "Erreur interne"
     */
    router.get("/getAllUser", userController.getUsers);


    /**
     * @swagger
     * /api/users/getNotificationByUserID/{id}:
     *     get:
     *       summary: Récupérer les notifications par ID utilisateur
     *       description: Cette route permet de récupérer les notifications d'un utilisateur à partir de son ID.
     *       tags:
     *         - Utilisateur
     *       parameters:
     *         - in: path
     *           name: id
     *           required: true
     *           description: L'ID de l'utilisateur pour récupérer ses notifications.
     *           schema:
     *             type: integer
     *             example: 1
     *       responses:
     *         '200':
     *           description: Notifications récupérées avec succès.
     *           content:
     *             application/json:
     *               schema:
     *                 type: object
     *                 properties:
     *                   data:
     *                     type: array
     *                     items:
     *                       type: object
     *                       properties:
     *                         notification_id:
     *                           type: integer
     *                           description: Identifiant de la notification.
     *                           example: 101
     *                         message:
     *                           type: string
     *                           description: Contenu de la notification.
     *                           example: "Votre commande a été expédiée."
     *                         date:
     *                           type: string
     *                           format: date-time
     *                           description: Date de la notification.
     *                           example: "2025-04-06T12:00:00Z"
     *         '401':
     *           description: Utilisateur non authentifié.
     *           content:
     *             application/json:
     *               schema:
     *                 type: object
     *                 properties:
     *                   message:
     *                     type: string
     *                     description: Message d'erreur.
     *                     example: "Non authentifié"
     *         '500':
     *           description: Erreur interne du serveur.
     *           content:
     *             application/json:
     *               schema:
     *                 type: object
     *                 properties:
     *                   error:
     *                     type: integer
     *                     description: Code d'erreur.
     *                     example: 1
     *                   message:
     *                     type: string
     *                     description: Message d'erreur.
     *                     example: "Erreur interne"
     */
    router.get('/getNotificationByUserID/:id', userMiddleware.isLoggedIn, userController.getNotificationByUserID)



    /**
     * @swagger
     * api/users/connexion:
     *    post:
     *      summary: Connexion de l'utilisateur
     *      description: Permet à un utilisateur de se connecter avec son email et son mot de passe.
     *      tags:
     *        - Authentification
     *      requestBody:
     *        description: Données nécessaires pour la connexion de l'utilisateur.
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                email:
     *                  type: string
     *                  example: utilisateur@example.com
     *                  description: L'email de l'utilisateur.
     *                password:
     *                  type: string
     *                  example: "MotDePasse123!"
     *                  description: Le mot de passe de l'utilisateur.
     *      responses:
     *        '200':
     *          description: Connexion réussie
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  error:
     *                    type: integer
     *                    example: 0
     *                  data:
     *                    type: object
     *                    description: Informations de l'utilisateur connecté.
     *        '400':
     *          description: Échec de la connexion, email ou mot de passe incorrect.
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  error:
     *                    type: integer
     *                    example: 1
     *                  data:
     *                    type: string
     *                    example: "Erreur lors de la connexion"
     */
    router.post("/connexion", userMiddleware.validateLogin, passport.authenticate("local-signin"), userController.connexion);

    /**
     * @swagger
     * /api/users/signup:
     *    post:
     *      summary: Inscription d'un nouvel utilisateur
     *      description: Permet à un utilisateur de s'inscrire avec un email, un mot de passe, et d'autres informations personnelles.
     *      tags:
     *        - Authentification
     *      requestBody:
     *        description: Données nécessaires pour l'inscription de l'utilisateur.
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                email:
     *                  type: string
     *                  example: utilisateur@example.com
     *                  description: L'email de l'utilisateur.
     *                password:
     *                  type: string
     *                  example: "MotDePasse123!"
     *                  description: Le mot de passe de l'utilisateur (doit respecter les critères de sécurité).
     *                username:
     *                  type: string
     *                  example: "UtilisateurExemple"
     *                  description: Le nom d'utilisateur de l'utilisateur.
     *                numero:
     *                  type: string
     *                  example: "0123456789"
     *                  description: Le numéro de téléphone de l'utilisateur.
     *                adresse:
     *                  type: string
     *                  example: "123 Rue Exemple"
     *                  description: L'adresse de l'utilisateur.
     *                signUp:
     *                  type: string
     *                  example: "utilisateur"
     *                  description: Le rôle de l'utilisateur (par exemple, "utilisateur" ou "admin").
     *      responses:
     *        '200':
     *          description: Inscription réussie
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  error:
     *                    type: integer
     *                    example: 0
     *                  data:
     *                    type: object
     *                    description: Informations de l'utilisateur inscrit.
     *        '400':
     *          description: Échec de l'inscription (email déjà pris ou erreur lors de la création de l'utilisateur).
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  error:
     *                    type: integer
     *                    example: 1
     *                  data:
     *                    type: string
     *                    example: "Erreur lors de l'inscription"
     */
    router.post("/signup", userMiddleware.validatePassword, passport.authenticate("local-signup"), userController.signup);


    /**
     * @swagger
     * api/users/registerDuck:
     *   post:
     *     summary: Enregistrer un canard
     *     description:Permet d'enregistrer un nouveau canard dans le système avec les informations suivantes : nom, propriétaire, espèce, région et heure du défilé.
     *     tags:
     *       - Canard
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               nom:
     *                 type: string
     *                 description: Le nom du canard.
     *                 example: "Canard Rouge"
     *               idproprietaire:
     *                 type: integer
     *                 description: L'ID du propriétaire du canard.
     *                 example: 1
     *               espece:
     *                 type: string
     *                 description: L'espèce du canard.
     *                 example: "Canard Colvert"
     *               region:
     *                 type: string
     *                 description: La région d'origine du canard.
     *                 example: "Île-de-France"
     *               heureDefile:
     *                 type: string
     *                 format: date-time
     *                 description: L'heure à laquelle le canard défilera.
     *                 example: "2025-04-07T10:00:00Z"
     *     responses:
     *       200:
     *         description: Canard enregistré avec succès.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: integer
     *                   description: Code d'erreur, 0 si succès.
     *                   example: 0
     *                 data:
     *                   type: string
     *                   description: Message de succès.
     *                   example: "Canard enregistré avec succès."
     *       500:
     *         description: Erreur interne du serveur.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: integer
     *                   description: Code d'erreur.
     *                   example: 1
     *                 message:
     *                   type: string
     *                   description: Message d'erreur.
     *                   example: "Erreur interne"
     */
    router.post('/registerDuck', userMiddleware.isLoggedIn, userController.registerDuck);

    /**
     * @swagger
     * api/users/sendAvis:
     *   post:
     *     summary: Envoyer un avis
     *     description: Permet à un utilisateur de publier un avis sur un prestataire. L'avis contient une note et un texte.
     *     tags:
     *       - Avis
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: array
     *             items:
     *               type: string
     *             example: [1, 5, "Excellente prestation", 2]
     *             description: "Les paramètres sont dans l'ordre : id_prestataire, note, texte, id_utilisateur."
     *     responses:
     *       200:
     *         description: Avis envoyé avec succès.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: integer
     *                   description: Code d'erreur, 0 si succès.
     *                   example: 0
     *                 data:
     *                   type: string
     *                   description: Message de succès.
     *                   example: "L'avis a été publié avec succès."
     *       500:
     *         description: Erreur interne du serveur.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: integer
     *                   description: Code d'erreur.
     *                   example: 1
     *                 message:
     *                   type: string
     *                   description: Message d'erreur.
     *                   example: "Erreur interne"
     */
    router.post('/sendAvis', userMiddleware.isLoggedIn , userController.sendAvis);


    /**
     * @swagger
     * /deleteAvis:
     *   delete:
     *     summary: Supprimer un avis
     *     description: Permet de supprimer un avis en utilisant son ID. L'utilisateur doit être authentifié pour effectuer cette action.
     *     tags:
     *       - Avis
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               id:
     *                 type: integer
     *                 description: L'ID de l'avis à supprimer.
     *                 example: 10
     *     responses:
     *       200:
     *         description: L'avis a été supprimé avec succès.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 data:
     *                   type: string
     *                   description: Message de succès.
     *                   example: "L'avis a été supprimé avec succès."
     *       401:
     *         description: Utilisateur non authentifié.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   description: Message d'erreur.
     *                   example: "Non authentifié"
     *       500:
     *         description: Erreur interne du serveur.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: integer
     *                   description: Code d'erreur.
     *                   example: 1
     *                 message:
     *                   type: string
     *                   description: Message d'erreur.
     *                   example: "Erreur interne"
     */
    router.delete('/deleteAvis', userMiddleware.isLoggedIn, userController.deleteAvis);


    /**
     * @swagger
     * /modifyAvis:
     *   put:
     *     summary: Modifier un avis
     *     description: Permet de modifier un avis en fonction de son ID. L'utilisateur doit être authentifié et fournir un texte et une note à mettre à jour.
     *     tags:
     *       - Avis
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               id:
     *                 type: integer
     *                 description: L'ID de l'avis à modifier.
     *                 example: 10
     *               texte:
     *                 type: string
     *                 description: Le texte à mettre à jour dans l'avis.
     *                 example: "Avis modifié"
     *               note:
     *                 type: integer
     *                 description: La nouvelle note à attribuer à l'avis.
     *                 example: 4
     *     responses:
     *       200:
     *         description: L'avis a été modifié avec succès.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: integer
     *                   description: Code d'erreur, 0 si succès.
     *                   example: 0
     *                 data:
     *                   type: string
     *                   description: Message de succès.
     *                   example: "L'avis a été modifié avec succès."
     *       401:
     *         description: Utilisateur non authentifié.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   description: Message d'erreur.
     *                   example: "Non authentifié"
     *       500:
     *         description: Erreur interne du serveur.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: integer
     *                   description: Code d'erreur.
     *                   example: 1
     *                 message:
     *                   type: string
     *                   description: Message d'erreur.
     *                   example: "Erreur interne"
     */
    router.put('/modifyAvis', userMiddleware.isLoggedIn, userController.modifyAvis);


    /**
     * @swagger
     * /changePersonnalData:
     *   put:
     *     summary: Modifier les données personnelles de l'utilisateur
     *     description: Permet à un utilisateur authentifié de modifier ses informations personnelles telles que son nom, email, adresse et numéro de téléphone.
     *     tags:
     *       - Utilisateur
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               id:
     *                 type: integer
     *                 description: L'ID de l'utilisateur dont les données seront modifiées.
     *                 example: 1
     *               nom:
     *                 type: string
     *                 description: Le nom de l'utilisateur.
     *                 example: "Jean Dupont"
     *               email:
     *                 type: string
     *                 description: L'email de l'utilisateur.
     *                 example: "jean.dupont@example.com"
     *               adresse:
     *                 type: string
     *                 description: L'adresse de l'utilisateur.
     *                 example: "12 Rue de Paris, 75000 Paris"
     *               numero:
     *                 type: string
     *                 description: Le numéro de téléphone de l'utilisateur.
     *                 example: "+33 1 23 45 67 89"
     *     responses:
     *       200:
     *         description: Les informations personnelles ont été modifiées avec succès.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: integer
     *                   description: Code d'erreur, 0 si succès.
     *                   example: 0
     *                 data:
     *                   type: object
     *                   description: Les données modifiées de l'utilisateur.
     *                   properties:
     *                     id:
     *                       type: integer
     *                       description: L'ID de l'utilisateur.
     *                       example: 1
     *                     nom_utilisateur:
     *                       type: string
     *                       description: Le nom de l'utilisateur.
     *                       example: "Jean Dupont"
     *                     email_utilisateur:
     *                       type: string
     *                       description: L'email de l'utilisateur.
     *                       example: "jean.dupont@example.com"
     *                     adresse_utilisateur:
     *                       type: string
     *                       description: L'adresse de l'utilisateur.
     *                       example: "12 Rue de Paris, 75000 Paris"
     *                     telephone:
     *                       type: string
     *                       description: Le numéro de téléphone de l'utilisateur.
     *                       example: "+33 1 23 45 67 89"
     *       401:
     *         description: Utilisateur non authentifié.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   description: Message d'erreur.
     *                   example: "Non authentifié"
     *       500:
     *         description: Erreur interne du serveur.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: integer
     *                   description: Code d'erreur.
     *                   example: 1
     *                 message:
     *                   type: string
     *                   description: Message d'erreur.
     *                   example: "Erreur interne"
     */
    router.put('/changePersonnalData', userMiddleware.isLoggedIn, userController.changePersonnalData);


    /**
     * @swagger
     * /changePassword:
     *   put:
     *     summary: Modifier le mot de passe de l'utilisateur
     *     description: Permet de changer le mot de passe d'un utilisateur authentifié. L'utilisateur doit fournir son mot de passe actuel, un nouveau mot de passe valide, et l'ID de l'utilisateur.
     *     tags:
     *       - Utilisateur
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               id:
     *                 type: integer
     *                 description: L'ID de l'utilisateur dont le mot de passe sera modifié.
     *                 example: 1
     *               actualPassword:
     *                 type: string
     *                 description: Le mot de passe actuel de l'utilisateur.
     *                 example: "MotDePasseActuel123!"
     *               newPassword:
     *                 type: string
     *                 description: Le nouveau mot de passe à définir. Doit respecter certaines règles de sécurité.
     *                 example: "NouveauMotDePasse2025!"
     *     responses:
     *       200:
     *         description: Le mot de passe a été modifié avec succès.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: integer
     *                   description: Code d'erreur, 0 si succès.
     *                   example: 0
     *                 data:
     *                   type: string
     *                   description: Message de succès.
     *                   example: "Mot de passe changée"
     *       400:
     *         description: Erreur de validation des mots de passe (mot de passe invalide, mot de passe actuel incorrect, mot de passe déjà utilisé).
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   description: Message d'erreur.
     *                   example: "Le mot de passe doit contenir au moins 8 caractères."
     *       401:
     *         description: Utilisateur non authentifié.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   description: Message d'erreur.
     *                   example: "Non authentifié"
     *       500:
     *         description: Erreur interne du serveur.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: integer
     *                   description: Code d'erreur.
     *                   example: 1
     *                 message:
     *                   type: string
     *                   description: Message d'erreur.
     *                   example: "Erreur interne"
     */
    router.put('/changePassword',
        userMiddleware.isLoggedIn,
        userMiddleware.validatePassword,
        userMiddleware.validateActualPassword,
        userMiddleware.passwordAlreadyUsed,
        userController.changePassword);


    return router;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Canard:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nom:
 *           type: string
 *           example: "Canard de Paris"
 *         espece:
 *           type: string
 *           example: "Canard Colvert"
 *         region:
 *           type: string
 *           example: "Île-de-France"
 *         id_proprietaire:
 *           type: integer
 *           example: 3
 *
 *     Inscription:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         heure_defile:
 *           type: string
 *           example: "2025-04-07T10:00:00Z"
 *         id_canard:
 *           type: integer
 *           example: 1
 *     Utilisateur:
 *       type: object
 *       required:
 *         - nom_utilisateur
 *         - email_utilisateur
 *         - mot_de_passe
 *         - adresse_utilisateur
 *         - telephone
 *         - date_inscription
 *         - role
 *       properties:
 *         id:
 *           type: integer
 *           description: Identifiant unique de l'utilisateur.
 *           example: 1
 *         nom_utilisateur:
 *           type: string
 *           description: Le nom d'utilisateur choisi lors de l'inscription.
 *           example: "UtilisateurExemple"
 *         email_utilisateur:
 *           type: string
 *           description: L'email unique de l'utilisateur.
 *           example: "utilisateur@example.com"
 *         mot_de_passe:
 *           type: string
 *           description: Le mot de passe de l'utilisateur.
 *           example: "MotDePasse123!"
 *         adresse_utilisateur:
 *           type: string
 *           description: L'adresse physique de l'utilisateur.
 *           example: "123 Rue Exemple, Ville, Pays"
 *         telephone:
 *           type: string
 *           description: Le numéro de téléphone de l'utilisateur.
 *           example: "0123456789"
 *         date_inscription:
 *           type: string
 *           format: date-time
 *           description: La date à laquelle l'utilisateur s'est inscrit.
 *           example: "2025-04-06T12:00:00Z"
 *         role:
 *           type: string
 *           description:Le rôle attribué à l'utilisateur (ex: utilisateur, administrateur).
 *           example: "utilisateur"
 */
