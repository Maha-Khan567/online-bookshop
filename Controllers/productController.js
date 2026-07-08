const Product = require('../models/product');
async function addProduct(req, res)
{
try{ 
    const {title, description, price, stock}=req.body;
    const image = req.file ? req.file.path : "";
    const product = await Product.findOne({ title: title})
      
    if(!product)
       { const newProduct = new Product({
        title:title,
         description:description,
          price :price,
          stock:stock,
           image: image
           
       });
       await newProduct.save();
       return res.status(200).send("Product Added Successfuly!");
        }
    else{
        
        product.stock += Number(stock);
        await product.save();
        return res.status(200).send("Product Added Successfully!");
    }
}
catch (error) {
    console.log(error);
        res.status(500).send("Internal Server Error");
      
     
    }
    


}

async function getAllProducts(req, res)
{try{

    const products = await Product.find({ })
     return res.status(200).json(products);//json instead of send to specify 

}
catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

async function updateProduct(req, res)
{try{  const {title, description, price, stock, image}=req.body;
    const itemId = req.params.id;
    const updatedProduct=await  Product.findByIdAndUpdate(itemId   ,
    {
        title,
        description,
        price,
        stock,
        image
    },
    { new: true }
    );
    if (updatedProduct)
    {
        return res.status(200).send("Product Updated Successfully!");
    }
    else{
        return res.status(404).send("Product not found!");
    }
}
catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

async function deleteProduct(req, res)
{try{
   
    const itemId = req.params.id;
    const deletedProduct=await  Product.findByIdAndDelete (itemId );
    if (deletedProduct)
    {
        return res.status(200).send("Product Deleted Successfully!");
    }
    else{
        return res.status(404).send("Product not found!");
    }
}
catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    addProduct,
    getAllProducts,
    updateProduct,
    deleteProduct
};