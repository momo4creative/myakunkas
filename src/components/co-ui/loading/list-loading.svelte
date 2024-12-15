<script lang="ts">
	import { flip } from 'svelte/animate';

	let { show = true }: { show?: boolean } = $props();
</script>

{#if show}
	<ul class="grid gap-1">
		{#each Array.from({ length: 4 }).map((_, i) => i) as v, i (v)}
			<li animate:flip class="bg-white">
				<div class="animate-pulse space-y-3 p-3">
					<div class="h-4 w-1/2 rounded-full bg-slate-300"></div>
					<div class="h-3 w-3/4 rounded-full bg-slate-200"></div>
				</div>
			</li>
		{/each}
	</ul>
{/if}
