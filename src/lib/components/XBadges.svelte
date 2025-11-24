<script lang="ts">
    import { SiAkamai, SiAlibabacloud, SiApple, SiCloudflare, SiGooglecloud, SiHuawei } from "@icons-pack/svelte-simple-icons";

    import { Badge } from "./ui/badge";

    interface Props {
        asn: string;
        companyName: string;
        companyDomain: string;
        companyType: string;
        isHosting: boolean;
        isICloudPrivateRelay: boolean;
        isVPN: boolean;
        isProxy: boolean;
        isTor: boolean;
    }

    const { companyName, companyDomain, companyType, isHosting, isICloudPrivateRelay, isVPN, isProxy, isTor }: Props = $props();

    const isGoogleCloud = companyName === "Google LLC" && companyDomain === "google.com" && companyType === "hosting" && isHosting
    const isMicrosoftAzure = companyName === "Microsoft Corporation" && companyDomain === "microsoft.com" && companyType === "hosting" && isHosting 
    const isAWS = companyName === "Amazon.com, Inc." && companyDomain === "amazon.com" && companyType === "hosting" && isHosting
    const isHuaweiCloud = companyDomain === "huaweicloud.com";
    const isAlibabaCloud = companyDomain === "alibabacloud.com";
    
    const isCloudflare = (companyName === "Cloudflare, Inc." || companyName ==="Cloudflare Inc") && companyDomain === "cloudflare.com" && companyType === "hosting" && isHosting
    const isAkamai = companyName === "Akamai Technologies, Inc." && companyDomain === "akamai.com" && companyType === "hosting" && isHosting
</script>

<div>
    {#if isGoogleCloud}
        <Badge variant="outline" class="mr-1"> <SiGooglecloud /> Google Cloud</Badge>
    {/if}

    {#if isMicrosoftAzure}
        <Badge variant="outline" class="mr-1"> <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-azure"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 7.5l-4 9.5h4l6 -15z" /><path d="M22 20l-7 -15l-3 7l4 5l-8 3z" /></svg> Microsoft Azure</Badge>
    {/if}

    {#if isAWS}
        <Badge variant="outline" class="mr-1"> <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-aws"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 18.5a15.198 15.198 0 0 1 -7.37 1.44a14.62 14.62 0 0 1 -6.63 -2.94" /><path d="M19.5 21c.907 -1.411 1.451 -3.323 1.5 -5c-1.197 -.773 -2.577 -.935 -4 -1" /><path d="M3 11v-4.5a1.5 1.5 0 0 1 3 0v4.5" /><path d="M3 9h3" /><path d="M9 5l1.2 6l1.8 -4l1.8 4l1.2 -6" /><path d="M18 10.25c0 .414 .336 .75 .75 .75h1.25a1 1 0 0 0 1 -1v-1a1 1 0 0 0 -1 -1h-1a1 1 0 0 1 -1 -1v-1a1 1 0 0 1 1 -1h1.25a.75 .75 0 0 1 .75 .75" /></svg> Amazon Web Service</Badge>
    {/if}

    {#if isHuaweiCloud}
        <Badge variant="outline" class="mr-1">  <SiHuawei /> Huawei Cloud</Badge>
    {/if}

    {#if isAlibabaCloud}
        <Badge variant="outline" class="mr-1">  <SiAlibabacloud /> Alibaba Cloud</Badge>
    {/if}

    {#if isCloudflare}
        <Badge variant="outline" class="mr-1"> <SiCloudflare />Cloudflare</Badge>
    {/if}

    {#if isAkamai}
        <Badge variant="outline" class="mr-1"> <SiAkamai />Akamai</Badge>
    {/if}

    {#if isICloudPrivateRelay}
        <Badge variant="outline" class="mr-1"> <SiApple />iCloud Private Relay</Badge>
    {/if}



</div>

