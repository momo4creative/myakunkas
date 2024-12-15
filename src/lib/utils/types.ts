type Payload = Pick<Required<User>, 'username' | 'session'>

type User = {
    id: string
    username: string
    password: string
    session?: string
    created_at: string | Date
}

type Anggaran = {
    id: string
    user_id: string
    name: string
    limit: number
    created_at: string | Date
    updated_at?: string | Date
}

type SummaryAnggaran = Anggaran & { nilai: number }

type Transaksi = {
    id: string
    user_id: string
    anggaran_id: string
    tanggal: string | Date
    uraian: string
    nilai: number
    created_at: string | Date
    updated_at?: string | Date
}

type Toast = {
    id: string
    status: 'loading' | 'success' | 'error'
    message: string[]
}