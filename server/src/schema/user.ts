import { listenerCount } from 'process'
import zod from 'zod'

export const SignupSchema = zod.object({
    name: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(6)
})

export const AddressSchema = zod.object({
    lineOne: zod.string(),
    lineTwo: zod.string().nullable(),
    pincode: zod.string().length(6),
    country: zod.string(),
    city: zod.string(),
    userId: zod.number()
})

export const UpdateSchema = zod.object({
    name: zod.string().nullable(),
    defaultShippingAddress: zod.number().nullable(),
    defaultBillingAddress: zod.number().nullable()
})