import { writable } from "svelte/store"

type Stored<T> = {
    isTambah: boolean
    isUbah: boolean
    isHapus: boolean
    value?: T
    id?: string
}

const modalStore = <T>() => {
    const { subscribe, set, update } = writable<Stored<T>>({
        isTambah: false,
        isUbah: false,
        isHapus: false
    })

    return {
        subscribe,
        openTambah: () => update(n => ({ ...n, isTambah: true })),
        openUbah: (value: T) => update(n => ({ ...n, isUbah: true, value })),
        openHapus: (id: string) => update(n => ({ ...n, isHapus: true, id })),
        close: () => set({ isHapus: false, isTambah: false, isUbah: false })
    }
}

export const modalTransaksiStore = modalStore<Transaksi>()
export const modalAnggaranStore = modalStore<Anggaran>()