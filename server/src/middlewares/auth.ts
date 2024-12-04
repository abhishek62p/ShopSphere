import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCode } from "../exceptions/root";
import { JWT_SECRET } from "../secrets";
import * as jwt from 'jsonwebtoken'
import { prismaClient } from "../routes";

// define JWT payload type 
interface JwtPayload {
    userId: string;
}

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    // 1. extract the token from header
    const token = req.headers.authorization as string
    // 2. if token is not present, throw an error of unauthorized
    if(!token) {
        next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED))
    }
    // const token = authHeader.split(" ")[1];
    // if(!token) {
    //     return next(new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED));
    // }
    try {
        // 3. if the token is present, verfiy that token and extract the payload
        const payload = jwt.verify(token, JWT_SECRET) as JwtPayload
        // 4. to get the user form the payload
        // Convert userId to number since id is of type Int in the database
        const userId = parseInt(payload.userId, 10);
        const user = await prismaClient.user.findFirst({where: {id: userId}})
        if(!user) {
            next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED))
        }
        // 5. to attach the user to the current request object
        req.user = user as any
        next()
    } catch (error) {
        next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED))
    }
}

export default authMiddleware