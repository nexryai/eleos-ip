<script lang="ts">
    import type { PageProps } from './$types';

    let { data }: PageProps = $props();

    const ipInfo = data.ipInfo;
</script>

<div class="mt-24 mx-8">
    <h1 class="text-3xl font-bold mb-4">Your IP Information</h1>
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

