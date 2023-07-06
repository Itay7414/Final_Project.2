const models = require('../utils/db_utils/models');
const Item = models.Item;

exports.createItems = async (req, res) => {
    try {
        const { type, name, image, price } = req.body;
        const newItem = new Item({ type, name, image, price });
        const createdItem = await newItem.save();
        res.status(200).json(createdItem);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


// exports.getItemsByType = async (req, res) => {

//     try {
//         const itemType = req.query.type;
//         const Items_arr = await Item.find({ type: itemType }).exec();
//         console.log(Items_arr);
//         res.send(Items_arr);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Failed to retrieve items by type" });
//     }
// };
exports.getItemsByType = async (req, res) => {
    try {
      const itemType = req.query.type;
      const items = await Item.find({ type: itemType }).exec();
      res.render('fruits', { items });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to retrieve items by type" });
    }
  };


exports.getItemByName = async (req, res) => {
    try {
        const itemName = req.query.name;
        const item = await Item.findOne({ name: itemName }).exec();

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.json(item);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to retrieve item by name" });
    }
};



exports.getItems = async (req, res) => {
    try {

        // HTTP-body example: {"filters": {...}, "search_method": ...}
        const Items_arr = await Item.find();
        console.log(Items_arr);
        res.send(Items_arr);
    } catch (err) {
        res.status(400).send(err);
    }
} // filters will be sent in the http request, and all objects that satisfies this filters will send back

// exports.AllSales = async (req, res) => { res.send(await db_analyzes.lastWeek_daily_sales()) }
// exports.AvgSales = async (req, res) => { res.send(await db_analyzes.avg_weekly_sales().then(num => num.toString())) }
// exports.AllProfits = async (req, res) => { res.send(await db_analyzes.lastWeek_daily_profit()) }
// exports.AvgProfits = async (req, res) => { res.send(await db_analyzes.avg_weekly_profits().then(num => num.toString())) }