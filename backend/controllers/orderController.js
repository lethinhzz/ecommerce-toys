import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'

//Placing order using COD method
const placeOrder = async (req, res) => {
    try {
        const { userID, items, amount, address, paymentMethod } = req.body;
        const orderData = {
            userID, 
            items, 
            amount, 
            address,
            paymentMethod,
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userID, {cartData: {}})
        res.json({success: true, message: "Order Placed"})
        
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}
//All order data for Admin Panel
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({success: true, orders})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}
//User order data for Frontend
const userOrders = async (req, res) => {
    try {
        const { userID } = req.body;
        const orders = await orderModel.find({ userID })
        res.json({success: true, orders})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}
//Update order status from Admin Panel
const updateStatus = async (req, res) => {
    try {
        const { orderID, status } = req.body;
        await orderModel.findByIdAndUpdate(orderID, { status })
        res.json({success: true, message: 'Status updated'})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

export { placeOrder, allOrders, userOrders, updateStatus }