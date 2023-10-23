<script lang="ts">
    import Modal from "./Modal.svelte";
    import { addDoc, serverTimestamp } from "firebase/firestore/lite";
    import { auth } from "../../stores/auth";

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
                autocomplete='off'
                type='search' 
                id='search' 
                class='block lg:w-[32rem] md:w-96 pl-10 py-3 text-xl text-primary border border-black rounded-lg bg-secondary focus:ring-primary-dark focus:border-primary-dark' 
                placeholder="Search Vault"/>
        </div>
        <div class='self-center mr-5'>
            <button 
                type='button'
                on:click={() => handleToggleModal()}
                class='border rounded-lg me-4 px-3 py-1 w-auto bg-primary-light border-secondary-dark text-secondary-dark hover:border-primary-dark hover:bg-primary hover:text-secondary'
            >
                Add PW
            </button>
            <a href='/profile' class='text-xl text-primary-light hover:underline'>Profile</a>
        </div>
    </div>
</nav>

<Modal
    title='Add Password'
    website=''
    username=''
    password=''
    open={showModal}
    on:close={() => handleToggleModal()}
    on:sendPassword={() => {}}
/>