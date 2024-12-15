import { createTransaksi, deleteTransaksi, updateTransaksi } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;


export const actions = {
    tambah: async ({ request }) => await createTransaksi(request),
    ubah: async ({ request }) => await updateTransaksi(request),
    hapus: async ({ request }) => await deleteTransaksi(request),
}