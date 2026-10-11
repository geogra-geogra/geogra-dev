<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	/** Format a YYYY-MM-DD string as "YYYY.M.D" without timezone conversion. */
	export const DateConverter = (dateString: string): string => {
		// Date を経由するとビルド環境(UTC)とブラウザ(JST)で日付がずれるため文字列を直接分解する
		const [year, month, day] = dateString.split('-').map(Number);
		return `${year}.${month}.${day}`;
	};
	export const splitAwards = (awardString: string | null | undefined): string[] => {
		if (!awardString) {
			return [];
		}
		return awardString.split(',').map((award) => award.trim());
	};
</script>

<h2 id="achievements">Achievements</h2>
<div class="column achievements">
	<ul>
		{#each data.achievements as achievement (achievement.slug)}
			<li class="timeline-item">
				{#if achievement.url}
					<a href={`${achievement.url}`} target="_blank" rel="noopener">
						<div class="timeline-date">
							{achievement.conference}({DateConverter(achievement.date)})
							{#each achievement.categories as category}
								<span class="tag" style="background-color: {category.colorCode};"
									>{category.name}</span
								>
							{/each}
						</div>
						<div class="timeline-content">
							<div class="author">{achievement.author}</div>
							{achievement.title}
							{#if achievement.award}
								{#each splitAwards(achievement.award) as award}
									<span class="badge">{award}</span>
								{/each}
							{/if}
						</div>
					</a>
				{:else}
					<div class="timeline-date">
						{achievement.conference}({DateConverter(achievement.date)})
						{#each achievement.categories as category}
							<span class="tag" style="background-color: {category.colorCode};"
								>{category.name}</span
							>
						{/each}
					</div>
					<div class="timeline-content">
						<div class="author">{achievement.author}</div>
						{achievement.title}
						{#if achievement.award}
							{#each splitAwards(achievement.award) as award}
								<span class="badge">{award}</span>
							{/each}
						{/if}
					</div>
				{/if}
			</li>
		{/each}
	</ul>
</div>
