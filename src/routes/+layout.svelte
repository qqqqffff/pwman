<script>
    import '../app.css';
    import { onMount } from 'svelte';
    import { initFirebase } from '$lib/client/firebase';
    import { onAuthStateChanged } from 'firebase/auth';
    import { auth as authStore } from '../stores/auth'
    import { goto } from '$app/navigation';

    onMount(() => {
        const { auth } = initFirebase();
        onAuthStateChanged(auth, (user) => {
            if(!user) goto('/login');
            authStore.set(user)
        }); 
    })
</script>

<slot />