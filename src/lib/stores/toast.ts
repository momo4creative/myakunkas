import { writable } from "svelte/store"

export const toast = function () {
    const { subscribe, set, update } = writable<Toast[]>([])

    return {
        subscribe,
        loading(message: string = ""): string {
            const id = crypto.randomUUID()
            update(n => ([{ id, status: 'loading', message: ['Loading !', message] }, ...n]))
            return id
        },

        success(message: string = "") {
            const id = crypto.randomUUID()
            update(n => ([{ id, status: 'success', message: ['Berhasil !', message] }, ...n]))
            setTimeout(() => {
                this.destroy(id)
            }, 4000);
        },

        error(message: string = "") {
            const id = crypto.randomUUID()
            update(n => ([{ id, status: 'error', message: ['Gagal !', message] }, ...n]))
            setTimeout(() => {
                this.destroy(id)
            }, 5000);
        },
        destroy(id: string) {
            setTimeout(() => {
                update(n => n.filter(v => v.id != id))
            }, 500);
        }
    }
}()