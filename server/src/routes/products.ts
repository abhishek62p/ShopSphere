import { Router } from "express";
import { errorHandler } from "../schema/error-handler";
import { createProduct, deleteProducts, getProductById, listProducts, updateProducts } from "../controllers/products";
import authMiddleware from "../middlewares/auth";

const productsRoutes: Router = Router()

productsRoutes.post('/', [authMiddleware], errorHandler(createProduct))
productsRoutes.put('/:id', [authMiddleware], errorHandler(updateProducts))
productsRoutes.delete('/:id', [authMiddleware], errorHandler(deleteProducts))
productsRoutes.get('/', [authMiddleware], errorHandler(listProducts))
productsRoutes.get('/:id', [authMiddleware], errorHandler(getProductById))
export default productsRoutes