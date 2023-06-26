const models = require('../utils/db_utils/models');
users_model = models.User;

/*
exports.signIn_user = async (req, res) => {
    try {  // HTTP-body example: {"email": ..., "password": ..., "type": ...}
        await db_api.get_Item(db_api.users_model,
            { filters: { 'email': req.body.email, 'password': req.body.password, 'type': req.body.type } })
            .then(users_arr => res.send(users_arr));  // users_arr is an array with 1 user object inside
    } catch (err) { res.status(400).send(err); }
}

exports.updateUser = async (req, res) => {
    try {  // HTTP-body example: {"filters": {...}, "update": {...}, "options": {...}}
        await db_api.update_Item(db_api.users_model, req.body)
            .then(update_status => res.send(update_status));
    } catch (err) { res.status(400).send(err); }
}
*/
exports.signUp_user = async (req, res) => {
    console.log("Inside of Sign_UP");
    try {
        const { name, email, password } = req.body;
        console.log(name);
        console.log(email);
        console.log(password);

        await users_model.create({
            name: name,
            email: email,
            password: password
        });

        console.log("User created");
        res.status(200).json({ message: "User created successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to create user" });
    }
};
/*
exports.allUsers = async (req, res) => {
    await db_api.get_item(db_api.users_model, { filters: {} })
        .then(users_arr => res.send(users_arr));
}
*/