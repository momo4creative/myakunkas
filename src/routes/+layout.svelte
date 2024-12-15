<script lang="ts">
	import Toaster from '@ui/toast/toaster.svelte';
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<title>MY AKUNKAS</title>
</svelte:head>

{@render children()}

<Toaster />
