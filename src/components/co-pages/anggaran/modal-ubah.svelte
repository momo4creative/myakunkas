<script lang="ts">
	import Modal from '@ui/modal.svelte';
	import FormAnggaran from './form-anggaran.svelte';
	import { modalAnggaranStore } from '$lib/stores/modal-store';
	import handleSubmit from '$lib/utils/handleSubmit';
	import { invalidate } from '$app/navigation';

	function submitted() {
		return handleSubmit('Ubah anggaran.', {
			onSubmit: modalAnggaranStore.close,
			onSuccess: () => invalidate('get:summary-anggaran'),
			onFailure: () => {}
		});
	}
</script>

<Modal open={$modalAnggaranStore.isUbah} close={modalAnggaranStore.close}>
	<FormAnggaran onCancel={modalAnggaranStore.close} {submitted} value={$modalAnggaranStore.value} />
</Modal>
