const mongoose = require("mongoose");
const { Schema } = mongoose;

const RecipeSchema = new Schema({
    title: {
        type: String,
        required: [true, "Recipe must have a name"],
    },
    recipe: {
        type: String,
        required: [true, "Recipe must have a description"],
    },
    // ingredients: [
    //     {
    //         ingredient: {
    //             type: Schema.Types.ObjectId,
    //             ref: "Ingredient",
    //         },
    //         quantity: {
    //             type: Number,
    //         },
    //         quantityUnit: {
    //             type: String,
    //         },
    //     },
    // ],
    // creator: {
    //     type: Schema.Types.ObjectId,
    //     ref: "User",
    // },
    // createdDate: {
    //     type: Date,
    //     default: Date.now,
    // },
});

module.exports = mongoose.model("Recipe", RecipeSchema);
