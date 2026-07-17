const Cart=require('../models/cart');
const Order = require('../models/order');
async function placeOrder(req,res)
{try{
const { customerId } = req.body;
const cart=await Cart.findOne({customerId});
if(!cart)
    {
    return res.status(404).send("Cart not found!");
}

if (cart.totalItems === 0)
{
 return res.status(400).send("Cart is empty!");
}
const newOrder = new Order({
    customerId: cart.customerId,
    items: cart.items,
    totalPrice: cart.totalPrice,
    totalItems: cart.totalItems
   
});
 await newOrder.save();

cart.totalPrice = 0;
cart.totalItems = 0;
cart.items = [];
await cart.save();
return res.status(201).send("Order Saved Successfuly!");


}
catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

async function getCustomerOrders(req,res)
{try{
    const { customerId } = req.params;

const orders = await Order.find({ customerId }).populate("items.productId");

if (orders.length === 0) {
    return res.status(404).send("No orders found!");
}

return res.status(200).json(orders);
}
catch (error) {
        res.status(500).send("Internal Server Error");
    }

}

async function getAllOrders(req,res)
{
try{
    const orders = await Order.find({}).populate("customerId").populate("items.productId");
    if (orders.length === 0) {
    return res.status(404).send("No orders found!");
}
    return res.status(200).json(orders);
}
catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

async function updateOrderStatus(req,res)
{
try{
     const {status}=req.body;
      const { orderId } = req.params;
      const order = await Order.findById(orderId);
      if (!order) {
    return res.status(404).send("Order not found!");
}
      const validStatus = ["Pending", "Shipped", "Delivered", "Cancelled"];
      if (!validStatus.includes(status)) {
    return res.status(400).send("Invalid order status!");
}
    
    if (
    order.status !== "Delivered"
    &&
    status === "Delivered"
    )
    {
        for (const item of order.items)
           {
         const product = await Product.findById(item.productId);
         if(product)
            {
         product.stock -= item.quantity;
         await product.save();
           }

           }
            
    }
   order.status = status;
   await order.save();
   return res.status(200).send("Order Status Updated Successfully!");

   
}
catch (error) {
        res.status(500).send("Internal Server Error");
    }
}
module.exports = {
   placeOrder,getCustomerOrders,getAllOrders,updateOrderStatus
};


