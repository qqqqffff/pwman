import { writable } from 'svelte/store';

type User = {
    uid: string;
    email: string;
    first_name: string;
    last_name: string;
};

export const auth = writable<User | null>(null);