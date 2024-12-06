import { Request, Response } from "express";
import { AddressSchema } from "../schema/user";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { User } from "@prisma/client";
import { prismaClient } from "../routes";

export const addAddress = async (req: Request, res: Response) => {
    AddressSchema.parse(req.body)
    let user: User;
    try {
        user = await prismaClient.user.findFirstOrThrow({
            where:{ id: req.body.userId}
        })
    } catch (error) {
        throw new NotFoundException('User not Found', ErrorCode.USER_NOT_FOUND)
    }
    const address = await prismaClient.address.create({
        data: {
            ...req.body,
            user: user.id
        }
    })
}

export const deleteAddress = async (req: Request, res: Response) => {

}

export const listAddress = async (req: Request, res: Response) => {

}