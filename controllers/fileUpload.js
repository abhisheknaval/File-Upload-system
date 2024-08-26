const { findSourceMap } = require("module");
const File=require("../models/fileModel");
const fileModel = require("../models/fileModel");
const cloudinary=require("cloudinary").v2;

exports.localFileUpload=async (req,res)=>{

    try{
    const file=req.files.file;
    console.log("file is :- " , file);
    const path=__dirname +"/files/" +Date.now() + `.${file.name.split(".")[1]}` ;
    file.mv(path , (err)=>{
        console.log(err);
    })
    res.json({
        success:true,
        message:"uploaded successfully",
    })
    }
    catch(err){
        console.log(err);
    }
};

function isFileTypeSupported(type, supportedTypes){
    return supportedTypes.includes(type);
}


async function uploadFileToCloudinary(file , folder){
    const options={folder}
    options.resource_type="auto";
  return await cloudinary.uploader.upload(file.tempFilePath , options );
}



exports.imageUpload=  async (req, res)=>{
try{
const {name , tags ,email }=req.body;
// console.log(name , tags , email );
// 
const file=req.files.file;
// console.log(file);

//validation
const supportedTypes=["jpg" , "jpeg" , "png"];
const fileType=file.name.split(".")[1].toLowerCase();

if(!isFileTypeSupported(fileType ,supportedTypes))
{
    return res.json({success:false,
        message:"file type not supported",
    })
}


const response=await uploadFileToCloudinary(file , "mydatabase")
// console.log(response);
const fileData=await fileModel.create({
    name,
    tags,
    email,
    imageUrl:response.secure_url
})
// console.log(fileData);



res.json({
    success:true,
    message:"file uploaded successfully"
})
}
catch(err)
{
    res.json({
        success:false
    })
    console.log(err);
}
};


exports.videoUpload=async(req, res)=>{
    try{
const {name , email , tags}=req.body;
const file=req.files.file;
// console.log(file);

const supportedTypes=["mp4" , "mov" ];
const fileType=file.name.split(".")[1].toLowerCase();

if(!isFileTypeSupported(fileType ,supportedTypes))
{
    return res.json({success:false,
        message:"file type not supported",
    })
}

const response=await uploadFileToCloudinary(file, "mydatabase")
// console.log(response);
const fileData=await fileModel.create({
    name,
    tags,
    email,
    imageUrl:response.secure_url
})

res.json({success:true})
 
    }
    catch(err){
        res.status(401).json({
            success:false,
            message:"something went wrong"
        })
        console.log(err);
    }
}