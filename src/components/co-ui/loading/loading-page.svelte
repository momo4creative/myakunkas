<script lang="ts">
	let { show }: { show?: boolean } = $props();
</script>

{#if show}
	<div class="fixed inset-0 flex items-center justify-center bg-black/20">
		<div class="absolute flex items-center justify-center rounded-full bg-black/20 p-1">
			<span
				class="absolute h-8 w-8 animate-spin rounded-full border-4 border-white border-b-transparent border-t-transparent transition"
			></span>
			<span
				style="animation-direction: reverse"
				class="h-12 w-12 animate-spin rounded-full border-2 border-white border-l-transparent border-r-transparent transition"
			></span>
		</div>
	</div>
{/if}
