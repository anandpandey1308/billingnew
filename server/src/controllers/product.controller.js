import Product from '../models/product.schema.js'
import asyncHandler from '../services/asyncHandler.js'
import CustomError from '../services/CustomError.js'


export const createProduct = asyncHandler( async(req, res) => {
    const { name, quantity, price  } = req.body

    if (!name || !quantity || !price) {
        throw new CustomError("All field are required",400)
    }

    const product = await Product.create({
        name,
        quantity,
        price
    })

    if (!product) {
        throw new CustomError("Product was not added",400)
    }

    res.status(200).json({
        success: true,
        message: `Product ${product.name} added successfully`,
        product
    })
})


export const getProducts = asyncHandler( async (req,res) => {
    const products = await Product.find();
  
    if(!products){
        throw new CustomError('Product not found',404)
    }
  
    res.status(200).json({
        success: true,
        products
    })
  })