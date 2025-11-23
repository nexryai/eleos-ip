<script lang="ts">
    import { goto } from "$app/navigation";

    import { Badge } from "$lib/components/ui/badge/index.js";
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input/index.js";
    
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();

    const ipInfo = data.ipInfo;

    let inputValue = $state(ipInfo ? ipInfo.ip : "");
    let allowSearch = $derived(inputValue.length > 0);

    const handleSearch = () => {
        if (allowSearch) {
            goto(`/ip/${inputValue}`);
        }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };
</script>

<div class="mt-24 mx-8">
    <div class="flex justify-center">
        <h1 class="text-2xl font-bold mb-4">Find out more information about your IP address!</h1>
    </div>

    <div class="flex gap-4">
        <Input bind:value={inputValue} onkeydown={handleKeyDown} placeholder="IP address..."/>

        <Button disabled={!allowSearch} onclick={handleSearch}>Search</Button>
    </div>

    {#if ipInfo}
        <div class="flex gap-2 mt-3">
            <Badge variant="outline">{ipInfo.country}</Badge>
            <Badge variant="outline">{ipInfo.asn}</Badge>
            <Badge variant="outline">{ipInfo.as_domain}</Badge>
        </div>
    {:else}
        <p>Unable to retrieve IP information.</p>
    {/if}
</div>
