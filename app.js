import express from "express";
import expressLayouts from "express-ejs-layouts";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(expressLayouts);
app.set("layout", "layout");

app.use(express.static(path.join(__dirname, "public")));

const menuItems = path.join(__dirname, "data", "menu.json");
const menu = JSON.parse(fs.readFileSync(menuItems, "utf-8"));

const contributorData = path.join(__dirname, "data", "contributors.json");
const contributors = JSON.parse(fs.readFileSync(contributorData, "utf-8"));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Cucina Tagiliani's",
    items: [],
    css: "/css/style.css",
    js: "/js/main.js"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About This Project",
    people: contributors.people,
    css: "/css/style.css",
    js: "/js/main.js"
  });
});

app.get("/menu", (req, res) =>{
  res.render("menu", {
    title: "Menu", 
    items: menu.dishes,
    css: "/css/menu.css",
    js: "/js/menu.js"
  }); 
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
