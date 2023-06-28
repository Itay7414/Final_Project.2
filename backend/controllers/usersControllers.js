const models = require('../utils/db_utils/models');
users_model = models.User;


exports.signIn = async (req, res) => {
    try {
        const { userName, password } = req.body;

        // Check if the user exists in the database
        const user = await users_model.findOne({ username: userName });
        if (!user) {
            return res.status(400).json({ exists: false, error: "User does not exist. Please sign up." });
        }

        // Compare the password using the comparePassword method
        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ exists: true, correctPassword: false, error: "Incorrect password." });
        }

        // User is authenticated, store the user ID in the session
        req.session.userId = user._id;

        // Return success response
        return res.status(200).json({ exists: true, correctPassword: true, message: "User signed in successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to sign in" });
    }
};
/*
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