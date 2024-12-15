import { setSession } from "$lib/server/db";
import { verifyToken } from "$lib/server/secure";
import { redirect, type Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

const auth: Handle = async ({ event, resolve }) => {
    const sessionId = event.cookies.get('sessionId')
    if (sessionId) {
        const sess = verifyToken(sessionId) as Payload | null
        event.locals.session = sess
        if (sess) setSession(sess.session)
    }
    return resolve(event)
}

const guard: Handle = ({ event, resolve }) => {
    if (!event.locals.session && !event.url.pathname.startsWith('/auth')) {
        console.log('Login dulu !');
        redirect(303, '/auth/login')
    }

    if (event.locals.session && event.url.pathname.startsWith('/auth/login')) {
        console.log('Sudah login !');
        redirect(303, '/')
    }


    return resolve(event)
}

export const handle: Handle = sequence(auth, guard)