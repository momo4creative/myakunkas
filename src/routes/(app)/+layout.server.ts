import { getSummaryAnggaran } from '$lib/server/db';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals: { session }, depends }) => {
    depends("get:summary-anggaran")
    return {
        session,
        summaryAnggaran: getSummaryAnggaran({
            _month: { tanggal: new Date().getMonth() + 1 },
            _sort: { name: 'asc' }
        })
    };
}) satisfies LayoutServerLoad;