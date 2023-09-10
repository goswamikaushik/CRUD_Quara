const express = require("express");
const app = express();
const port = 8080;
const path = require("path");

//require method-override
const methodOverride = require("method-override");


//require uuid package
const {v4 : uuidv4 } = require("uuid");
// we are adding this package and make function uuidv4

app.use(express.urlencoded({extended : true }));
app.use(methodOverride("_method"));

//set view engine for ejs files
app.set("view engine", "ejs");

//for access views folder for ejs fils
app.set("views", path.join(__dirname, "views"));

//for access static js, css files
app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id : uuidv4(),
        username : "apnacollege",
        content :"Object-Oriented Programming (OOP) is a programming paradigm based on the concept of objects, which are instances of classes. It promotes the organization of code into reusable and self-contained units (objects) that encapsulate both data and behavior. OOP principles include encapsulation, inheritance, polymorphism, classes, and objects, enabling modular and structured software development."
    },
    {
        id : uuidv4(),
        username : "Kaushik",
        content :" callback is a function or piece of code that is passed as an argument to another function, and it is expected to be executed at a later time. Callbacks are commonly used in programming to enable asynchronous or event-driven behavior, allowing you to define what should happen when a specific event or task is completed. Callbacks are a fundamental concept in many programming languages and are often used in scenarios like handling user input, responding to network requests, or managing timers and events."
    },
    {
        id : uuidv4(),
        username : "Manav",
        content :"An arrow function, also known as a fat arrow function, is a concise way to write functions in JavaScript. It was introduced in ECMAScript 6 (ES6) and provides a more compact syntax compared to traditional function expressions. Arrow functions are particularly useful for writing short, anonymous functions or for functions where the value of this is important."
    },
];

app.get("/posts", (req, res) => {
    res.render("index.ejs", {posts});//also send our data with index.ejs file .
});


app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});


app.post("/posts", (req, res) => {
    let {username, content } = req.body;
    let id = uuidv4();
    posts.push({ id,username, content });
    res.redirect("/posts");
});


app.get("/posts/:id", (req, res) => {
   let {id} = req.params;
   let post = posts.find((p) => id === p.id);
    res.render("show.ejs", {post : post});
 });


app.patch("/posts/:id", (req, res) => {
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    res.redirect("/posts")
})

app.get("/posts/:id/edit", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", {post});
});

app.delete("/posts/:id", (req, res) => {
    let {id} = req.params;
     posts = posts.filter((p) => id != p.id);
    res.redirect("/posts")
});

app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});