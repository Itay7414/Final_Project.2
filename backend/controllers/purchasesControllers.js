const db_api = require('../utils/db_utils/db_api');


exports.createPurchases = async (req, res) => {
    try {  // HTTP-body example: {items_arr: [{arkwork_id: ..., customer_id: ...}, {...}, ...]}
        const created_purchases = await db_api.create_Item(db_api.purchases_model, req.body)
        for (const purchase of created_purchases) {
            await db_api.get_Item(db_api.artworks_model,
                {filters: {_id: purchase.artwork_id}, search_method: 'findOne'})
                .then(artwork => {artwork.sold++; artwork.save();});
        }
        res.send(created_purchases);
    } catch (err) { res.status(400).send(err); }
}

exports.updatePurchases = async (req, res) => {
    try {  // HTTP-body example: {"filters": {...}, "update": {...}, "options": {...}}
        await db_api.update_Item(db_api.purchases_model, req.body)
            .then(update_status => res.send(update_status));
    } catch (err) { res.status(400).send(err); }
}

exports.getPurchases = async (req, res) => {
    try {  // HTTP-body example: {"filters": {...}, "search_method": ...}
        await db_api.get_Item(db_api.purchases_model, req.body)
            .then(purchases_arr => res.send(purchases_arr));
    } catch (err) { res.status(400).send(err); }
}  // filters will be sent in the http request, and all objects that satisfies this filters will be sent back