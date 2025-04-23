<script lang="ts">
	import type { PageData } from './$types';
	import Achievement from './Achievement.svelte';
	import Careers from './Careers.svelte';
	import Works from './Works.svelte';
	export let data: PageData;
</script>

<svelte:head>
	<title>Shota Yamamoto|geogra.dev</title>
	<meta name="description" content="地理学における可視化を統計的に扱いたいです。" />
</svelte:head>

<section>
	<Works {data} />
	<Careers {data} />
	<Achievement {data} />
</section>
