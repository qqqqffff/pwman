import { writable } from "svelte/store";

export type Password = {
    uid: string,
    id: string,
    website: string,
    url: string,
    salt: string,
    hash: string,
}

export const passwords = writable<Password[] | null>(null);