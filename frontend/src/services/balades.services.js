import LocalSource from "@/datasource/controller";

async function getAllbaladesFromLocalSource() {
    return LocalSource.getAllbalades();
}

async function getbaladesfromUid(user_id){
    try {
        let balades = await getAllbaladesFromLocalSource();
        let baladesUtilisateur = balades.filter(balade => balade.reserved_user_id === user_id);

        return { error: 0, status: 200, data: baladesUtilisateur }
    }
    catch (error){
        return {error:1,status:404,data : error.message}
    }
}

async function getAllBalades() {
    let response;
    try {
        response = await getAllbaladesFromLocalSource();
        //console.log('Balades' + response.data);
    } catch (error) {
        return {error: 1, status: 404, data: 'Erreur de récupération des balades'}
    }
    return response;
}


async function reservebalade(balade_id, user_id){
    let response;
    try {
        response = await LocalSource.reservebalade(balade_id, user_id);
        console.log('reservation pour la balade ' + balade_id + ' par l\'utilisateur ' + user_id + response.data);
    }
    catch (error){
        return {error:1,status:404,data : error.message}
    }
    return response;
}

async function cancelbalade(balade_id, user_id){
    let response;
    try {
        response = await LocalSource.cancelBaladeReservation(balade_id, user_id);
    }
    catch (error){
        return {error:1,status:404,data : error.message}
    }
    console.log('Annulation : ' + response)
    return response;
}


export default {
    getbaladesfromUid,
    getAllBalades,
    reservebalade,
    cancelbalade
}