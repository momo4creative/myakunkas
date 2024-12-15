<script lang="ts">
	import cn from '$lib/utils/cn';
	import Icon from '@iconify/svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends HTMLButtonAttributes {}
	let { ...props }: Props = $props();
</script>

<button
	type="button"
	{...props}
	class={cn(
		'absolute right-1 top-1 rounded-full p-1 font-bold text-red-600 hover:bg-red-100',
		props.class
	)}
>
	<Icon icon="mdi:close" width="24" />
</button>
