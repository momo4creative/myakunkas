import { authLogout } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, cookies }) => {
    if (locals.session?.session) authLogout(locals.session?.session)
    cookies.delete('sessionId', { path: '/' })
    return redirect(303, '/auth/login')
}) satisfies PageServerLoad;