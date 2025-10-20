import userModel from "../models/userModel.js";

//Add products to user cart
const addToCart = async (req, res) => {
    try {
        const { userID, itemID, quantity } = req.body
        const userData = await userModel.findById(userID)
        let cartData = await userData.cartData 

        if(cartData[itemID]){
            cartData[itemID] += quantity
        }else{
            cartData[itemID] = {}
            cartData[itemID] = quantity
        }

        await userModel.findByIdAndUpdate(userID, {cartData})

        res.json({ success: true, message: "Added To Cart"})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}
//update user cart
const updateCart = async (req, res) => {
    try {
        const { userID, itemID, quantity }  = req.body;
        const userData = await userModel.findById(userID)
        let cartData = await userData.cartData 
        cartData[itemID] = quantity

        await userModel.findByIdAndUpdate(userID, {cartData})
        res.json({ success: true, message: "Cart Updated"})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}
//remove products to user cart
const getUserCart = async (req, res) => {
    try {
        const { userID } = req.body
        const userData = await userModel.findById(userID)
        let cartData = await userData.cartData 

        res.json({ success: true, cartData })
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

export {addToCart, updateCart, getUserCart}