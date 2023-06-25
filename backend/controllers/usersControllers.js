const db_api = require('../utils/db_utils/db_api')


exports.signIn_user = async (req, res) => {
   try {  // HTTP-body example: {"email": ..., "password": ..., "type": ...}
       await db_api.get_Item(db_api.users_model,
           {filters: {'email': req.body.email, 'password': req.body.password, 'type': req.body.type}})
           .then(users_arr => res.send(users_arr));  // users_arr is an array with 1 user object inside
   } catch (err) { res.status(400).send(err); }
}

exports.updateUser = async (req, res) => {
    try {  // HTTP-body example: {"filters": {...}, "update": {...}, "options": {...}}
        await db_api.update_Item(db_api.users_model, req.body)
            .then(update_status => res.send(update_status));
    } catch (err) { res.status(400).send(err); }
}

exports.signUp_user = async (req, res) => {
    try {  // HTTP-body example: {type: ..., username: ..., password: ..., email}
        await db_api.create_Item(db_api.users_model, {Items_arr: [req.body]})
            .then(created_user => res.send(created_user));  // created_user is an array with 1 user object inside
    } catch (err) { res.status(400).send(err); }
}

exports.allUsers = async (req, res) => {
    await db_api.get_item(db_api.users_model, {filters: {}})
        .then(users_arr => res.send(users_arr));
}