<script lang="ts">
    let dropdownHidden = true;
    
    const fetchPassword = () => {

    }

    export let websiteName = 'Test';
    export let link = '';
    export let username = 'username';
    let password = '********'
</script>

<div class="rounded-xl bg-secondary-dark border-primary-light border w-full max-w-sm">
    <div class='flex flex-row justify-between items-center'>
        <div class='ms-4 rounded-lg hover:text-primary-dark text-primary'>
            <!-- <img class='w-24 h-24 rounded-full' src='/favicon.svg' alt='test'/> -->
            <a href={link}>{websiteName}</a>
        </div>
        <div class='flex flex-col items-end px-4 py-4'>
            <button class="inline-block hover:bg-secondary rounded-lg text-sm p-1.5" type="button" on:click={() => dropdownHidden = !dropdownHidden}>
                <span class="sr-only">Open dropdown</span>
                <svg class="w-5 h-5 fill-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 3">
                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                </svg>
            </button>
        </div>
    </div>
    <div class='flex flex-row-reverse'>
        <div hidden={dropdownHidden} class="absolute -translate-y-3 -translate-x-2 text-left list-none bg-secondary rounded-lg shadow w-24">
            <ul class="py-2">
                <li>
                    <button class="block px-4 py-2 text-xs text-primary hover:text-primary-dark">Edit</button>
                </li>
                <li>
                    <button class="block px-4 py-2 text-xs text-primary hover:text-primary-dark">Remove</button>
                </li>
            </ul>
        </div>
    </div>    
    <div class='flex flex-col p-4'>
        <div class='py-2'>
            <span class='text-primary-dark'>User:</span>
            <span class='text-primary ms-2'>{username}</span>
        </div>
        
        <div class='py-2 flex flex-row items-center justify-between'>
            <div>
                <span class='text-primary-dark'>Password:</span>
                <span class='text-primary'>{password}</span>
            </div>
            <button class='hover:bg-secondary rounded-full p-1.5' type='button' on:click={fetchPassword}>
                <span class=''>view</span>
            </button>
        </div>
    </div>
</div>