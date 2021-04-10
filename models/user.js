const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "Username required!"],
    },
    hash: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, "Email required!"],
    },
    favoriteRecipes: [
        {
            type: Schema.Types.ObjectId,
            ref: "Recipe",
        },
    ],
    createdDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
