<script>
    import '../app.css';
    import { onMount } from 'svelte';
    import { initFirebase } from '$lib/client/firebase';
    import { onAuthStateChanged } from 'firebase/auth';
    import { auth as authStore } from '../stores/auth'

    onMount(() => {
        const { auth } = initFirebase();
        onAuthStateChanged(auth, (user) => {
            authStore.set
        }); 
    })
</script>

<slot />