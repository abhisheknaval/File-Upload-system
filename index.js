const express =require("express");
const app=express();
const dbConnect=require("./config/database");
dbConnect();

const expressFileUpload=require("express-fileupload");
app.use(expressFileUpload({
     useTempFiles : true,
    tempFileDir : '/tmp/'
}));

const cloudinary=require("./config/cloudinary");
cloudinary.cloudinaryConnect();

app.use(express.json());
require("dotenv").config();
const Port=process.env.PORT;

const fileUpload=require("./routes/fileUpload");

app.use("/api/v1" , fileUpload);  //middelware












app.listen(Port , ()=>{
    console.log(`server started at ${Port} `)
})