<script lang="ts">
    import Modal from "$lib/components/Modal.svelte";

    let showModal = false;

    const handleToggleModal = () => {
        showModal = !showModal;
    }
</script>

<nav class='bg-secondary-dark p-4'>
    <div class='flex flex-nowrap justify-between'>
        <a href='/' class='text-3xl text-primary self-center ml-5 italic font-bold'>PWMan</a>
        <div class='relative'>
            <div class='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                <svg class='w-4 h-4 text-secondary-light' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill="none" viewBox='0 0 20 20'>
                    <path stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'/>
                </svg>
            </div>
            <input 
                type='search' 
                id='search' 
                class='block lg:w-[32rem] pl-10 p-4 text-lg text-secondary-light border border-black rounded-lg bg-secondary focus:ring-blue-500 focus:border-blue-500' 
                placeholder="Search Vault"/>
        </div>
        <div class='self-center mr-5'>
            <button 
                type='button'
                on:click={() => handleToggleModal()}
                class='border rounded-lg me-4 px-3 py-1 w-auto bg-blue-100 border-zinc-800 text-zinc-800 hover:border-blue-500 hover:bg-blue-200 hover:text-zinc-600'
            >
                Add PW
            </button>
            <a href='/profile' class='text-xl text-blue-100 hover:underline'>Profile</a>
        </div>
    </div>
</nav>

<Modal
    title='Test'
    open={showModal}
    on:close={() => handleToggleModal()}
>
    <svelte:fragment slot='body'>Test content</svelte:fragment>
</Modal>