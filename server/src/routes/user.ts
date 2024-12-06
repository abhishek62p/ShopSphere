import { Router } from "express";
import { errorHandler } from "../schema/error-handler";
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";
import { addAddress, deleteAddress, listAddress } from "../controllers/user";

const userRoutes:Router = Router();

userRoutes.post('/address', [authMiddleware, adminMiddleware], errorHandler(addAddress))
userRoutes.delete('/address/:id',[authMiddleware, adminMiddleware], errorHandler(deleteAddress))
userRoutes.get('/address', [authMiddleware, adminMiddleware], errorHandler(listAddress))

export default userRoutes