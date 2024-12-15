import { writable } from "svelte/store";

export const summaryAnggaranStore = function <T = SummaryAnggaran>() {
    const { subscribe, set, update } = writable<T[]>([])

    return {
        subscribe,
        set: async (value: Promise<DbReadResult<T>>) => {
            try {
                const res = await value
                set(res.data)
            } catch (e) {
                console.log('Gagal store summary anggaran !');
            }
        }
    }
}()

