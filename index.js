import express from "express";
import methodOverride from "method-override";

const app = express ();
const port= 3000;
var articles = [];

// app.use(express.static("public"));
app.use(express.urlencoded ({ extended : true} ));
app.use(express.static("public"));
app.use(methodOverride("_method"));

app.get("/", (req,res)=>{
    res.render ("index.ejs", {articles});
}) 

app.get("/create", (req,res) => {
    res.render ("form.ejs");
})

app.post("/create", (req,res) => {
    articles.push ({
        title : req.body["title"],
        details: req.body["details"],
        date: req.body["date"]
    })
    // res.render("index.ejs", {articles});
    res.redirect("/")

})

app.delete("/delete/:id", (req,res) => {
    const deleteIndex = req.params.id;
    if (articles[deleteIndex]){
        articles.splice(deleteIndex, 1);
    }
    res.redirect("/");
})

app.get("/edit/:id", (req,res) => {
    const updateIndex = req.params.id;
    const currentPost = articles [updateIndex];

    console.log(currentPost["date"]);
    res.render("update.ejs", {currentPost, updateIndex});
})

app.put("/edit/:id", (req,res) => {
    const updateIndex = req.params.id;

    if (articles[updateIndex]) {
        articles[updateIndex].title = req.body["title"];
        articles[updateIndex].details = req.body["details"]; // Fixed to update 'details'
        articles[updateIndex].date = req.body["date"]; // Fixed to update 'date'
    }

    res.redirect("/"); // Optional: Redirect back to home or wherever you need
})


app.listen (port, ()=>{
    console.log(`Connection successfully established. Listening on port ${port}`);
})


