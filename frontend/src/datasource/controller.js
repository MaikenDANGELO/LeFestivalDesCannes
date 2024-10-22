import { prestataires, billetterie, utilisateurs } from "./data";
import bcrypt from 'bcryptjs';

function getAllPrestataires() {
    return { error: 0, data: prestataires };
}

function insertCommandeBillet(vue, total){
    try{
    const lastBilletterie = billetterie.length > 0 ? billetterie[billetterie.length - 1] : null;

    let newId = lastBilletterie ? lastBilletterie.id_billetterie + 1 : 1;
    let ticketQuantity = 0;
        for (let i = 0; i < vue.form.tickets.length; i++) {
            ticketQuantity += vue.form.tickets[i].quantity;
        }

    let insert = {
        "id_billetterie": newId,
        "nombre_billets": ticketQuantity,
        "prix_total": total,
        "date_achat": new Date().toISOString().split('T')[0],
        "email": vue.form.email,
    };

    // Ajouter l'objet à billetterie
    billetterie.push(insert);
    return {error: 0, status: 200}

    } catch (error) {
        console.error("Erreur lors de l'ajout de la billetterie :", error.message);
        return {error: 1, status: 404}
    }
}

async function connexion(login, mdp){
    if(!login) return {error: 1, status: 404, data: "Le login donné n'est pas valide"};
    if(!mdp) return {error: 1, status: 404, data: "Le mot de passe donné n'est pas valide"};

    let Account = utilisateurs.find(u => u.email_utilisateur === login);
    if (!Account) return {error: 1, status: 404, data: "Aucun utilisateur n'est lié à ce login"};


    try {
        const correspond = await bcrypt.compare(mdp, Account.mot_de_passe);
        if (correspond) {
            return {error: 0, status: 200, data: Account.role};
        } else {
            return {error: 1, status: 404, data: "Le mot de passe ne correspond pas"};
        }
    } catch (error) {
        console.error('Erreur lors de la vérification du mot de passe :', error);
    }
}


export default {
    getAllPrestataires,
    insertCommandeBillet,
    connexion,
};