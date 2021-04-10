const mongoose = require("mongoose");
const { Schema } = mongoose;

const IngredientSchema = new Schema({
    name: {
        type: String,
        required: [true, "Ingredient must have a name"],
    },
    alcoholic: {
        type: Boolean,
    },
    description: {
        type: String,
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Ingredient", IngredientSchema);
