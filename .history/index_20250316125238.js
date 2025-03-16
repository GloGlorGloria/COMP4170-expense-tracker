import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// Middleware
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Temporary in-memory storage (Replace with PostgreSQL later)
let expenses = [];

// Route to display expenses (GET)
app.get("/", (req, res) => {
    expenses.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.render("index", { expenses });
});

// Route to add an expense (POST)
app.post("/add", (req, res) => {
    const { description, amount, category, date } = req.body;
    expenses.push({ 
        id: Date.now(), description, amount, category, date });
    res.redirect("/");
});

// Route to delete an expense (POST)
app.post("/delete/:id", (req, res) => {
    const id = parseInt(req.params.id);
    expenses = expenses.filter(expense => expense.id !== id);
    res.redirect("/");
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

