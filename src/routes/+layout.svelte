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

    <footer class="mt-32 h-24 px-6 flex justify-between items-center w-full">
        <div>
            <p class="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} IP Info Finder. All rights reserved.
            </p>
            <p class="text-sm text-muted-foreground">
                Map data: &copy;mapbox & OpenStreetMap. 
            </p>
        </div>
        <div>
            <p class="text-sm text-muted-foreground">
                Powered by IPinfo & IPLocate.io.
            </p>
        </div>
    </footer>
</div>