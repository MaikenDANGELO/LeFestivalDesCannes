const Sponsors = require('../database/models/Sponsor');
const {callback} = require("pg/lib/native/query");

exports.getAllSponsors = async (callback) => {
    try {
        const sponsors = await Sponsors.findAll();
        callback(null, sponsors);
    } catch (error) {
        return callback(error, null);
    }
}