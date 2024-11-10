const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const { User, Feedback } = require("./mongodb");

const tempelatePath = path.join(__dirname, '../tempelates');
const publicDirectoryPath = path.join(__dirname, '../public');
const partialsPath = path.join(__dirname, 'partials');

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", tempelatePath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
 
app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});
app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.name,
        password: req.body.password,
    };

    await User.insertMany([data]);
    res.redirect("/");
});

app.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ name: req.body.name });
        if (!user) {
            res.send("User not found. Please sign up.");
            return;
        }

        if (user.password === req.body.password) {
            res.sendFile(path.join(publicDirectoryPath, 'page.html'));
        } else {
            res.send("Wrong password");
        }
    } catch (error) {
        console.error(error);
        res.send("An error occurred. Please try again.");
    }
});

// Route to handle feedback form submission
app.post("/contact", async (req, res) => {
    const feedback = new Feedback({
        name: req.body.name,
        message: req.body.message,
    });

    try {
        await feedback.save();
        res.render("feedback", { message: "Feedback received. Thank you!" });
    } catch (error) {
        console.error(error);
        res.render("feedback", { message: "An error occurred. Please try again." });
    }
});


// Route to view all feedbacks
app.get("/feedbacks", async (req, res) => {
    try {
        const feedbacks = await Feedback.find();
        res.json(feedbacks);
    } catch (error) {
        console.error(error);
        res.send("An error occurred. Please try again.");
    }
});

app.listen(3000, () => {
    console.log("port connected");
    console.log("Server is running on http://localhost:3000");
});

