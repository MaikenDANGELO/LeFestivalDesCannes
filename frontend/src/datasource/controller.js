import { prestataires, billetterie } from "./data";
function getAllPrestataires() {
    return { error: 0, data: prestataires };
}

function insertBillet(vue, total){
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
        console.log(billetterie)
    return {error: 0, status: 200}

    } catch (error) {
        console.error("Erreur lors de l'ajout de la billetterie :", error.message);
        return {error: 1, status: 404}
    }


}

export default {
    getAllPrestataires,
    insertBillet,
};