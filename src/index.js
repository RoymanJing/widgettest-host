import "babel-polyfill"
import express from 'express'
import Controller from './controller.js'
//var express = require('express')
const app = express();
const router = express.Router();
const path = __dirname + "/views/";

app.use(express.static('public'))
app.use("/",router);
  
router.get("/",async (req, res) => {
  //res.sendFile(path + "index.html");
  let controller = new Controller();
  let content = await controller.render();
  res.send(content)
});
  
router.get("/product",function(req, res){
  res.sendFile(path + "product.html");});
  
router.get("/about",function(req, res){
  res.sendFile(path + "about.html");
});
  
app.use("*",function(req, res){
  res.send("Error 404: Not Found!");
});
  
app.listen(3000,function(){
  console.log("Server running at Port 3000");
});