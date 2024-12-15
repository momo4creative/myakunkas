<script lang="ts">
	import { modalTransaksiStore } from '$lib/stores/modal-store';
	import Modal from '@ui/modal.svelte';
	import FormTransaksi from './form-transaksi.svelte';
	import handleSubmit from '$lib/utils/handleSubmit';
	import { invalidate } from '$app/navigation';

	function submitted() {
		return handleSubmit('Ubah transaksi', {
			onSubmit: modalTransaksiStore.close,
			onSuccess: () => invalidate('get:summary-anggaran')
		});
	}
</script>

<Modal open={$modalTransaksiStore.isUbah} close={modalTransaksiStore.close}>
	<FormTransaksi
		onCancel={modalTransaksiStore.close}
		{submitted}
		value={$modalTransaksiStore.value}
	/>
</Modal>
