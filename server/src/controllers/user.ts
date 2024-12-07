import { NextFunction, Request, Response } from "express";
import { AddressSchema, UpdateSchema } from "../schema/user";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { Address, User } from "@prisma/client";
import { prismaClient } from "../routes";
import { BadRequestsException } from "../exceptions/bad_request";

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

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    const validatedData = UpdateSchema.parse(req.body)
    let shippingAddress: Address
    let billingAddress: Address
    if (validatedData.defaultShippingAddress) {
        try {
            shippingAddress = await prismaClient.address.findFirstOrThrow({
                where: {
                    id: validatedData.defaultShippingAddress
                }
            })
            if(shippingAddress.userId != req.user.id) {
                throw new BadRequestsException('Address does not belong to user', ErrorCode.ADDRESS_DOES_BELONG)
            }
        } catch (error) {
            next(new NotFoundException('Address not Found', ErrorCode.ADDRESS_NOT_FOUND))
        }
    }
    if (validatedData.defaultBillingAddress) {
        try {
            billingAddress = await prismaClient.address.findFirstOrThrow({
                where: {
                    id: validatedData.defaultBillingAddress
                }
            })
            if(billingAddress.userId != req.user.id) {
                throw new BadRequestsException('Address does not belong to user', ErrorCode.ADDRESS_DOES_BELONG)
            }
        } catch (error) {
            next(new NotFoundException('Address not Found', ErrorCode.ADDRESS_NOT_FOUND))
        }
    }
    const updatedUser = await prismaClient.user.update({
        where: { id: req.user.id } 
        data: validatedData
    })
    res.json(updatedUser)
}