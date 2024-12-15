import { getTransaksiByAnggaranId } from '$lib/server/db';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params: { anggaranId }, url }) => {
    const { start, end } = Object.fromEntries(url.searchParams) as { start?: string, end?: string }
    const res = await getTransaksiByAnggaranId({
        _where: { anggaran_id: anggaranId },
        _sort: { created_at: 'desc' },
        _order: [Number(start), Number(end ?? 5)]
    })
    return json(res.data)
};