<script lang="ts">
	import type { PageData } from './$types';
	import Achievement from './Achievement.svelte';
	import Careers from './Careers.svelte';
	import Works from './Works.svelte';
	export let data: PageData;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<Works {data} />
	<Careers {data} />
	<Achievement {data} />
</section>

<style>
</style>
