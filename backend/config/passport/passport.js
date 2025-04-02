const bcrypt = require("bcrypt");
const e = require("express");
module.exports = function(passport, user) {
    const User = user;
    const LocalStrategy = require("passport-local").Strategy;

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findByPk(id).then((user) => {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        }).catch(err => done(err));
    });

    passport.use("local-signup", new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, email, password, done) {
        const { numero, username, adresse, signUp } = req.body;

        let generateHash = function(password) {
            return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
        };

        User.findOne({ where: { email_utilisateur: email } }).then((user) => {
            if (user) {
                return done(null, false, { data: "Email déjà pris" });
            } else {
                let userPassword = generateHash(password);
                console.log('oui')
                let data = {
                    nom_utilisateur: username,
                    email_utilisateur: email,
                    mot_de_passe: userPassword,
                    adresse_utilisateur: adresse,
                    telephone: numero,
                    date_inscription: new Date(),
                    role: signUp
                };
                User.create(data).then((newUser, created) => {
                    if (!newUser) {
                        console.log('non')
                        return done(null, false, { data: "Erreur lors de la création de l'utilisateur" });
                    }
                    console.log('oui2')
                    return done(null, newUser);
                }).catch(err => {
                    return done(err);
                });
            }
        }).catch(err => {
            return done(err);
        });
    }));

    passport.use("local-signin", new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, email, password, done) {
        let isValidPassword = function(userpass, password) {
            return bcrypt.compareSync(password, userpass);
        };

        User.findOne({ where: { email_utilisateur: email } }).then((user) => {
            if (!user) {
                return done(null, false, { data: "Email n'existe pas" });
            }
            if (!isValidPassword(user.mot_de_passe, password)) {
                return done(null, false, { data: "Mot de passe incorrect" });
            }
            return done(null, user.get());
        }).catch(err => {
            return done(null, false, { data: "Une erreur s'est produite." });
        });
    }));
};
