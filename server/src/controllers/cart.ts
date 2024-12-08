import { Request, Response } from "express";
import { CreateCartSchema } from "../schema/cart";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { prismaClient } from "../routes";

export const addItemToCart = async (req: Request, res: Response) => {
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

export const deleteItemFromCart = async (req: Request, res: Response) => {}
export const changeQuantity = async (req: Request, res: Response) => {}
export const getCart = async (req: Request, res: Response) => {}
