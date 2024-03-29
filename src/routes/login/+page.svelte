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

            goto('/');
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
        <div class='flex flex-col items-center'>
            <h1 class='text-center text-3xl text-blue-300 mt-24 mb-5'>PWMan</h1>
            <div class='border-2 py-3 px-6 rounded-lg'>
                <p class='block text-xl text-blue-100 mb-3 text-center'>Login</p>
                <div class='flex flex-col items-center'>
                    <label for='email' class='place-self-start block text-md text-blue-100 mb-1 ms-1'>Email</label>
                    <input 
                        type='text' 
                        name='email' 
                        class='block border-zinc-800 border rounded-lg text-sm pl-2 py-1 w-52 focus:ring-blue-500 focus:border-blue-500 outline-none' 
                        placeholder='Email' 
                        required
                    />
                </div>
                <div class='flex flex-col items-center mt-3'>
                    <label for='password' class='place-self-start block text-md text-blue-100 mb-1 ms-1'>Password</label>
                    <input 
                        type='password' 
                        name='password' 
                        class='block border-zinc-800 border rounded-lg text-sm pl-2 py-1 w-52 focus:ring-blue-500 focus:border-blue-500 outline-none' 
                        placeholder='•••••••••' 
                        required
                    />
                </div>
                <a class='block text-xs text-end text-blue-100 hover:text-blue-500 hover:underline mt-1 me-1' href='/register'>Create Account</a>
                <button class='border rounded-lg mt-3 px-3 py-1 w-auto float-right bg-blue-100 border-zinc-800 text-zinc-800 hover:border-blue-500 hover:bg-blue-200 hover:text-zinc-600'>Login</button>
            </div>
        </div>
    </form>
</div>