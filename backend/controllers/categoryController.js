import { v2 as cloudinary } from 'cloudinary'
import categoryModel from "../models/categoryModel.js";

//Add category
const addCategory = async (req, res) => {
    try {
        const { name, bgColor } = req.body;
        const image = req.files.image && req.files.image[0];
        if (!image) {
            return res.status(400).json({ success: false, message: "No image uploaded" });
        }
        const exists = await categoryModel.findOne({ name })
        if(exists){
            return res.json({ success: false, message: "Category already exists" });
        }
        const result = await cloudinary.uploader.upload(image.path, {
            resource_type: 'image'
        });
        const imageUrl = result.secure_url;
        const categoryData = { name, bgColor, image: imageUrl }
        const newCategory = new categoryModel(categoryData)
        const category = await newCategory.save();
        res.json({success: true, message:"Category Added"})
    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message})
    }
}
//List Category
const listCategory = async (req, res) => {
    try {
        const categories = await categoryModel.find({});
        res.json({success: true, categories})
    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message})
    }
}
//Remove Category
const removeCategory = async (req, res) => {
    try {
        await categoryModel.findByIdAndDelete(req.body.id)
        res.json({success: true, message: "Category Removed"})
    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message})
    }
}

export { addCategory, removeCategory, listCategory }