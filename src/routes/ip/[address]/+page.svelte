<script lang="ts">
    import type { PageProps } from './$types';

    let { data }: PageProps = $props();

    const result = data;
    const resultJson = JSON.stringify(result);
</script>
<p>{resultJson}</p>