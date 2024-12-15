import { z } from "zod"

export default function handleError<T extends z.ZodType>(e: unknown) {
    let errors: z.inferFlattenedErrors<T>['fieldErrors'] | undefined = undefined
    let message = "Kesalahan system !"

    if (e instanceof z.ZodError) {
        return {
            errors: e.flatten().fieldErrors,
            message: "Kesalahan validasi form !"
        }
    }

    if (e instanceof Error) {
        return {
            errors, message: e.message
        }
    }


    return { errors, message }
}