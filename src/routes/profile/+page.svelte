<script lang="ts">
    import { goto, invalidateAll } from "$app/navigation";
    import { getAuth, signOut } from "firebase/auth";

    const logout = async () => {
        const firebaseAuth = getAuth();
        await signOut(firebaseAuth);
        await fetch('/logout', { method: 'POST' });
        await invalidateAll();
        goto('/login');
    }
</script>