require("dotenv").config()
const bodyParser = require("body-parser")
const express = require("express")
const { Db } = require("mongodb")
const app =express()
const mongoose =require("mongoose")
app.set("view engine","ejs")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))
const connectDB = async () => {
    try {  
      const conn = await mongoose.connect(process.env.MONGO);
      console.log("zx");
    } catch (error) {
      console.log(error);
      process.exit(1);
    } 
  }
  const Item =mongoose.model("items",{
    mission:String
  })
  const Itemwork =mongoose.model("itemsWork",{
    mission:String
  })
  // const item =new Item({
  //   mission:"ads"
  // }) 
  // item.save()

app.get("/",(req,res)=>{
  Item.find({}).then((items)=>{
    res.render("index",{listTitle:"home",items:items})
  })
})
app.get("/work",(req,res)=>{
  Itemwork.find({}).then((items)=>{
    res.render("index",{listTitle:"work",items:items})
  })
})

app.post("/add",(req,res)=>{
  const itema =req.body.mission
  const where =req.body.list
  console.log(where)
  if(where=="home"){
  console.log(itema)
const item =new Item({
  mission:itema
})
item.save();
  }else{
    const item =new Itemwork({
      mission:itema
    })
    item.save();    
  }
res.redirect("/")
})

app.post("/delete",(req,res)=>{
  const xc =req.body.xx
  Item.findByIdAndDelete(xc).then((me)=>{
    if (me==null){
      Itemwork.findByIdAndDelete(xc).then(()=>{
             res.redirect("/work")
            })}else{
      res.redirect("/")}
            })
          })
  
 

connectDB().then(() => {
    app.listen( process.env.PORT||3000, () => {
        console.log("listening for requests");
    })
})
