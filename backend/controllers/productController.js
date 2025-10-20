import { v2 as cloudinary } from 'cloudinary'
import productModel from '../models/productModel.js';

//Add product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, bestseller } = req.body;

        const image = req.files.image && req.files.image[0];
        if (!image) {
            return res.status(400).json({ success: false, message: "No image uploaded" });
        }

        // Upload ảnh lên Cloudinary
        const result = await cloudinary.uploader.upload(image.path, {
            resource_type: 'image'
        });
        const imageUrl = result.secure_url;

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            bestseller: bestseller === "true" ? true : false,
            image: imageUrl,
            date: Date.now()
        }
        

        const product = new productModel(productData);
        await product.save()

        res.json({success: true, message:"Product Added"})
    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message})
    }
}
//List product
const listProduct = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({success: true, products})
    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message})
    }
}
//Remove product
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success: true, message: "Product Removed"})
    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message})
    }
}
//single product
const singleProduct = async (req, res) => {
    try {
        const { productID } = req.body;
        const product = await productModel.findById(productID)
        res.json({success: true, product})
    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message})
    }
}

export { addProduct, listProduct, removeProduct, singleProduct }