import { z } from "zod";
import id from "./id";

export const transaksiCreateSchema = z.object({
    tanggal: z.string().pipe(z.coerce.date()),
    anggaran_id: z.string().uuid(),
    uraian: z.string().min(1).trim(),
    nilai: z.string().pipe(z.coerce.number().min(1)),
})


export const transaksiUpdateSchema = transaksiCreateSchema.merge(id)