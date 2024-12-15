<script lang="ts">
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';
	import LoadTransaksiFromAnggaran from './load-transaksi-from-anggaran.svelte';
	import Circle from '@ui/chart/circle.svelte';
	import { formatRupiah } from '$lib/utils/formatter';
	import Button from '@ui/button/button.svelte';
	import { modalAnggaranStore } from '$lib/stores/modal-store';

	let { values }: { values: SummaryAnggaran[] } = $props();
</script>

{#snippet detail(v: SummaryAnggaran)}
	<div class="flex items-center gap-3 px-3">
		<Circle value={v.nilai} max={v.limit} class="my-1 h-16 w-16" />
		<div class="">
			<h1 class="text-xl font-medium">{v.name}</h1>
			<div>
				<span>{formatRupiah(v.nilai)}</span>
				<span>/</span>
				<span>{formatRupiah(v.limit)}</span>
			</div>
		</div>
	</div>
{/snippet}

{#snippet action(v: SummaryAnggaran)}
	<div class="absolute right-3 top-3">
		<Button onclick={() => modalAnggaranStore.openUbah(v)} color="yellow" icon="pencil" sm />
		<Button
			disabled={v.nilai != 0}
			onclick={() => modalAnggaranStore.openHapus(v.id)}
			color="red"
			icon="trash"
			sm
		/>
	</div>
{/snippet}

<ul class="grid gap-1">
	{#each values as v, i (v.id)}
		<li animate:flip in:fly={{ x: 50, delay: 200 }} out:fly={{ y: 50 }} class="relative bg-white">
			{@render action(v)}
			{@render detail(v)}
			<LoadTransaksiFromAnggaran id={v.id} disabled={v.nilai == 0} />
		</li>
	{/each}
</ul>
