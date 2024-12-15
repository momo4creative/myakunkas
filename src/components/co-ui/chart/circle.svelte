<script lang="ts">
	import cn from '$lib/utils/cn';
	import type { HTMLStyleAttributes } from 'svelte/elements';
	interface Props extends HTMLStyleAttributes {
		value: number;
		max: number;
	}

	let { value = 100, max = 100, ...props }: Props = $props();

	const nilai = $derived(Math.round((100 * value) / max));
</script>

<div
	class={cn(
		'relative inline-flex items-center justify-center',
		{
			'text-green-500': nilai > 0,
			'text-yellow-500': nilai > 40,
			'text-orange-500': nilai > 70,
			'text-red-500': nilai > 90
		},
		props.class
	)}
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="80"
		height="80"
		stroke="currentColor"
		fill="transparent"
		viewBox="-50 -50 100 100"
		style="rotate: -90deg;"
	>
		<circle r="46" stroke-width="8" opacity="0.3"></circle>
		<circle
			r="46"
			stroke-width="8"
			stroke-dasharray="290"
			stroke-linecap="round"
			stroke-dashoffset={290 - (290 * (nilai <= max ? nilai : 100)) / 100}
		></circle>
	</svg>
	<div class="absolute text-lg font-bold">{nilai}%</div>
</div>
