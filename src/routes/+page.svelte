<script lang="ts">
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
        <ul class="list-disc list-inside">
            <li><strong>IP:</strong> {ipInfo.ip}</li>
            <li><strong>ASN:</strong> {ipInfo.asn}</li>
            <li><strong>Domain:</strong> {ipInfo.as_domain}</li>
            <li><strong>Country:</strong> {ipInfo.country}</li>
        </ul>
    {:else}
        <p>Unable to retrieve IP information.</p>
    {/if}
</div>

