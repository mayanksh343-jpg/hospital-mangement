import express from "express";

const app=express();

app.get("/net",(req,res)=>{
    res.send("hello world");
});


export default app;