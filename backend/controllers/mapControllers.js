const db_api = require('../utils/db_utils/db_api')
const weatherAPI = require('../utils/apis/weatherAPI');


// exports.getMarkers = (req, res) => {
//     db_api.get_item(db_api.markers_model, {filters: {}})
//         .then(markers => res.send(markers));
// }

exports.route_weather_test = async (req, res) => {  // for testing only!!!!
    try {
        await weatherAPI.get_data(req.body)
            .then(weather_data => res.send(weather_data));
    } catch (err) { res.status(400).send(err); }
}