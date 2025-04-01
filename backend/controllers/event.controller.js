const eventService = require('../services/event.service');

exports.paidTickets = async (req, res) => {
    const {form, total} = req.body
    await eventService.paidTicketsService(form, total, (error, data) => {
        if (error) {
            return res.status(500).json({
                error: 1,
                data: "Database connection error"
            })
        }
        return res.status(200).json({
            error: 0,
            data: data
        })
    })
}
