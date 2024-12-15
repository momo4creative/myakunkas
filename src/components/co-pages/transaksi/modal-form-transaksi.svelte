<script lang="ts">
	import { invalidate } from '$app/navigation';
	import handleSubmit from '$lib/utils/handleSubmit';
	import Button from '@ui/button/button.svelte';
	import Modal from '@ui/modal.svelte';
	import FormTransaksi from './form-transaksi.svelte';

	let open = $state(false);

	function submitted() {
		return handleSubmit('Tambah transaksi baru.', {
			onSubmit: () => (open = false),
			onSuccess: () => invalidate('get:summary-anggaran'),
			onFailure: () => {}
		});
	}
</script>

<div class="my-3 px-3">
	<Button color="blue" onclick={() => (open = true)} icon="plus" class="w-full"
		>Transaksi Baru</Button
	>
</div>

<Modal bind:open>
	<FormTransaksi onCancel={() => (open = false)} {submitted} />
</Modal>
