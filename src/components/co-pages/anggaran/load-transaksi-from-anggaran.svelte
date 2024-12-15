<script lang="ts">
	import { modalTransaksiStore } from '$lib/stores/modal-store';
	import cn from '$lib/utils/cn';
	import { formatRupiah } from '$lib/utils/formatter';
	import Icon from '@iconify/svelte';
	import Button from '@ui/button/button.svelte';
	import { fade } from 'svelte/transition';

	let { id, disabled }: { id: string; disabled?: boolean } = $props();

	let loading = $state(false);
	let transaksi: Transaksi[] = $state([]);
	const hasTransaksi = $derived(transaksi.length > 0);

	async function getTransaksi() {
		if (hasTransaksi) return (transaksi = []);
		transaksi = [];
		loading = true;

		const res = await fetch('/api/transaksi/' + id);
		const data = await res.json();

		loading = false;
		transaksi = data;
	}
</script>

{#if loading}
	<ul class="divide-y">
		{#each Array.from({ length: 3 }).map((_, i) => i) as _, i}
			<li class="animate-pulse px-3">
				<span class="inline-block h-2 w-1/12 rounded-full bg-slate-300"></span>
				<span class="inline-block h-2 w-4/12 rounded-full bg-slate-400"></span>
				<span class="inline-block h-2 w-4/12 rounded-full bg-slate-300"></span>
				<span class="inline-block h-2 w-2/12 rounded-full bg-slate-300"></span>
			</li>
		{/each}
	</ul>
{/if}

{#if hasTransaksi}
	<ul transition:fade class="mx-3 my-1 divide-y rounded border">
		{#each transaksi as v}
			<li class="grid grid-cols-3 items-center px-3 py-1 hover:bg-blue-50">
				<div>
					<span class="me-2 rounded bg-slate-200 px-1">{new Date(v.tanggal).getDate()}</span>
					<span class="font-medium">{v.uraian}</span>
				</div>
				<span>{formatRupiah(v.nilai)}</span>
				<div class="flex items-center justify-end gap-1">
					<Button onclick={() => modalTransaksiStore.openUbah(v)} color="yellow" icon="pencil" sm />
					<Button onclick={() => modalTransaksiStore.openHapus(v.id)} color="red" icon="trash" sm />
				</div>
			</li>
		{/each}
	</ul>
{/if}

{#if !loading}
	<div class="my-1 text-center text-sm">
		<button
			onclick={getTransaksi}
			type="button"
			{disabled}
			class={cn(
				'inline-flex items-center rounded-full bg-slate-200 px-1 hover:bg-slate-300 disabled:opacity-60',
				{
					'bg-red-100 text-red-600 hover:bg-red-200': hasTransaksi
				}
			)}
		>
			<span class="px-1">{hasTransaksi ? 'Tutup' : 'Detail'}</span>
			<span class="">
				<Icon icon="mdi:{hasTransaksi ? 'close' : 'chevron-down'}" width="16" />
			</span>
		</button>
	</div>
{/if}
