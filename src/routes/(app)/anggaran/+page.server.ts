import { createAnggaran, deleteAnggaran, updateAnggaran } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;


export const actions = {
    tambah: async ({ request }) => await createAnggaran(request),
    ubah: async ({ request }) => await updateAnggaran(request),
    hapus: async ({ request }) => await deleteAnggaran(request),
}