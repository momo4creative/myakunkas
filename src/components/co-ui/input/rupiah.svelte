<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props extends HTMLInputAttributes {
		label: string;
	}
	let { label, value = $bindable(), ...props }: Props = $props();

	const setRupiah = (val: string) =>
		!isNaN(Number(val))
			? new Intl.NumberFormat('id', {
					style: 'currency',
					currency: 'IDR',
					maximumFractionDigits: 0
				}).format(Number(val))
			: '';

	let tempValue = $state(setRupiah(value));

	function change(val: string) {
		value = val.replace('Rp', '').replaceAll('.', '');
		tempValue = setRupiah(value);
	}
</script>

<label class="grid">
	<span class="mb-1 font-medium">{label}</span>
	<input
		type="text"
		{...props}
		name="_"
		value={tempValue}
		onkeyup={(e) => change(e.currentTarget.value)}
		spellcheck="false"
		class="h-9 w-full rounded border border-gray-300 px-3 focus:outline-none focus:ring-2"
	/>
	<input type="text" name={props.name} {value} hidden />
</label>
