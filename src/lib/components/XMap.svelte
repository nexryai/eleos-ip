<script lang="ts">
	interface Props {
		lat: number;
		lon: number;
	}

	let { lat, lon }: Props = $props();
</script>

<div class="flex h-full w-full flex-col items-center justify-center bg-muted text-muted-foreground">
	<p class="font-bold">MAP VIEW</p>
	<p class="text-sm">Latitude: {lat}</p>
	<p class="text-sm">Longitude: {lon}</p>
</div>