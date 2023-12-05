import express from "express";
import bodyParser from "body-parser";
import * as fs from 'fs'
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000 || process.env.PORT;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

var posts=
    {
        "Day-1": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
       ,
       "Day-2": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
       ,
       "Day-3": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
       ,

};

app.get("/", (req, res)=>{
    res.render("index.ejs" , {posts:posts});
});
app.get("/home", (req, res)=>{
    res.render("index.ejs" , {posts:posts});
});
app.get("/about", (req, res)=>{
    res.render("about.ejs");
});
app.get("/create", (req, res)=>{
    res.render("create.ejs");
});
app.get("/post", (req, res)=>{
    var title = req.query.title;
    var content = posts[title];
    res.render("posts.ejs" , {title: title, content: content});
})
app.post("/submit" , (req, res)=>{
    var title = req.body.title;
    var content = req.body.content;
    if(title in posts){
        res.render("create.ejs" ,{});
    }
    else{
        posts[title] = content;
        res.render("posts.ejs",{
            title:title ,
            content :content
        });
    }

});
app.get("/delete" , (req, res) => {
    let title = req.query.title;
    delete posts[title];
    res.render("index.ejs" , {posts:posts});
})
app.get("/edit" , (req, res) => {
    var title = req.query.title;
    var content = posts[title];
    res.render("edit.ejs" , {title: title, content: content});
});
app.post("/save-changes" , (req, res) => {
    var oldTitle = req.query.oldTitle;
    delete posts[oldTitle];
    var title = req.body.title;
    var content = req.body.content;
    posts[title] = content;
        res.render("posts.ejs",{
            title:title ,
            content :content
        });
});


app.listen(port , ()=>{
    console.log(`Server is running on port ${port}`);
});