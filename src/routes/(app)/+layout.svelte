<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<div class="px-3">
	<span>Hi,</span>
	<span>{data.session?.username}</span>
	<a href="/auth/logout" class="text-red-500">Logout</a>
</div>

<header class="my-3 px-3">
	<h1 class="text-2xl font-bold text-slate-500">MY-AKUNKAS</h1>
</header>

<div class="pb-6">
	{@render children()}
</div>

<footer class="absolute inset-x-0 bottom-0 flex items-center justify-end bg-slate-300">
	<small class="px-3 py-1 leading-none">V 0.0.1</small>
</footer>
