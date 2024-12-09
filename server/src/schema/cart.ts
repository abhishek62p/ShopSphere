import zod from "zod"

export const CreateCartSchema = zod.object({
    productId: zod.number(),
    quantity: zod.number(),
});

export const ChangeQuantitySchema = zod.object({
    quantity: zod.number()
});