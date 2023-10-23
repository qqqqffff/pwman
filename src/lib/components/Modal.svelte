<script lang='ts'>
    import { createEventDispatcher } from "svelte";
    

    export let open = false;
    export let title = '';
    export let website: string | undefined, username: string | undefined, password: string | undefined;

    const dispatch = createEventDispatcher();

    function dispatchPassword() {
        dispatch("sendPassword"),
        {
            website,
            username,
            password
        }
    }
</script>

{#if open}
    <div class='z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center p-8'>
        <div class='fixed w-full h-full bg-gray-900 opacity-50' on:click={() => dispatch('close')} on:keydown={(key) => console.log(key)} role='button' aria-pressed='false' tabindex=-1 />
        <div class='mx-auto rounded-lg shadow-xl z-50 overflow-y-auto'>
            <div class='bg-secondary border-primary-light border rounded-lg'>
                <div class='flex flex-row justify-between items-center'>
                    <div></div>
                    <span class='font-bold text-primary ms-10 text-2xl'>{title}</span>
                    <button class='p-2 rounded-full hover:fill-primary-dark fill-primary' on:click={() => dispatch('close')}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" ><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
                    </button>
                </div>
                <form method="POST" on:submit|preventDefault='{dispatchPassword}'>
                    <label for="website" class="ms-6 text-lg text-primary-dark justify-self-start">Website:</label>
                    <input
                        bind:value={website}
                        autocomplete="off"
                        type="text"
                        id='website'
                        class='block w-72 py-1 px-3 ms-4 mb-2 text-sm text-primary border border-black rounded-lg bg-secondary-dark focus:ring-primary-dark focus:border-primary-dark'
                    />
                    <label for="username" class="ms-6 text-lg text-primary-dark justify-self-end">Username:</label>
                    <input
                        bind:value={username}
                        autocomplete="off"
                        type="text"
                        id='username'
                        class='block w-72 py-1 px-3 ms-4 mb-2 text-sm text-primary border border-black rounded-lg bg-secondary-dark focus:ring-primary-dark focus:border-primary-dark'
                    />
                    <label for="password" class="ms-6 text-lg text-primary-dark justify-self-end">Password:</label>
                    <input
                        bind:value={password}
                        autocomplete="off"
                        type="password"
                        id='password'
                        class='block w-72 py-1 px-3 mx-4 text-sm text-primary border border-black rounded-lg bg-secondary-dark focus:ring-primary-dark focus:border-primary-dark'
                    />
                </form>
                <div class='flex flex-row-reverse mt-8 mb-4'>
                    <button on:click={dispatchPassword} class='py-1 px-4 rounded-lg mx-2 bg-primary-light border-secondary-dark text-secondary-dark hover:border-primary-dark hover:bg-primary hover:text-secondary'>
                        Add Password
                    </button>
                    <button on:click={() => dispatch('close')} class='py-1 px-4 rounded-lg mx-2 bg-primary-light border-secondary-dark text-secondary-dark hover:border-primary-dark hover:bg-primary hover:text-secondary'>
                        Cancel
                    </button>
                </div>
                
            </div>
        </div>
    </div>
{/if}