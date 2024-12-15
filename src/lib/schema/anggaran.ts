import { z } from "zod";
import id from "./id";

export const anggaranCreateSchema = z.object({
    name: z.string().min(4),
    limit: z.string().pipe(z.coerce.number().min(1)),
})


export const anggaranUpdateSchema = anggaranCreateSchema.merge(id)