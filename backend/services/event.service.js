const Billetterie = require('../database/models/Billetterie');
const nodemailer = require('nodemailer');


exports.paidTicketsService = async (form, total, callback) => {
    try {
        const ticket = await Billetterie.create({
            nombre_billets: form.tickets.length,
            prix_total: total,
            date_achat: new Date(),
            email: form.email
        });

       // createTestAccount()
        const text = `Merci pour votre achat de ${form.tickets.length} billets pour un montant total de ${total}€.`
        await sendEmail(form.email, "Achat de billets", text);
        return callback(null, ticket);
    } catch (error) {
        return callback(error, null);
    }

}


async function sendEmail(to, subject, text, html = null) {
    try {
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email", // Ou "smtp.your-email-provider.com"
            port: 587,
            secure: false, // true pour 465, false pour les autres ports
            auth: {
                user: "dbedvoiydrnbmsoq@ethereal.email", // Remplace par ton email
                pass: "RDZ54ShbtYnN1QEpNG",  // ⚠️ Utiliser un mot de passe d’application (pas ton mot de passe perso)
            },
        });

        let mailOptions = {
            from: '"Festival des Canes" <dbedvoiydrnbmsoq@ethereal.email>', // Nom affiché
            to: to, // Email du destinataire
            subject: subject,
            text: text, // Contenu en texte brut
            html: html || `<p>${text}</p>` // Contenu en HTML (optionnel)
        };

        let info = await transporter.sendMail(mailOptions);
        console.log("Email envoyé: " + info.response);
        console.log("Aperçu ici: %s", nodemailer.getTestMessageUrl(info));
        return { success: true, message: "Email envoyé avec succès" };
    } catch (error) {
        console.error("Erreur d'envoi d'email: ", error);
        return { success: false, message: error.message };
    }
}

async function createTestAccount() {
    let testAccount = await nodemailer.createTestAccount();
    console.log("Compte Ethereal généré:");
    console.log(testAccount);
}

