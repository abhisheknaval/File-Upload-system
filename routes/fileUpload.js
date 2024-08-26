const {localFileUpload , imageUpload , videoUpload}=require("../controllers/fileUpload");
const express=require("express");
const router=express.Router();

router.post("/localfileupload" , localFileUpload);
router.post("/imageupload" , imageUpload);
router.post("/videoupload" , videoUpload);


module.exports=router;