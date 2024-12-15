<script lang="ts">
	import type { Snippet } from 'svelte';
	import ButtonClose from './button/button-close.svelte';
	import { fade, scale } from 'svelte/transition';
	import cn from '$lib/utils/cn';

	let {
		children,
		open = $bindable(true),
		width = 'sm',
		close
	}: {
		open?: boolean;
		close?: () => void;
		children: Snippet;
		width?: 'sm' | 'md' | 'lg';
	} = $props();
</script>

{#if open}
	<div
		in:fade={{ duration: 200 }}
		out:fade={{ delay: 300 }}
		class="fixed inset-0 z-40 flex items-center justify-center bg-black/20 p-6"
	>
		<div
			in:scale
			out:scale={{ duration: 300 }}
			class={cn('fixed inset-x-0 mx-6 rounded-md bg-white shadow', {
				'max-w-sm': width == 'sm',
				'max-w-md': width == 'md',
				'max-w-lg': width == 'lg'
			})}
		>
			<ButtonClose
				onclick={() => {
					open = false;
					close && close();
				}}
			/>
			{@render children()}
		</div>
	</div>
{/if}
