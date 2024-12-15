<script lang="ts">
	import { invalidate } from '$app/navigation';
	import handleSubmit from '$lib/utils/handleSubmit';
	import Button from '@ui/button/button.svelte';

	import Modal from '@ui/modal.svelte';
	import FormAnggaran from './form-anggaran.svelte';

	let open = $state(false);

	function submitted() {
		return handleSubmit('Tambah anggaran baru.', {
			onSubmit: () => (open = false),
			onSuccess: () => invalidate('get:summary-anggaran'),
			onFailure: () => {}
		});
	}
</script>

<div class="my-3 px-3">
	<Button onclick={() => (open = true)} icon="plus" class="w-full">Anggaran Baru</Button>
</div>

<Modal bind:open>
	<FormAnggaran {submitted} onCancel={() => (open = false)} />
</Modal>
