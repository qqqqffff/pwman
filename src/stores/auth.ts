import { writable } from 'svelte/store';

type User = {
    uid: string;
    email: string | null;
    firstName?: string;
    lastName?: string;
};

export const auth = writable<User | null>(null);