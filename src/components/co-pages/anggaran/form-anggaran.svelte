<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '@ui/button/button.svelte';
	import Input from '@ui/input/input.svelte';
	import Rupiah from '@ui/input/rupiah.svelte';

	let {
		submitted,
		value,
		onCancel
	}: {
		value?: Anggaran;
		submitted: () => void;
		onCancel?: () => void;
	} = $props();
</script>

<form
	action="/anggaran?/{value ? 'ubah' : 'tambah'}"
	method="post"
	use:enhance={submitted}
	class="space-y-6 p-3"
>
	<h1 class="text-2xl">{value ? 'Ubah' : 'Tambah'} Anggaran</h1>

	{#if value?.id}
		<input type="hidden" name="id" value={value.id} />
	{/if}

	<div class="grid gap-3">
		<Input value={value?.name} name="name" label="Name" />
		<Rupiah value={value?.limit} name="limit" label="Limit" />
	</div>

	<footer class="flex flex-wrap items-center justify-end gap-1">
		<Button onclick={onCancel} color="red" icon="close" />
		<Button color="yellow" type="reset" icon="restore" />
		<Button color="blue" icon="send" type="submit">{value ? 'Ubah' : 'Tambah'}</Button>
	</footer>
</form>
