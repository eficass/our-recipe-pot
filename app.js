const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const wrapAsync = require("./utils/wrapAsync");
const Recipe = require("./models/recipe");
const AppError = require("./utils/AppError");

const app = express();

mongoose.connect("mongodb://localhost:27017/recipe-pot", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});
mongoose.set("useFindAndModify", false);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected!");
});

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
    res.render("home");
});

app.get(
    "/recipes",
    wrapAsync(async (req, res, next) => {
        const recipes = await Recipe.find({});
        res.render("recipes/index", { recipes });
    })
);

app.get("/recipes/new", (req, res) => {
    res.render("recipes/new");
});

app.post(
    "/recipes",
    wrapAsync(async (req, res, next) => {
        const recipe = new Recipe(req.body.recipe);
        await recipe.save();
        res.redirect(`/recipes/${recipe._id}`);
    })
);

app.get(
    "/recipes/:id",
    wrapAsync(async (req, res, next) => {
        const recipe = await Recipe.findById(req.params.id);
        res.render("recipes/show", { recipe });
    })
);

app.get(
    "/recipes/:id/edit",
    wrapAsync(async (req, res, next) => {
        const recipe = await Recipe.findById(req.params.id);
        res.render("recipes/edit", { recipe });
    })
);

app.put(
    "/recipes/:id",
    wrapAsync(async (req, res, next) => {
        const { id } = req.params;
        const recipe = await Recipe.findByIdAndUpdate(id, { ...req.body.recipe });
        res.redirect(`/recipes/${recipe._id}`);
    })
);

app.delete(
    "/recipes/:id",
    wrapAsync(async (req, res, next) => {
        const { id } = req.params;
        await Recipe.findByIdAndDelete(id);
        res.redirect("/recipes");
    })
);

app.all("*", (req, res, next) => {
    next(new AppError("Page not found!", 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Something went wrong";
    res.status(statusCode).render("error", { err });
});

app.listen(3000, () => {
    console.log("Serving on port 3000!");
});
