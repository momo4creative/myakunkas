<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import handleSubmit from '$lib/utils/handleSubmit';
	import Input from '@ui/input/input.svelte';
	import type { ActionData, PageData } from './$types';
	import Button from '@ui/button/button.svelte';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let loading = $state(false);

	function submit() {
		return handleSubmit('Login pengguna.', {
			onSubmit: () => (loading = true),
			onSuccess: () => goto('/'),
			onFailure: () => (loading = false)
		});
	}
</script>

<div class="container mx-auto p-6 md:max-w-sm">
	<h1 class="my-6 text-4xl font-bold">Login</h1>

	{#if loading}
		<p class="my-3">Loading..</p>
	{/if}

	{#if form?.message}
		<div class="border bg-white p-3">
			<h1>{form.message}</h1>
			{#if form.errors}
				{#each Object.entries(form.errors) as [name, value]}
					<p>{name} : {value}</p>
				{/each}
			{/if}
		</div>
	{/if}

	<form action="?_crf={data._crf}" method="post" use:enhance={submit} class="my-3 grid gap-3">
		<Input name="username" label="Username" autocomplete="username" />
		<Input type="password" name="password" label="Password" />
		<Button color="blue" type="submit" class="mt-6">Login</Button>
	</form>

	<div class="text-center">
		<div class="inline bg-slate-100 px-3">or</div>
		<hr class="-mt-2.5 mb-6" />
		<Button onclick={() => goto('/auth/register')} class="w-full">Register</Button>
	</div>
</div>
