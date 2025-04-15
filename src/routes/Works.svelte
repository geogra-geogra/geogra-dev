<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<h2 id="works">Works</h2>
{#each data.works as work (work._id)}
	<div class="card">
		<a href={work.url} target="_blank" rel="noopener noreferrer">
			<h3>{work.name}</h3>
			<ul>{work.description}</ul>
		</a>
	</div>
{/each}
