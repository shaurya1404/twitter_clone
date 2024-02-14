const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

app.set("view engine", "ejs"); // to use ejs format files as templates
app.set("views", path.join(__dirname, "views")); // routing to views folder
app.use(express.static(path.join(__dirname, "public"))); // routing to public folder
app.use(express.urlencoded({extended: true})); // to parse new data such that it is readable by the server
app.use(methodOverride("_method")); // for all APIs to override all methods having "_method" query value 

app.listen( port, () => {
    console.log(`listening on port ${port}`)
});

let posts = [
    {
        id: uuidv4(),
        name: "Shaurya",
        username: "shaurya112",
        followers: "1.3k",
        following: "100", 
        content: "no blood, no glory, no pain, no story"
    },
    {
        id: uuidv4(),
        name: "Pubity",
        username: "pubity",
        followers: "75k",
        following: "800",
        content: "cat eats entire watermelon double her size!!"
    },
    {
        id: uuidv4(),
        name: "Lebron James",
        username: "kingjames",
        followers: "278k",
        following: "487",
        content: "the best in the game"
    }

]
app.get("/home", (req, res) => {
    res.render("index.ejs", { posts });
});
app.get("/new", (req, res) => {
    res.render("new.ejs");
});
app.post("/home", (req, res) => {
    let { name, username , followers, following, content } = req.body;
    let id = uuidv4();
    posts.push({ id, name, username , followers, following, content });
    res.redirect("/home");
});
app.delete("/home/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => p.id !== id);
    res.redirect("/home");
});
app.get("/home/:id/edit", (req,res) => {
    let { id } = req.params;
    let post = posts.find((p) => p.id === id);
    res.render("edit.ejs", { post });
});

app.patch("/home/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => p.id === id);
    post.content = newContent;
    res.redirect("/home")
});