<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { fly } from 'svelte/transition';
	interface Props extends HTMLInputAttributes {
		label: string;
		options: [string, string][];
	}
	let { label, options = [], value = $bindable(), ...props }: Props = $props();

	const getTempValue = (v: string) => (v ? options.filter(([_, i]) => i == v)[0][0] : undefined);

	let tempValue = $state(getTempValue(value));
	let open = $state(false);
	const toggle = () => setTimeout(() => (open = !open), 100);

	function handleChoose(v: string) {
		value = v;
		tempValue = getTempValue(v);
	}
</script>

<label class="grid">
	<span class="mb-1 font-medium">{label}</span>

	<div class="relative">
		<input
			type="text"
			{...props}
			onclick={toggle}
			onblur={toggle}
			readonly
			name="_"
			value={tempValue ?? 'Pilih !'}
			spellcheck="false"
			class="h-9 w-full rounded border border-gray-300 px-3 focus:outline-none focus:ring-2"
		/>

		{#if open}
			<div
				transition:fly={{ y: 50, duration: 200 }}
				class="absolute inset-x-0 z-10 mt-1 max-h-64 divide-y overflow-y-auto rounded-md border bg-white shadow"
			>
				{#each options as [label, val]}
					<button
						onclick={() => handleChoose(val)}
						type="button"
						class="block w-full p-1.5 px-3 text-left hover:bg-gray-100">{label}</button
					>
				{/each}
			</div>
		{/if}
	</div>
</label>

<input type="text" name={props.name} {value} hidden />
