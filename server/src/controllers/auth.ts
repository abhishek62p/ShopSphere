import { Request, Response } from "express"
import { prismaClient } from "../routes";
import { compareSync, hashSync } from 'bcrypt' 

export const signup = async (req:Request, res:Response) => {
    const {email, password, name} = req.body;

    let user = await prismaClient.user.findFirst({ where: {email}})

    if(user) {
        throw Error('User already exist!')
    }

    user = await prismaClient.user.create({
        data: {
            name,
            email,
            password: hashSync(password, 10)
        }
    })
    res.json(user)
}

export const login = async (req:Request, res: Response) => {
    const {email, password} = req.body;

    const user = await prismaClient.user.findFirst({where: {email}})

    try {
        if(!user) {
            throw Error('User does not exist!')
        }
        if(!compareSync(password,user.password)){
            throw Error('Incorrect Password')
        }
    }
}