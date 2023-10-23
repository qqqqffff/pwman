<script context='module'>
   
</script>

<script lang='ts'>
    import '../app.css';
    import { onMount } from 'svelte';
    import { auth } from '$lib/client/firebase';
    import { onAuthStateChanged } from 'firebase/auth';
    import { auth as authStore } from '../stores/auth'
    import { goto } from '$app/navigation';

    onMount(() => {
        onAuthStateChanged(auth, (user) => {
            if(!user) goto('/login');
            authStore.set(user)
        }); 
    })
</script>

<slot />