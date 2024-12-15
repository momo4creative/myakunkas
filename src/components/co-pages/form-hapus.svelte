<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '@ui/button/button.svelte';

	let {
		id,
		submitted,
		close,
		name
	}: { id: string; name: 'anggaran' | 'transaksi'; submitted: () => void; close?: () => void } =
		$props();
</script>

<h1 class="my-6 text-center text-2xl font-bold">Apakah yakin menghapus ?</h1>
<form
	action="/{name}?/hapus"
	method="post"
	use:enhance={submitted}
	class="my-3 flex items-center justify-center gap-3"
>
	<input type="hidden" name="id" value={id} />
	<Button type="submit" color="green">Ya</Button>
	<Button onclick={close} color="red">Tidak</Button>
</form>
