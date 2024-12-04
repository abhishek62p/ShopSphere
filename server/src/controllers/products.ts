import { Request, Response } from "express";
import { prismaClient } from "../routes";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";

export const createProduct = async(req: Request, res: Response) => {
    // ["tea", "india"] => "tea, india"
    // create a validator to for this request

    const product = await prismaClient.product.create({
        data: {
            ...req.body,
            tags: req.body.tags.join(',')
        }
    })
    res.json(product)
}

export const updateProducts = async (req: Request, res: Response) => {
    try {
        const product = req.body;
        if(product.tags) {
            product.tags = product.tags.join(',')
        }
        const updateProducts = await prismaClient.product.update({
            where:{ id: +req.params.id },
            data: product
        })
        res.json({
            msg: "product update successfully",
            updates: updateProducts
        })

    } catch (error) {
        throw new NotFoundException('Product Not Found', ErrorCode.PRODUCT_NOT_FOUND)
    }
}
export const deleteProducts = async (req: Request, res: Response) => {}
export const listProducts = async (req: Request, res: Response) => {}
export const getProductById = async (req: Request, res: Response) => {}