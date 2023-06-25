const db_api = require('../utils/db_utils/db_api');
const twitterAPI = require('../utils/apis/twitterAPI');
const db_analyzes = require('../utils/db_utils/db_analyzes')


exports.createItems = async (req, res) => {
    try {  // HTTP-body example: {items_arr: [{name: ..., artist_id: ..., price: ..., description: ....}, {...}, ...]}
        const created_Items = await db_api.create_Item(db_api.Items_model, req.body)
        await twitterAPI.twitItems(req.body.Items_arr);
        res.send(created_Items);
    } catch (err) { res.status(400).send(err); }
}

exports.updateItems = async (req, res) => {
    try {  // HTTP-body example: {"filters": {...}, "update": {...}, "options": {...}}
        await db_api.update_Item(db_api.Items_model, req.body)
            .then(update_status => res.send(update_status));
    } catch (err) { res.status(400).send(err); }
}

exports.getItems = async (req, res) => {
    try {  // HTTP-body example: {"filters": {...}, "search_method": ...}
        await db_api.get_Item(db_api.Items_model_model, req.body)
            .then(Items_arr => res.send(Items_arr));
    } catch (err) { res.status(400).send(err); }
}  // filters will be sent in the http request, and all objects that satisfies this filters will send back

exports.AllSales = async (req, res) => { res.send(await db_analyzes.lastWeek_daily_sales()) }
exports.AvgSales = async (req, res) => { res.send(await db_analyzes.avg_weekly_sales().then(num => num.toString())) }
exports.AllProfits = async (req, res) => { res.send(await db_analyzes.lastWeek_daily_profit()) }
exports.AvgProfits = async (req, res) => { res.send(await db_analyzes.avg_weekly_profits().then(num => num.toString())) }