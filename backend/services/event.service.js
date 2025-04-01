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

        //const text = `Merci pour votre achat de ${form.tickets.length} billets pour un montant total de ${total}€.`
        //await sendEmail(form.email, "Achat de billets", text);
        return callback(null, ticket);
    } catch (error) {
        return callback(error, null);
    }

}


async function sendEmail(to, subject, text, html = null) {
    try {
        let transporter = nodemailer.createTransport({
            service: "gmail", // Ou "smtp.your-email-provider.com"
            auth: {
                user: "tonemail@gmail.com", // Remplace par ton email
                pass: "ton_mot_de_passe",  // ⚠️ Utiliser un mot de passe d’application (pas ton mot de passe perso)
            },
        });

        let mailOptions = {
            from: '"Festival des Canes" <tonemail@gmail.com>', // Nom affiché
            to: to, // Email du destinataire
            subject: subject,
            text: text, // Contenu en texte brut
            html: html || `<p>${text}</p>` // Contenu en HTML (optionnel)
        };

        let info = await transporter.sendMail(mailOptions);
        console.log("Email envoyé: " + info.response);
        return { success: true, message: "Email envoyé avec succès" };
    } catch (error) {
        console.error("Erreur d'envoi d'email: ", error);
        return { success: false, message: error.message };
    }
}