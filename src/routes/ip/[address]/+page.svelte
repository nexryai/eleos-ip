<script lang="ts">
	import type { PageData } from './$types';
	import XMap from '$lib/components/XMap.svelte';
	
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Separator } from '$lib/components/ui/separator';
	import * as Card from '$lib/components/ui/card';
	import * as Table from '$lib/components/ui/table';
	
	import { ArrowLeft, Check, X, Shield, ShieldAlert, Globe, Network } from 'lucide-svelte';

	let { data } = $props<{ data: PageData }>();
	
	const { query, ipInfo, resolved, isUsingDNSSEC, authoritativeNameServers } = data;

	const getFlagEmoji = (countryCode: string) => {
		return countryCode.toUpperCase().replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
	}
	
	const privacyFlags = [
		{ label: 'VPN', value: ipInfo.privacy.is_vpn },
		{ label: 'Proxy', value: ipInfo.privacy.is_proxy },
		{ label: 'Tor', value: ipInfo.privacy.is_tor },
		{ label: 'Hosting', value: ipInfo.privacy.is_hosting },
		{ label: 'Relay', value: ipInfo.privacy.is_icloud_relay },
	];
</script>

<div class="mt-4 p-4">
	<Button variant="ghost" href="/" class="gap-2">
		<ArrowLeft size={16} />
		検索に戻る
	</Button>
</div>

