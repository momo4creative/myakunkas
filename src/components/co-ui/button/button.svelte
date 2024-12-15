<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import Icon, { type IconifyIcon } from '@iconify/svelte';
	import cn from '$lib/utils/cn';

	interface Props extends HTMLButtonAttributes {
		children?: Snippet;
		icon?: IconifyIcon | string;
		color?: 'slate' | 'red' | 'yellow' | 'blue' | 'green';
		sm?: boolean;
	}
	let { children, icon, color = 'slate', sm, ...props }: Props = $props();
</script>

<button
	type="button"
	{...props}
	class={cn(
		'inline-flex items-center justify-center rounded bg-slate-500 font-medium text-white hover:bg-slate-600 disabled:bg-gray-400 disabled:opacity-50',
		{
			'bg-red-500': color == 'red',
			'bg-yellow-500': color == 'yellow',
			'bg-blue-500': color == 'blue',
			'bg-green-500': color == 'green'
		},
		{
			'text-sm': sm
		},
		props.class
	)}
>
	{#if icon}
		<span class="p-1">
			<Icon icon="mdi:{icon}" class="" width={sm ? 16 : 24} />
		</span>
	{/if}
	{#if children}
		<span class={cn('px-4 py-1.5', { 'ps-0': icon })}>{@render children?.()}</span>
	{/if}
</button>
