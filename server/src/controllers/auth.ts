import { NextFunction, Request, Response } from "express"
import { prismaClient } from "../routes";
import { compareSync, hashSync } from 'bcrypt' 
import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../secrets";
import { BadRequestsException } from "../exceptions/bad_request";
import { ErrorCode } from "../exceptions/root";
import { UnprocessableEntity } from "../exceptions/validatation";
import { SignupSchema } from "../schema/user";
import { NotFoundException } from "../exceptions/not-found";
import { UnauthorizedException } from "../exceptions/unauthorized";

export const signup = async (req:Request, res:Response, next: NextFunction) => {
    try {
        SignupSchema.parse(req.body)
        const {email, password, name} = req.body;
    
        let user = await prismaClient.user.findFirst({ where: {email}}) 
        if(user) {
            next(new BadRequestsException('User already exists!', ErrorCode.USER_ALREADY_EXISTS))
        }
        user = await prismaClient.user.create({
            data: {
                name,
                email,
                password: hashSync(password, 10)
            }
        })
        res.json(user)   
    } catch (error:any) {
           next(new UnprocessableEntity(error?.issue, 'Unprocessable entity', ErrorCode.UNPROCESSABL_ENTITY))
    }
}

export const login = async (req:Request, res: Response, next: NextFunction) => {
    const {email, password} = req.body;

    try {
        const user = await prismaClient.user.findFirst({where: {email}})

        if(!user) {
            return next(new NotFoundException('User does not exists!', ErrorCode.USER_NOT_FOUND))
        }
        console.log('terst-1', user)
        const isValidPassword = compareSync(password, user.password);
        if(!isValidPassword){
            return next(new BadRequestsException('Incorrect Password', ErrorCode.INCORRECT_PASSWORD))
        }
        const token = jwt.sign({
            userId: user.id
        }, JWT_SECRET)

        console.log(token)
        res.status(200).json({
            message: 'Login successful',
            user, 
            token,
        })
    } catch (error) {
        res.json({
            msg: 'server error'
        })
    }
}

export const me = async (req: Request, res: Response) => {
    console.log(req.user)
}