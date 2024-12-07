import { NextFunction, Request, Response } from "express";
import { AddressSchema } from "../schema/user";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { User } from "@prisma/client";
import { prismaClient } from "../routes";

export const addAddress = async (req: Request, res: Response, next: NextFunction) => {
    AddressSchema.parse(req.body);

    const address = await prismaClient.address.create({
        data: {
            ...req.body,
            userId: req.user.id
        }
    })
    console.log(address)
    res.json({
        msg: "Address Created successfully",
        address: address
    })
}

export const deleteAddress = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const addressId = +req.params.id
        const deletedAddress = await prismaClient.address.delete({
            where: {
                id: addressId
            }
        })
        console.log(deletedAddress)
        res.json({
            success: true
        })
    } catch (error) {
        next(new NotFoundException('Address not Found', ErrorCode.ADDRESS_NOT_FOUND))
    }

}

export const listAddress = async (req: Request, res: Response) => {
    const address = prismaClient.address.findMany({
        where: {
            userId: req.user.id
        }
    })
    console.log("hiii1",address)
    res.json({
        msg: "list of address",
        addresses: address
    })
}