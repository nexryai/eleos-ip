<script lang="ts">
	import { env } from '$env/dynamic/public';

	interface Props {
		lat: number;
		lon: number;
	}

	let { lat, lon }: Props = $props();

	const styleId = 'light-v11'; 
	const zoom = 2;
	const width = 600;
	const height = 300;
	const scale = '@2x';

	const overlay = $derived(`pin-s+ef4444(${lon},${lat})`);

	const mapUrl = $derived(
		`https://api.mapbox.com/styles/v1/mapbox/${styleId}/static/${overlay}/${lon},${lat},${zoom},0/${width}x${height}${scale}?access_token=${env.PUBLIC_MAPBOX_ACCESS_TOKEN}`
	);
</script>

<div class="h-full w-full overflow-hidden bg-muted relative">
	<img
		src={mapUrl}
		alt={`Map showing location at ${lat}, ${lon}`}
		class="h-full w-full object-cover"
		loading="lazy"
	/>
</div>