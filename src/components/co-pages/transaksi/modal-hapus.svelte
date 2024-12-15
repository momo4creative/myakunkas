<script lang="ts">
	import { modalTransaksiStore } from '$lib/stores/modal-store';
	import Modal from '@ui/modal.svelte';
	import FormHapus from '@co/form-hapus.svelte';
	import handleSubmit from '$lib/utils/handleSubmit';
	import { invalidate } from '$app/navigation';

	function submitted() {
		return handleSubmit('Hapus transaksi', {
			onSubmit: modalTransaksiStore.close,
			onSuccess: () => invalidate('get:summary-anggaran')
		});
	}
</script>

<Modal open={$modalTransaksiStore.isHapus} close={modalTransaksiStore.close}>
	<FormHapus
		name="transaksi"
		id={$modalTransaksiStore.id ?? ''}
		close={modalTransaksiStore.close}
		{submitted}
	/>
</Modal>
