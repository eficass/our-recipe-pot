const mongoose = require("mongoose");
const Recipe = require("../models/recipe");

mongoose.connect("mongodb://localhost:27017/recipe-pot", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected!");
});

const seedDB = async () => {
    await Recipe.deleteMany({});
    const r = new Recipe({ title: "Budin de limon" });
    await r.save();
};

seedDB().then(() => {
    mongoose.connection.close();
});
