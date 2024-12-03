import { Request, Response } from "express";
import { prismaClient } from "../routes";

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