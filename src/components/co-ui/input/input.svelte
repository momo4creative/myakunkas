<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	interface Props extends HTMLInputAttributes {
		label: string;
	}
	let { label, value = $bindable(), ...props }: Props = $props();
</script>

<label class="grid">
	<span class="mb-1 font-medium">{label}</span>
	<input
		type="text"
		bind:value
		{...props}
		spellcheck="false"
		class="h-9 w-full rounded border border-gray-300 px-3 focus:outline-none focus:ring-2"
	/>
</label>
