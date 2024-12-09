import { Request, Response } from "express";
import { prismaClient } from "../routes";

export const createOrder = async (req: Request, res: Response) => {
    // 1. to create a transaction
    // 2. to list all the cart items and proceed if cart is not empty
    // 3. calculate the total amount
    // 4. fetch address of user
    // 5. to define computed field for formatted address on address module
    // 6. we will create a order and order productsorter product
    // 7. create events

    return await prismaClient.$transaction(async(tx) => {
        const cartItems = await tx.cartItem.findMany({
            where: { userId: req.user.id},
            include: { product: true }
        })
        if(cartItems.length == 0) {
            return res.json({msg: "Cart is Empty"})
        }
        const price = cartItems.reduce((prev, current) => {
            return prev + (current.quantity * current.product.price)
        }, 0)
    })
}
export const listOrder = async (req: Request, res: Response) => {}
export const cancelOrder = async (req: Request, res: Response) => {}
export const getOrderById = async (req: Request, res: Response) => {}