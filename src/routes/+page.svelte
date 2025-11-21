<script lang="ts">
    import { Badge } from "$lib/components/ui/badge/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import type { PageProps } from './$types';

    let { data }: PageProps = $props();

    const ipInfo = data.ipInfo;
</script>

<div class="mt-24 mx-8">
    <div class="flex justify-center">
        <h1 class="text-2xl font-bold mb-4">Find out more information about your IP address!</h1>
    </div>
    
    <Input defaultValue={ipInfo.ip} />
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

