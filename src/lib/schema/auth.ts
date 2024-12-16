import { z } from "zod";

export const loginSchema = z.object({
    username: z.string().min(4).trim(),
    password: z.string().min(4).trim(),
})

export const registerSchema = loginSchema.merge(z.object({
    confirmPassword: z.string().trim()
})).superRefine((v, c) => {
    if (v.password != v.confirmPassword) c.addIssue({
        message: 'Confirm Password dan Password tidak sama !',
        path: ['confirmPassword'],
        code: 'custom'
    })
})