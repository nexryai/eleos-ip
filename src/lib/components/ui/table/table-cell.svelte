<script lang="ts">
    import { cn, type WithElementRef } from "$lib/utils.js";
    import type { HTMLTdAttributes } from "svelte/elements";

    let { ref = $bindable(null), class: className, children, ...restProps }: WithElementRef<HTMLTdAttributes> = $props();
</script>

<td
    bind:this={ref}
    data-slot="table-cell"
    class={cn(
		"whitespace-nowrap bg-clip-padding p-2 align-middle [&:has([role=checkbox])]:pe-0 overflow-hidden text-ellipsis text-sm font-medium transition-colors first:ps-5 last:pe-5 dark:first:ps-5 dark:last:pe-5",
		className
	)}
    {...restProps}
>
    {@render children?.()}
</td>
