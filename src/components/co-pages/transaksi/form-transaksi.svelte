<script lang="ts">
	import { enhance } from '$app/forms';
	import { summaryAnggaranStore } from '$lib/stores/store-summary-anggaran';
	import { formatDateInput } from '$lib/utils/formatter';
	import Button from '@ui/button/button.svelte';
	import Input from '@ui/input/input.svelte';
	import Rupiah from '@ui/input/rupiah.svelte';
	import Select from '@ui/input/select.svelte';

	let {
		submitted,
		onCancel,
		value
	}: { value?: Transaksi; submitted: () => void; onCancel?: () => void } = $props();

	const valueOptionsAnggaran: [string, string][] = $derived(
		$summaryAnggaranStore.map((d) => [d.name, d.id])
	);
</script>

<form
	action="/transaksi?/{value ? 'ubah' : 'tambah'}"
	method="post"
	use:enhance={submitted}
	class="m-3 space-y-6"
>
	<h1 class="text-2xl font-bold">{value ? 'Ubah' : 'Tambah'} Transaksi</h1>

	{#if value?.id}
		<input type="hidden" name="id" value={value.id} />
	{/if}

	<div class="grid gap-3">
		<Input
			value={formatDateInput(value?.tanggal ?? new Date())}
			name="tanggal"
			label="Tanggal"
			type="date"
		/>
		<Select
			value={value?.anggaran_id}
			name="anggaran_id"
			label="Anggaran"
			options={valueOptionsAnggaran}
		/>
		<Input value={value?.uraian} name="uraian" label="Uraian" />
		<Rupiah value={value?.nilai} name="nilai" label="Nilai" />
	</div>

	<footer class="flex flex-wrap items-center justify-end gap-1">
		<Button onclick={onCancel} color="red" icon="close" />
		<Button color="yellow" type="reset" icon="restore" />
		<Button color="blue" icon="send" type="submit">{value ? 'Ubah' : 'Tambah'}</Button>
	</footer>
</form>
