import { Request, Response } from "express";
import { ChangeQuantitySchema, CreateCartSchema } from "../schema/cart";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { prismaClient } from "../routes";
import { date } from "zod";

export const addItemToCart = async (req: Request, res: Response) => {
    //  check if items is already added or created then increase only its quantity
    const validatedData = CreateCartSchema.parse(req.body)
    try {
        const product = await prismaClient.product.findFirstOrThrow({
            where: {id: validatedData.productId}
        })
        const cart = await prismaClient.cartItem.create({
            data: {
                userId: req.user.id,
                productId: product.id,
                quantity: validatedData.quantity
            }
        })
        res.json(cart)
    } catch (error) {
        throw new NotFoundException('Product not Found', ErrorCode.PRODUCT_NOT_FOUND)
    }
}

export const deleteItemFromCart = async (req: Request, res: Response) => {
    // check if user is deleting its own cart items
    await prismaClient.cartItem.delete({
        where: {id: +req.params.id}
    })
    res.json({
        msg: "Item deleted successfully",
        success: true
    })
}
export const changeQuantity = async (req: Request, res: Response) => {
    const validatedData = ChangeQuantitySchema.parse(req.body)
    const updatedCard = await prismaClient.cartItem.update({
        where: { id: +req.params.id },
        data: { quantity: validatedData.quantity}
    })
    res.json({
        msg: "cart item updated successfully",
        status: true,
        updatedCard: updatedCard
    })
}
export const getCart = async (req: Request, res: Response) => {
    const cart = await prismaClient.cartItem.findMany({
        where: { id: +req.params.id },
        include: { product: true}
    })
    res.json({
        msg: "getting your cart items",
        cartItems: cart
    })
}
