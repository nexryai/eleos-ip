<script lang="ts">
    import "./layout.css";
    import favicon from "$lib/assets/favicon.svg";

    let { children } = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon}>
</svelte:head>

<div class="min-h-screen flex flex-col">
    
    <main class="flex-1">
        {@render children()}
    </main>

    <footer class="mt-32 h-24 px-6 flex md:flex-row flex-col justify-between items-center w-full">
        <div>
            <p class="text-sm text-muted-foreground">
                &copy;{new Date().getFullYear()} nexryai  All rights reserved.
            </p>
            <p class="text-sm text-muted-foreground">
                Map data: &copy;Mapbox & &copy;OpenStreetMap
            </p>
        </div>
        <div class="md:mb-0 mb-24">
            <p class="text-sm text-muted-foreground">
                Powered by IPinfo & IPLocate.io.
            </p>
        </div>
    </footer>
</div>