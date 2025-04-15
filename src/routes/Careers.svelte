<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<h2 id="careers">Careers</h2>
<div class="column careers">
	<ul>
		{#each data.careers as carrers (carrers._id)}
			<li class="timeline-item">
				<div class="timeline-date">
					{carrers.term}
				</div>
				<div class="timeline-content">
					{carrers.title}
				</div>
			</li>
		{/each}
	</ul>
</div>
