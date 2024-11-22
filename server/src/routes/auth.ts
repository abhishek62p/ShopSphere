import { Router } from "express";
import { signup } from "../controllers/auth";
import { sign } from "crypto";

const authRoutes:Router = Router()

authRoutes.post('/signup', signup)

export default authRoutes