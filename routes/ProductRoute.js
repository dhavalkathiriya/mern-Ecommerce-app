import express from 'express'
import { AllProduct, CreateProduct, SingleProduct, searchProduct } from '../controller/ProductController';


const ProductRoute =express.Router()

ProductRoute.post("/",CreateProduct)
ProductRoute.get("/",AllProduct)
ProductRoute.get("/:id",SingleProduct)
ProductRoute.get("/search/:key",searchProduct)

export default ProductRoute;