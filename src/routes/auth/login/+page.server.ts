import { error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { authLogin } from '$lib/server/db';

const _crf: string = crypto.randomUUID()

export const load = (async () => {
    return { _crf };
}) satisfies PageServerLoad;

export const actions = {
    default: async (event) => {
        const crf = event.url.searchParams.get('_crf')
        if (crf != _crf) return error(404, "Invalid CRF !")
        return await authLogin(event)
    }
} satisfies Actions