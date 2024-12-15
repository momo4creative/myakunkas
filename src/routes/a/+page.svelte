<script lang="ts">
	import Circle from '@ui/chart/circle.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<Circle value={40} max={80} />
<Circle value={120} max={100} />
<Circle value={30} max={100} />
