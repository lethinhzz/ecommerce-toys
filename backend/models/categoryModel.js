import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, require: true }, 
    bgColor: {type: String, require: true }
})

const categoryModel = mongoose.models.category || mongoose.model("category", categorySchema);

export default categoryModel;