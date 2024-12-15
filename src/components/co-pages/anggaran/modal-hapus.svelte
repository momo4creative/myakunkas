<script lang="ts">
	import Modal from '@ui/modal.svelte';
	import FormHapus from '@co/form-hapus.svelte';
	import { modalAnggaranStore } from '$lib/stores/modal-store';
	import handleSubmit from '$lib/utils/handleSubmit';
	import { invalidate } from '$app/navigation';

	function submitted() {
		return handleSubmit('Hapus anggaran.', {
			onSubmit: modalAnggaranStore.close,
			onSuccess: () => invalidate('get:summary-anggaran'),
			onFailure: () => {}
		});
	}
</script>

<Modal open={$modalAnggaranStore.isHapus} close={modalAnggaranStore.close}>
	<FormHapus
		name="transaksi"
		id={$modalAnggaranStore.id ?? ''}
		close={modalAnggaranStore.close}
		{submitted}
	/>
</Modal>
