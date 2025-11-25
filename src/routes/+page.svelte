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
    <div class="flex justify-between items-center">
        <div>
            <h1 class="text-2xl font-bold mb-4">
                Find out more information <br>
                about IP address!
            </h1>
        </div>
        <div class="flex justify-start">
            <img src="/undraw_global-team_8jok.svg" alt="Global Team Illustration" class="w-64 ml-6">
        </div>
    </div>
    <div class="flex justify-start w-full">
        <div class="relative">
            <div class="-z-50 absolute bottom-1/3 left-0 right-0 top-0 my-auto w-96 h-32 rotate-45 bg-linear-to-r from-yellow-400 to-yellow-300 blur-3xl opacity-20 dark:opacity-30"></div>
        </div>
    </div>

    <div class="mt-10">
        {#if ipInfo.asn}
            <div class="flex gap-2 mt-3">
                <Badge variant="outline">{ipInfo.country}</Badge>
                <Badge variant="outline">{ipInfo.asn}</Badge>
                <Badge variant="outline">{ipInfo.as_domain}</Badge>
            </div>
        {/if}
    </div>

    <div class="mt-3 flex gap-4 max-w-lg">
        <Input bind:value={inputValue} onkeydown={handleKeyDown} placeholder="IP address..."/>

        <Button disabled={!allowSearch} onclick={handleSearch}>Search</Button>
    </div>
</div>
