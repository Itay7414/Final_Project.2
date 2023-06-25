const db = require('../../app').db;
const models_validators = require('./models_validators');


exports.Users = db.model('Users', new db.Schema({
    type: { type: String, required: true, enum: ['ADMIN', 'ARTIST', 'CUSTOMER'], immutable: true },
    username: { type: String, required: true },
    password: { type: String, required: true, minLength: 6, maxLength: 20 },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minLength: 6,
        validate: {
            validator: email => { return email.includes("@") },
            message: "user email must include '@' symbol"
        }
    }
}));

exports.Artworks = db.model('Artworks', new db.Schema({
    name: { type: String, required: true, unique: true },
    artist_id: {  // relationship to user/artist of Users
        type: db.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
        validate: {
            validator: models_validators.subObj_pathValue_validator('Users', 'type', 'ARTIST'),
            message: "artist_id is not an id of a user which is a type of ARTIST"
        }
    },
    price: { type: Number, required: true },
    description: { type: String, maxLength: 400 },
    sold: {
        type: Number,
        default: 0,
    },
}));

exports.Purchases = db.model('Purchases', new db.Schema({
    artwork_id: {  // relationship to artwork of Artworks
        type: db.Schema.Types.ObjectId,
        ref: 'Artworks',
        required: true,
        validate: {
            validator: models_validators.idValidator('Artworks'),
            message: "artwork_id is not an id of a real-existing artwork in the database"
        }
    },
    customer_id: {  // relationship to user/customer of Users
        type: db.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
        validate: {
            validator: models_validators.subObj_pathValue_validator('Users', 'type', 'CUSTOMER'),
            message: "customer_id is not an id of a user which is a type of CUSTOMER"
        }
    },
    date: { type: Date, immutable: true, default: () => new Date() }
}));

exports.Markers = db.model('Markers', new db.Schema({
    shop_name: { type: String, required: true, unique: true },
    latitude: { type: String, required: true, unique: true },
    longitude: { type: String, required: true, unique: true }
}));