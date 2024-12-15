<script lang="ts">
	import { toast } from '$lib/stores/toast';
	import cn from '$lib/utils/cn';
	import Icon from '@iconify/svelte';
	import { flip } from 'svelte/animate';
	// check-bold exclamation-thick

	function getIconName<T extends string>(status: T) {
		if (status == 'success') return 'check-bold';
		if (status == 'error') return 'exclamation-thick';
		if (status == 'loading') return 'loading';
	}
</script>

{#if $toast.length > 0}
	<ul class="fixed inset-x-0 top-0 z-50 flex flex-col items-center px-6">
		{#each $toast as { status, message, id }, i (id)}
			<li
				animate:flip
				class={cn(
					'max-sm: mt-3 flex items-start rounded bg-gray-500 px-1 py-1 text-white shadow-md',
					{
						'bg-red-500': status == 'error',
						'bg-green-500': status == 'success'
					}
				)}
			>
				<div class="rounded-full bg-black/10 p-0.5">
					<Icon
						icon="mdi:{getIconName(status)}"
						class={cn({ 'animate-spin': status == 'loading' })}
						width="24"
					/>
				</div>
				<div class="px-3">
					<span class="font-medium tracking-wider">{message.slice(0, 1)}</span>
					<span>{message.slice(1)}</span>
				</div>
			</li>
		{/each}
	</ul>
{/if}
