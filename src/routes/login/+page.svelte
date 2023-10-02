<script lang="ts">
    import { applyAction, deserialize } from "$app/forms";
    import { goto, invalidateAll } from "$app/navigation";
    import type { ActionResult } from "@sveltejs/kit";
    import { getAuth, signInWithEmailAndPassword, type User, type UserCredential } from "firebase/auth";
    import { onMount } from "svelte";
    import { auth } from "../../stores/auth";
    import type { ActionData } from "./$types";

    export let form: ActionData;

    onMount(() => {
        return auth.subscribe((user) => {
            if(user) goto('/');
        });
    });

    const login = async (email: string | undefined, password: string | undefined): Promise<ActionResult<{credential: UserCredential}, Record<string, string>>> => {
        if(!email || !password)
            return {
                type: 'failure',
                status: 400,
                data: {
                    message: 'Missing Email or Password',
                }
            };
        
        const auth = getAuth();

        try{
            const credential = await signInWithEmailAndPassword(auth, email, password);
            return {
                type: 'success',
                status: 200,
                data: {
                    credential,
                }
            }
        } catch(error){
            return {
                type: 'failure',
                status: 403,
                data: {
                    message: (error as Error).message,
                }
            }
        }
    }

    async function handleSubmit(this: HTMLFormElement, event: unknown): Promise<void> {
        const formData = new FormData(this);

        const email = formData.get('email')?.toString();
        const password = formData.get('password')?.toString();

        try{
            const loginResult = await login(email, password);

            if(loginResult.type !== 'success'){
                applyAction(loginResult);

                return;
            }

            const { data } = loginResult;
            if(!data?.credential){
                throw new Error('Login result returned with no credentials');
            } 

            const { credential: { user }} = data;
            formData.set('token', await user.getIdToken());

            const response = await fetch(this.action, {
                method: 'POST',
                body: formData
            })

            const result = deserialize(await response.text());

            if(result.type === 'success'){
                await invalidateAll();
            }
        } catch(error){
            applyAction({
                type: 'error',
                error,
            })
        }
    }
</script>

<div>
    {#if form && !form.success && form.message}
        <div>
            {form.message}
        </div>
    {/if}
    <form method='POST' on:submit|preventDefault='{handleSubmit}'>
        <div class='grid grid-cols-3 grid-rows-4'>
            <h1 class='justify-self-center col-start-2 row-start-2 text-2xl'>PWMan</h1>
            <div class='justify-self-center col-start-2 row-start-3 border-t-2 border-s-2 border-e-2 pt-3 ps-3 pe-3 rounded-t-lg'>
                <p class='block text-lg text-blue-100 mb-3 text-center'>Login</p>
                <label for='email' class='block text-md text-blue-100 mb-1 ms-1'>Email</label>
                <input type='text' id='email' class='block border-zinc-800 border rounded-lg text-sm pl-2 py-1 w-52 focus:ring-blue-500 focus:border-blue-500 outline-none' placeholder='Email' required/>
            </div>
            <div class='justify-self-center col-start-2 row-start-4 border-b-2 border-s-2 border-e-2 pb-3 ps-3 pe-3 rounded-b-lg pt-4'>
                <label for='password' class='block text-md text-blue-100 mb-1 ms-1'>Password</label>
                <input type='password' id='password' class='block border-zinc-800 border rounded-lg text-sm pl-2 py-1 w-52 focus:ring-blue-500 focus:border-blue-500 outline-none' placeholder='•••••••••' required/>
                <a class='block text-xs text-end text-blue-100 hover:text-blue-500 hover:underline mt-1 me-1' href='/register'>Create Account</a>
                <button>Login</button>
            </div>
        </div>
    </form>
</div>