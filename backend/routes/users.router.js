const express = require("express");
const userController = require("../controllers/users.controller");
const userMiddleware = require("../middlewares/users.middleware");
var router = express.Router();



module.exports = (passport) => {
    router.get("/", userMiddleware.isLoggedIn, userController.home)
    /**
     * @swagger
     * /api/users/:
     *   get:
     *     description: Vérifie si un utilisateur est connecté à la session
     *     tags:
     *       - Utilisateurs
     *     responses:
     *       '200':
     *         description: Objet utilisateur associé à la session active
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: integer
     *                   description: Identifiant unique de l'utilisateur
     *                 name:
     *                   type: string
     *                   description: Nom de l'utilisateur
     *                 email:
     *                   type: string
     *                   description: Adresse email de l'utilisateur
     *                 created_at:
     *                   type: string
     *                   format: date-time
     *                   description: Date et heure de création de l'utilisateur
     *       '401':
     *         description: Utilisateur non connecté (session indisponible)
     *       '500':
     *         description: Erreur interne du serveur
     */

    router.get('/getNextCanardDefileID', userController.getNextCanardDefileID)
    router.get('/getNextTimeDefile', userController.getNextTimeDefile)
    router.get("/logout", userMiddleware.isLoggedIn, userController.logout);
    /**
     * @swagger
     * /api/users/logout:
     *   get:
     *     description: Permet à un utilisateur connecté de se déconnecter en détruisant sa session.
     *     tags:
     *       - Utilisateurs
     *     responses:
     *       '200':
     *         description: Déconnexion réussie.
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
     *       '400':
     *         description: Erreur lors de la tentative de déconnexion.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: integer
     *                   example: 1
     *                 data:
     *                   type: string
     *                   example: "Erreur de déconnexion"
     */

    router.get("/getAllUser", userController.getUsers);
    /**
     * @swagger
     * /api/users/getAllUser:
     *   get:
     *     description: Récupère la liste de tous les utilisateurs
     *     tags:
     *       - Utilisateurs
     *     responses:
     *       '200':
     *         description: Liste des utilisateurs
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   id:
     *                     type: integer
     *                     description: Identifiant unique de l'utilisateur
     *                   name:
     *                     type: string
     *                     description: Nom de l'utilisateur
     *                   email:
     *                     type: string
     *                     description: Adresse email de l'utilisateur
     *       '500':
     *         description: Erreur interne du serveur
     */

    router.get('/getNotificationByUserID/:id', userMiddleware.isLoggedIn, userController.getNotificationByUserID)
    /**
     * @swagger
     * /api/users/getNotificationByUserID/{id}:
     *   get:
     *     description: Récupère les notifications pour un utilisateur spécifique par son ID
     *     tags:
     *       - Utilisateurs
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: ID de l'utilisateur
     *         schema:
     *           type: integer
     *     responses:
     *       '200':
     *         description: Liste des notifications pour l'utilisateur spécifié
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   id:
     *                     type: integer
     *                     description: Identifiant unique de la notification
     *                   message:
     *                     type: string
     *                     description: Contenu de la notification
     *                   created_at:
     *                     type: string
     *                     format: date-time
     *                     description: Date de création de la notification
     *       '401':
     *         description: L'utilisateur n'est pas connecté
     *       '500':
     *         description: Erreur interne du serveur
     */

    router.post("/connexion", userMiddleware.validateLogin, passport.authenticate("local-signin"), userController.connexion);
    /**
     * @swagger
     * /api/users/connexion:
     *   post:
     *     description: Permet à un utilisateur de se connecter avec un login et un mot de passe
     *     tags:
     *       - Utilisateurs
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - login
     *               - mdp
     *             properties:
     *               login:
     *                 type: string
     *                 description: Login de l'utilisateur
     *               mdp:
     *                 type: string
     *                 description: Mot de passe de l'utilisateur
     *     responses:
     *       '200':
     *         description: Connexion réussie
     *       '400':
     *         description: Requête invalide - Login ou mot de passe manquant ou invalide
     *       '404':
     *         description: Utilisateur non trouvé
     *       '500':
     *         description: Erreur interne du serveur
     */

    router.post("/signup", userMiddleware.validatePassword, passport.authenticate("local-signup"), userController.signup);
    /**
     * @swagger
     * /api/users/signup:
     *   post:
     *     description: Inscription d'un nouvel utilisateur
     *     tags:
     *       - Utilisateurs
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - login
     *               - mdp
     *             properties:
     *               login:
     *                 type: string
     *                 description: Email de l'utilisateur
     *               mdp:
     *                 type: string
     *                 description: Mot de passe sécurisé de l'utilisateur
     *     responses:
     *       '200':
     *         description: Inscription réussie
     *       '400':
     *         description: Mot de passe invalide ou informations manquantes
     *       '500':
     *         description: Erreur interne du serveur
     */

    router.post('/registerDuck', userMiddleware.isLoggedIn, userController.registerDuck)
    router.post('/sendAvis', userMiddleware.isLoggedIn , userController.sendAvis)
    /**
     * @swagger
     * /api/users/sendAvis:
     *   post:
     *     description: Permet à un utilisateur d'envoyer un avis pour un prestataire
     *     tags:
     *       - Utilisateurs
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - id_prestataire
     *               - texte
     *               - note
     *             properties:
     *               id_prestataire:
     *                 type: integer
     *                 description: Identifiant du prestataire
     *               texte:
     *                 type: string
     *                 description: Contenu de l'avis
     *               note:
     *                 type: integer
     *                 description: Note attribuée au prestataire
     *     responses:
     *       '200':
     *         description: Avis publié avec succès
     *       '401':
     *         description: L'utilisateur n'est pas connecté
     *       '500':
     *         description: Erreur interne du serveur
     */

    router.delete('/deleteAvis', userMiddleware.isLoggedIn, userController.deleteAvis)
    /**
     * @swagger
     * /api/users/deleteAvis:
     *   delete:
     *     description: Supprime un avis donné par son ID
     *     tags:
     *       - Utilisateurs
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - id
     *             properties:
     *               id:
     *                 type: integer
     *                 description: ID de l'avis à supprimer
     *     responses:
     *       '200':
     *         description: Avis supprimé avec succès
     *       '401':
     *         description: L'utilisateur n'est pas connecté
     *       '500':
     *         description: Erreur interne du serveur
     */

    router.put('/modifyAvis', userMiddleware.isLoggedIn, userController.modifyAvis)
    /**
     * @swagger
     * /api/users/modifyAvis:
     *   put:
     *     description: Modifie un avis existant pour un prestataire
     *     tags:
     *       - Utilisateurs
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - texte
     *               - note
     *               - id
     *             properties:
     *               texte:
     *                 type: string
     *                 description: Nouveau contenu de l'avis
     *               note:
     *                 type: integer
     *                 description: Nouvelle note attribuée
     *               id:
     *                 type: integer
     *                 description: ID de l'avis à modifier
     *     responses:
     *       '200':
     *         description: Avis modifié avec succès
     *       '401':
     *         description: L'utilisateur n'est pas connecté
     *       '500':
     *         description: Erreur interne du serveur
     */

    router.put('/changePersonnalData',userMiddleware.isLoggedIn, userController.changePersonnalData)
    /**
     * @swagger
     * /api/users/changePersonnalData:
     *   put:
     *     description: Permet de mettre à jour les données personnelles (nom, email, numéro de téléphone, adresse) d'un utilisateur spécifique.
     *     tags:
     *       - Utilisateurs
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - id
     *               - nom
     *               - email
     *               - numero
     *               - adresse
     *             properties:
     *               id:
     *                 type: integer
     *                 description: L'identifiant unique de l'utilisateur.
     *                 example: 1
     *               nom:
     *                 type: string
     *                 description: Le nouveau nom de l'utilisateur.
     *                 example: "John Doe"
     *               email:
     *                 type: string
     *                 description: Le nouvel email de l'utilisateur.
     *                 example: "john.doe@example.com"
     *               numero:
     *                 type: string
     *                 description: Le nouveau numéro de téléphone de l'utilisateur.
     *                 example: "0123456789"
     *               adresse:
     *                 type: string
     *                 description: La nouvelle adresse de l'utilisateur.
     *                 example: "1234 Rue de l'Érable"
     *     responses:
     *       '200':
     *         description: Données personnelles mises à jour avec succès.
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
     *                   description: Les nouvelles données de l'utilisateur.
     *       '401':
     *         description: L'utilisateur n'est pas connecté.
     *         content:
     *           text/plain:
     *             schema:
     *               type: string
     *               example: "Vous n'êtes pas connecté"
     *       '500':
     *         description: Erreur interne du serveur.
     */

    router.put('/changePassword',
        userMiddleware.isLoggedIn,
        userMiddleware.validatePassword,
        userMiddleware.validateActualPassword,
        userMiddleware.passwordAlreadyUsed,
        userController.changePassword)
    /**
     * @swagger
     * /api/users/changePassword:
     *   put:
     *     description: Permet de changer le mot de passe d'un utilisateur après validation de l'ancien mot de passe.
     *     tags:
     *       - Utilisateurs
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - id
     *               - newPassword
     *             properties:
     *               id:
     *                 type: integer
     *                 description: L'identifiant unique de l'utilisateur.
     *                 example: 1
     *               newPassword:
     *                 type: string
     *                 description: Le nouveau mot de passe de l'utilisateur.
     *                 example: "NouveauMotDePasse456@"
     *     responses:
     *       '200':
     *         description: Mot de passe changé avec succès.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 data:
     *                   type: string
     *                   example: "Mot de passe changée"
     *       '400':
     *         description: Mauvaise requête - Le mot de passe actuel est incorrect ou le nouveau mot de passe ne respecte pas les critères de sécurité.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   example: "Le mot de passe courant donné n'est pas le bon"
     *       '401':
     *         description: L'utilisateur n'est pas connecté.
     *         content:
     *           text/plain:
     *             schema:
     *               type: string
     *               example: "Vous n'êtes pas connecté"
     *       '500':
     *         description: Erreur interne du serveur.
     */

    return router;
}
