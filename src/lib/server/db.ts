import { z } from "zod"
import Database from "./database"
import { fail, type RequestEvent } from "@sveltejs/kit"
import handleError from "$lib/utils/handle-error"
import { loginSchema, registerSchema } from "$lib/schema/auth"
import { transaksiCreateSchema, transaksiUpdateSchema } from "$lib/schema/transaksi"
import id from "$lib/schema/id"
import { anggaranCreateSchema, anggaranUpdateSchema } from "$lib/schema/anggaran"
import { getToken, hashPassword, validatePassword } from "./secure"

const db = new Database()

export function setSession(value: string) {
    db.session = value
}

export async function zodParce<T extends z.ZodType>(request: Request, schema: T) {
    const form = Object.fromEntries(await request.formData())
    return await schema.parseAsync(form) as z.infer<T>
}


export async function getSummaryAnggaran(opts: DbOptions<Anggaran & Transaksi> | undefined = undefined) {
    db.params = { anggaran: { summary: opts } }
    const res = await db.fetching()
    return res.anggaran.summary as DbReadResult<SummaryAnggaran>
}

export async function getTransaksiByAnggaranId(opts: DbOptions<Transaksi> | undefined = undefined) {
    db.params = { transaksi: { read: opts } }
    const res = await db.fetching()
    return res.transaksi.read as DbReadResult<Transaksi>
}

// auth
export async function authRegister(request: Request) {
    try {
        let data = await zodParce(request, registerSchema)

        data.password = await hashPassword(data.password)

        db.params = { auth: { register: data } }
        const res = await db.fetching()
        return res.auth.register as User
    } catch (e) {
        return fail(400, handleError<typeof registerSchema>(e))
    }
}

export async function authLogin(event: RequestEvent) {
    try {
        const data = await zodParce(event.request, loginSchema)
        db.params = { auth: { login: data.username } }
        const res = await db.fetching()
        const user = res.auth.login as Required<User>

        const validPassword = await validatePassword(data.password, user.password)
        if (!validPassword) throw new Error("Gagal login !");

        const { username, session } = user
        const token = getToken({ username, session })
        event.cookies.set('sessionId', token, { path: '/', maxAge: 60 * 60 * 24 * 7 })

        return
    } catch (e) {
        return fail(400, handleError<typeof loginSchema>(e))
    }
}

export async function authLogout(session: string) {
    db.params = { auth: { logout: session } }
    const res = await db.fetching()
    return res.auth.logout as boolean
}


// anggaran
export async function createAnggaran(request: Request) {
    try {
        const data = await zodParce(request, anggaranCreateSchema)

        db.params = { anggaran: { create: data } }
        const res = await db.fetching()
        return res.anggaran.create as Transaksi
    } catch (e) {
        return fail(400, handleError<typeof anggaranCreateSchema>(e))
    }
}

export async function updateAnggaran(request: Request) {
    try {
        const data = await zodParce(request, anggaranUpdateSchema)

        db.params = { anggaran: { update: data } }
        const res = await db.fetching()
        return res.anggaran.update as Transaksi
    } catch (e) {
        return fail(400, handleError<typeof anggaranUpdateSchema>(e))
    }
}

export async function deleteAnggaran(request: Request) {
    try {
        const data = await zodParce(request, id)

        db.params = { anggaran: { delete: data.id } }
        const res = await db.fetching()
        return res.anggaran.delete as boolean
    } catch (e) {
        return fail(400, handleError<typeof id>(e))
    }
}

// transaksi
export async function createTransaksi(request: Request) {
    try {
        const data = await zodParce(request, transaksiCreateSchema)

        db.params = { transaksi: { create: data } }
        const res = await db.fetching()
        return res.transaksi.create as Transaksi
    } catch (e) {
        return fail(400, handleError<typeof transaksiCreateSchema>(e))
    }
}

export async function updateTransaksi(request: Request) {
    try {
        const data = await zodParce(request, transaksiUpdateSchema)

        db.params = { transaksi: { update: data } }
        const res = await db.fetching()
        return res.transaksi.update as Transaksi
    } catch (e) {
        return fail(400, handleError<typeof transaksiUpdateSchema>(e))
    }
}

export async function deleteTransaksi(request: Request) {
    try {
        const data = await zodParce(request, id)

        db.params = { transaksi: { delete: data.id } }
        const res = await db.fetching()
        return res.transaksi.delete as boolean
    } catch (e) {
        return fail(400, handleError<typeof id>(e))
    }
}
