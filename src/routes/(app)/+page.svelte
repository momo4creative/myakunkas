<script lang="ts">
	import ModalFormAnggaran from '@co/anggaran/modal-form-anggaran.svelte';
	import type { PageData } from './$types';
	import ListSummaryAnggaran from '@co/anggaran/list-summary-anggaran.svelte';
	import ModalFormTransaksi from '@co/transaksi/modal-form-transaksi.svelte';
	import { summaryAnggaranStore } from '$lib/stores/store-summary-anggaran';
	import ListLoading from '@ui/loading/list-loading.svelte';
	import ModalUbahTransaksi from '@co/transaksi/modal-ubah.svelte';
	import ModalHapusTransaksi from '@co/transaksi/modal-hapus.svelte';
	import ModalUbahAnggaran from '@co/anggaran/modal-ubah.svelte';
	import ModalHapusAnggaran from '@co/anggaran/modal-hapus.svelte';

	let { data }: { data: PageData } = $props();

	$effect(() => {
		summaryAnggaranStore.set(data.summaryAnggaran);
	});
</script>

<!-- <header class="my-3 px-3">
	<h1 class="text-4xl">Beranda</h1>
</header> -->

{#await data.summaryAnggaran}
	<ListLoading />
{:then value}
	<ModalFormTransaksi />
	<ModalFormAnggaran />
	<hr class="my-3" />
	<ListSummaryAnggaran values={value.data} />
{/await}

<ModalUbahTransaksi />
<ModalHapusTransaksi />
<ModalUbahAnggaran />
<ModalHapusAnggaran />
