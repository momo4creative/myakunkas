<script lang="ts">
	import Toaster from '@ui/toast/toaster.svelte';
	import '../app.css';
	import LoadingPage from '@ui/loading/loading-page.svelte';
	import { navigating } from '$app/stores';
	let { children } = $props();
</script>

<svelte:head>
	<title>MY AKUNKAS</title>
</svelte:head>

{@render children()}

<Toaster />
<LoadingPage show={!!$navigating} />
