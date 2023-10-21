<script lang="ts">
    import Navigation from "$lib/components/Navigation.svelte";
    import PasswordCard from "$lib/components/PasswordCard.svelte";
</script>

<Navigation />

<div class='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10 m-8'>
    <PasswordCard />
    <PasswordCard />
    <PasswordCard />
    <PasswordCard />
</div>