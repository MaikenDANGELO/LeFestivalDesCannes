import { prestataires, billetterie } from "./data";
function getAllPrestataires() {
    return { error: 0, data: prestataires };
}

function insertBillet(vue, total){
    try{
    const lastBilletterie = billetterie.length > 0 ? billetterie[billetterie.length - 1] : null;

    let newId = lastBilletterie ? lastBilletterie.id_billetterie + 1 : 1;

    let insert = {
        "id_billetterie": newId,
        "nombre_billets": vue.form.ticketQuantity,
        "prix_total": total,
        "date_achat": new Date().toISOString().split('T')[0],
    };

    // Ajouter l'objet à billetterie
    billetterie.push(insert);
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