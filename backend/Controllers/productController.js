const Product = require('../models/product');
async function addProduct(req, res)
{
try{ 
    const {title, description, price, stock}=req.body;
    const image = req.file ? req.file.filename : "";
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
async function getProductById(req, res)
{
    try
    {
        const product = await Product.findById(req.params.id);

        if (!product)
        {
            return res.status(404).send("Product not found!");
        }

        return res.status(200).json(product);
    }
    catch (error)
    {
        return res.status(500).send("Internal Server Error");
    }
}
async function updateProduct(req, res)
{try{  
    const {title, description, price, stock}=req.body;
    const productId = req.params.id;
    const updatedData = {
    title,
    description,
    price,
    stock
};

if (req.file) {
    updatedData.image = req.file.filename;
}

const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    updatedData,
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
    getProductById,
    updateProduct,
    deleteProduct
};