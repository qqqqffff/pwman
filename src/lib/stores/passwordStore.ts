import { writable } from "svelte/store";

export const passwordBlock = writable({
    saltedHash: '',
    salt: '',
    account: '',
    url: '',
})