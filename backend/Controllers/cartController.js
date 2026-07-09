const Cart=require('../models/cart');
const Product = require('../models/product');
const { deleteProduct } = require('./productController');


async function addToCart(req, res){
 try{
     const { customerId, productId } = req.body;
     const product=await Product.findById(productId);
     if(!product)
         { return res.status(404).send("Product not found!");}
    const cart =await Cart.findOne({ customerId });
    if(!cart)
    {
        const newCart = new Cart({
        customerId:customerId,
         totalPrice:product.price,
          items:[
            {
                productId:productId,
                quantity:1
            }
          ],
          totalItems:1
           
       });
       await newCart.save();
       return res.status(201).send("Product Added to Cart Successfully!");
    }
    const item = cart.items.find(
    item => item.productId.toString() === productId
);
    if(item)
    {
         item.quantity++;
         cart.totalItems++;
         cart.totalPrice=cart.totalPrice+product.price;
         await cart.save();
         return res.status(200).send("Product Added to Cart Successfully!");
    }
    else{
        cart.items.push({
    productId,
    quantity: 1
});
       
         cart.totalItems++;
         cart.totalPrice=cart.totalPrice+product.price;
         await cart.save();
         return res.status(200).send("Product Added to Cart Successfully!");
    }
    
    }
    catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

async function getCart(req, res){
    try{const { customerId } = req.params;
        const cart =await Cart.findOne({ customerId });
        if(cart)
     {
        return res.status(200).send(cart);

     }
     else{
        return res.status(404).send("Cart not found!");
     }
    }
    catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

async function removeFromCart(req, res){
    try{
        const { customerId, productId } = req.params;
        const cart =await Cart.findOne({ customerId });
        if(!cart)
        {
        return res.status(404).send("Cart not found!");
     }
        else 
     {
        const product=await Product.findById(productId);
         if(!product)
       { 
        return res.status(404).send("Product not found!");
    }
         else{
            const item = cart.items.find(
    item => item.productId.toString() === productId
);  
            if(!item)
            {return res.status(404).send("Product not found in cart!");}
            else if(item.quantity==1)
            {
                cart.items = cart.items.filter(
    item => item.productId.toString() !== productId
);
                cart.totalItems--;
                cart.totalPrice=cart.totalPrice-product.price;
                await cart.save();
                 return res.status(200).send("Product Deleted From Cart Successfully!");
            }
            else if(item.quantity>1){
                item.quantity--;
                cart.totalItems--;
                cart.totalPrice=cart.totalPrice-product.price;
                await cart.save();
                 return res.status(200).send("Product Deleted From Cart Successfully!");
            }
           
            
         }
     }
     
    }
    catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

async function clearCart(req, res){
    try{
        const { customerId } = req.params;
        const cart =await Cart.findOne({ customerId });
    if(cart)
    {
        
       
         cart.totalPrice=0,
          cart.items=[],
          cart.totalItems=0
           
       
       await cart.save();
       return res.status(200).send("Cart cleared Successfully!");
    }
     else{
        return res.status(404).send("Cart not found!");
     }
    }
    catch (error) {
        res.status(500).send("Internal Server Error");
    }
}
module.exports=
{
    addToCart,
     getCart,
     removeFromCart,
     clearCart

};