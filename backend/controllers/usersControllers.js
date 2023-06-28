const models = require('../utils/db_utils/models');
users_model = models.User;
//const User = models.User;

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
exports.signUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if a user with the same username already exists
        const existingUser = await users_model.findOne({ username: username });
        if (existingUser) {
            return res.status(400).json({ error: "Username is already taken" });
        }

        // Create a new user
        await users_model.create({
            username: username,
            email: email,
            password: password
        });

        console.log("User created");
        return res.status(200).json({ message: "User created successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to create user" });
    }
};
/*
exports.allUsers = async (req, res) => {
    await db_api.get_item(db_api.users_model, { filters: {} })
        .then(users_arr => res.send(users_arr));
}
*/