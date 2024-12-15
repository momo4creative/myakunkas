import { authRegister } from '$lib/server/db';
import { error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

const _crf: string = crypto.randomUUID()

export const load = (async () => {
    return { _crf };
}) satisfies PageServerLoad;

export const actions = {
    default: async ({ request, url }) => {
        const crf = url.searchParams.get('_crf')
        if (crf != _crf) return error(404, "Invalid CRF !")
        return await authRegister(request)
    }
} satisfies Actions