import { PRIVATE_SECRET_KEY } from "$env/static/private";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function hashPassword(password: string) {
    return await bcrypt.hash(password, 10)
}

export async function validatePassword(password: string, hashPasswod: string) {
    return await bcrypt.compare(password, hashPasswod)
}

export function getToken(payload: Payload) {
    return jwt.sign(payload, PRIVATE_SECRET_KEY, { expiresIn: '1d' })
}

export function verifyToken(token: string) {
    try {
        return jwt.verify(token, PRIVATE_SECRET_KEY)
    } catch (e) {
        return null
    }
}