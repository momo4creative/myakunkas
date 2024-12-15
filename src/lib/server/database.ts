import { PUBLIC_API_GS } from "$env/static/public";

export default class Database {
    params!: DbParams
    session!: string

    constructor() { }

    async fetching() {
        console.log(JSON.stringify(this.params, null, 2));

        if (!this.params) {
            console.log('Invalid param database !');
            throw new Error("Param kosong !");
        }

        const query = JSON.stringify({ ...this.params, session: this.session })
        const time = new Date().getTime()

        const res = await fetch(PUBLIC_API_GS + "?q=" + query + "&time=" + time)
        const [result, error] = await res.json()

        if (error) throw new Error(error);
        return result
    }
}
