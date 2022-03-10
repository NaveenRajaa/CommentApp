const express = require("express");
const app=express();
const {v4:uuid}=require("uuid");
const methodOverride=require("method-override");
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride("_method"))
app.set("view engine","ejs");

let comment=[
    {
        id:uuid(),
        username:"Naveen",
        com:"Hai this name is Naveen my comment is Hai"
    },
    {
        id:uuid(),       
         username:"Raja",
        com:"hai how are you"
    },
    {
        id:uuid(),
        username:"Mukil",
        com:"Poda deiS"
    },
    {
        id:uuid(),
        username:"karuphaih",
        com:"Iam a coder,web developer don't mess with me"
    }
];

app.get("/comment",(req,res)=>{
          res.render("show",{ comment })  
})


app.get("/comment/new",(req,res)=>{
    res.render("new");
})
 

app.post("/comment",(req,res)=>{
        const {username ,com}=req.body;
        comment.push({username,com,id:uuid()});
        
        res.redirect("/comment");
})

app.get("/comment/:id",(req,res)=>{
    const {id}=req.params;
    const searcComent= comment.find(c => c.id===id);
    res.render("details",{searcComent})

})


app.get("/comment/:id/edit",(req,res)=>{
    const {id}=req.params;
    const editComent= comment.find(c => c.id===id);
     res.render("edit",{editComent});
})

app.patch("/comment/:id/edit",(req,res)=>{
    const {id}=req.params;
    const updateComent= comment.find(c => c.id===id);
    const {com}=req.body;
    updateComent.com=com;
    res.redirect("/comment");

})

app.delete("/comment/:id",(req,res)=>{
    const {id}=req.params;
    comment= comment.filter(c => c.id !== id);
    
     res.redirect("/comment");
})

app.listen(3000,()=>{
    console.log(":3000 is listening");
})