<main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
	<div class="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
		
		<div class="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
			<Card.Root class="sm:col-span-2">
				<Card.Header class="pb-3">
					<Card.Title>IP Address</Card.Title>
					<Card.Description class="max-w-lg text-balance leading-relaxed">
						Query: {query}
					</Card.Description>
				</Card.Header>
				<Card.Content>
					<div class="flex items-center gap-2 text-2xl font-bold">
						{ipInfo.ip}
						{#if ipInfo.is_eu}
							<Badge variant="outline" class="ml-2 text-xs font-normal">EU Region</Badge>
						{/if}
					</div>
				</Card.Content>
			</Card.Root>
			
			<Card.Root>
				<Card.Header class="pb-2">
					<Card.Description>Country</Card.Description>
					<Card.Title class="text-xl flex items-center gap-2">
						<span class="text-2xl">{getFlagEmoji(ipInfo.country_code)}</span>
						{ipInfo.country}
					</Card.Title>
				</Card.Header>
			</Card.Root>
			
			<Card.Root>
				<Card.Header class="pb-2">
					<Card.Description>Timezone</Card.Description>
					<Card.Title class="text-md">
						<span class="font-mono">{ipInfo.time_zone}</span>
					</Card.Title>
				</Card.Header>
			</Card.Root>
		</div>

		<Card.Root>
			<Card.Header>
				<Card.Title>Location & Network</Card.Title>
				<Card.Description>Approximate geolocation and ASN information</Card.Description>
			</Card.Header>
			<Card.Content class="grid gap-4 md:grid-cols-2">
				<div class="h-64 w-full overflow-hidden rounded-md border">
					<XMap lat={ipInfo.latitude} lon={ipInfo.longitude} />
				</div>
				<div class="flex flex-col gap-4">
					<div class="rounded-md border p-4">
						<div class="text-sm font-medium text-muted-foreground mb-2">Network (ASN)</div>
						<div class="text-lg font-bold">{ipInfo.asn.asn}</div>
						<div class="text-sm">{ipInfo.asn.name}</div>
						<div class="mt-2 text-xs text-muted-foreground break-all">{ipInfo.asn.route}</div>
					</div>
					<div class="rounded-md border p-4">
						<div class="text-sm font-medium text-muted-foreground mb-2">Company</div>
						<div class="font-semibold">{ipInfo.company.name}</div>
						<div class="text-sm text-muted-foreground">{ipInfo.company.domain}</div>
						<div class="mt-2 flex items-center gap-2 text-xs">
							<Badge variant="outline">{ipInfo.company.type}</Badge>
						</div>
					</div>
				</div>
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header>
				<Card.Title>DNS Resolution (A/AAAA)</Card.Title>
				<Card.Description>Result of name resolution by Google Public DNS</Card.Description>
			</Card.Header>
			<Card.Content>
				<Table.Root class="table-fixed w-full">
					<Table.Header>
						<Table.Row>
							<Table.Head class="w-[100px]">Type</Table.Head>
							<Table.Head>Data</Table.Head>
							<Table.Head class="w-[100px] text-right">TTL</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{#if resolved.Answer && resolved.Answer.length > 0}
							{#each resolved.Answer as record}
								<Table.Row>
									<Table.Cell class="font-medium">
										{#if record.type === 1}A
										{:else if record.type === 28}AAAA
										{:else if record.type === 46}RRSIG
										{:else}{record.type}{/if}
									</Table.Cell>
									
									<Table.Cell class="break-all font-mono text-xs overflow-hidden">
										{record.data}
									</Table.Cell>
									
									<Table.Cell class="text-right">{record.TTL}</Table.Cell>
								</Table.Row>
							{/each}
						{:else}
							<Table.Row>
								<Table.Cell colspan={3} class="text-center text-muted-foreground">
									No direct answer records found.
								</Table.Cell>
							</Table.Row>
						{/if}
					</Table.Body>
				</Table.Root>
			</Card.Content>
		</Card.Root>
	</div>

	<div>
		<Card.Root class="space-y-4">
			<Card.Header>
				<Card.Title>Security & Details</Card.Title>
				<Card.Description>IP address and domain details</Card.Description>
			</Card.Header>
			<Card.Content class="grid gap-6">
				
				<div class="grid gap-2">
					<div class="font-semibold flex items-center gap-2">
						<Shield size={16} /> Privacy Analysis
					</div>
					<div class="grid grid-cols-2 gap-2">
						{#each privacyFlags as flag}
							<div class="flex items-center justify-between rounded border p-2 text-sm">
								<span>{flag.label}</span>
								{#if flag.value}
									<Badge variant="destructive" class="h-5 px-1">Detected</Badge>
								{:else}
									<Badge variant="outline" class="h-5 px-1 text-muted-foreground bg-muted/50 border-0">Not Detected</Badge>
								{/if}
							</div>
						{/each}
					</div>
				</div>

				<Separator />

				<div class="grid gap-2">
					<div class="font-semibold flex items-center gap-2">
						<Network size={16} /> Protocol Details
					</div>
					<div class="flex items-center justify-between rounded bg-muted/30 p-3">
						<span class="text-sm">DNSSEC</span>
						{#if isUsingDNSSEC}
							<Badge variant="outline" class="gap-1 text-green-600"><Check size={12} /> Signed</Badge>
						{:else}
							<Badge variant="secondary" class="gap-1 text-muted-foreground"><X size={12} /> Unsigned</Badge>
						{/if}
					</div>
					<div class="flex items-center justify-between rounded bg-muted/30 p-3">
						<span class="text-sm">Anycast</span>
						<span class="text-sm font-medium">{ipInfo.is_anycast ? 'Yes' : 'No'}</span>
					</div>
				</div>

				<Separator />

				<div class="grid gap-2">
					<div class="font-semibold flex items-center gap-2">
						<Globe size={16} /> Authoritative Name Servers
					</div>
					{#if authoritativeNameServers.length > 0}
						<ul class="text-sm text-muted-foreground space-y-1 bg-muted p-2 rounded max-h-40 overflow-y-auto">
							{#each authoritativeNameServers as ns}
								<li class="break-all">• {ns}</li>
							{/each}
						</ul>
					{:else}
						<p class="text-sm text-muted-foreground">情報なし</p>
					{/if}
				</div>

				<Separator />

				<div class="grid gap-4">
					<div class="font-semibold flex items-center gap-2">
						<ShieldAlert size={16} /> Abuse Contact
					</div>
					<dl class="grid gap-2 text-sm">
						<div class="flex flex-col">
							<dt class="text-muted-foreground">Email</dt>
							<dd class="truncate font-medium">{ipInfo.abuse.email}</dd>
						</div>
						<div class="flex flex-col">
							<dt class="text-muted-foreground">Phone</dt>
							<dd class="font-medium">{ipInfo.abuse.phone || 'N/A'}</dd>
						</div>
					</dl>
				</div>
			</Card.Content>
		</Card.Root>
	</div>
</main>