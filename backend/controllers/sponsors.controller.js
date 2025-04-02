const sponsorsService = require('../services/sponsors.services');

exports.getAllSponsors = async (req, res) => {
    await sponsorsService.getAllSponsors((error, data) => {
        if (error) {
            return res.status(500).send(error);
        }
        return res.status(200).json({error:0, data: data});
    });
}