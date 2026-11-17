<script lang="ts">
	import Home from '#lib/components/Home.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Home {data} />
