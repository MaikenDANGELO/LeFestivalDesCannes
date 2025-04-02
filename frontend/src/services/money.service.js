import {getRequest, postRequest} from "@/services/axios.service";



async function getTotalDons(){
    let response
    try {
        response = getTotalDonsFromAPI()
    }catch (error) {
        response = { error: 1, status: 404, data: error.message };
    }
    return response
}

async function getTotalDonsOf(prestId) {
    let response
    try {
        response =  await getTotalDonsOfFromAPI(prestId)
    }catch (error) {
        response = { error: 1, status: 404, data: error.message };
    }
    return response
}

async function makeDonation(userId, prestaId, amount, message){
    let response
    try {
        response = await makeDonationFromAPI({userId, amount, message}, prestaId)
    }catch (error) {
        response = { error: 1, status: 404, data: error.message };
    }
    return response
}

async function paidTicketService(data){
    let response
    try {
        response = await paidTicketServiceFromAPI(data)
    }catch (error) {
        response = { error: 1, status: 404, data: error.message };
    }
    return response
}


async function paidTicketServiceFromAPI(data) {
    return postRequest('/api/event/paidTicket', data, 'paidTicketService')
}

async function getTotalDonsFromAPI(){
    return getRequest('/api/prestataires/getTotalDons', 'getTotalDons')
}
async function getTotalDonsOfFromAPI(prestId){
    return getRequest('/api/prestataires/getTotalDonsOf/'+ prestId, 'getTotalDonsOf')
}

async function makeDonationFromAPI(data, prestaId){
    return postRequest('/api/prestataires/makeDonation/' + prestaId , data, 'makeDonation')
}


export default {
    getTotalDons,
    getTotalDonsOf,
    makeDonation,
    paidTicketService
}