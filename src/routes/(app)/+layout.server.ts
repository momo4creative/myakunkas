import { getSummaryAnggaran } from '$lib/server/db';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals: { session }, depends }) => {
    depends("get:summary-anggaran")

    const bulanIni = new Date().getMonth() + 1
    const tahunIni = new Date().getFullYear()

    return {
        session,
        summaryAnggaran: getSummaryAnggaran({
            _month: { tanggal: bulanIni },
            _year: { tanggal: tahunIni },
            _sort: { name: 'asc' }
        })
    };
}) satisfies LayoutServerLoad;