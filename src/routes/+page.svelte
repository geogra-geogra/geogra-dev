<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	const DateConverter = (dateString: string): string => {
		const date = new Date(dateString);
		return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
	};
	const splitAwards = (awardString: string | null | undefined): string[] => {
		if (!awardString) {
			return [];
		}
		return awardString.split(',').map((award) => award.trim());
	};
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<div class="index">
	<ul>
		<li><a href="#works">Works</a></li>
		<li><a href="#careers">Careers</a></li>
		<li><a href="#achievements">Achievements</a></li>
	</ul>
	</div>
	<h2 id="works">Works</h2>
	{#each data.works as work (work._id)}
		<div class="card">
			<a href={work.url} target="_blank" rel="noopener noreferrer">
				<h3>{work.name}</h3>
				<ul>{work.description}</ul>
			</a>
		</div>
	{/each}
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

	<h2 id="achievements">Achievements</h2>
	<div class="column achievements">
		<ul>
			{#each data.achievements as achievement (achievement._id)}
				<li class="timeline-item">
					<div class="timeline-date">
						{achievement.conference}({DateConverter(achievement.date)})
						{#each achievement.categories as category}
							<span class="tag" style="background-color: {category.colorCode};"
								>{category.name}</span
							>
						{/each}
					</div>
					<div class="timeline-content">
						<a href={`${achievement.url}`} target="_blank" rel="noopener">
							<div class="author">{achievement.author}</div>
							{achievement.title}
							{#if achievement.award}
								{#each splitAwards(achievement.award) as award}
									<span class="badge">{award}</span>
								{/each}
							{/if}
						</a>
					</div>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.card {
		width: 60%;
		align-items: center;
		margin: 0.5rem 0 1rem;
		padding: 0 0 0.5rem;
		box-sizing: border-box;
		background-color: var(--background);
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
		text-align: left;
	}
	.card h3 {
		margin: 0.5rem 0;
		font-size: 1.2rem;
		text-align: left;
		text-indent: 1rem;
	}

	.index ul {
		display: flex;
	}
	.index li {
		list-style: none;
		margin-left: 20px;
	}

	/* タイムラインのスタイル */
	.column {
		position: relative;
		padding-left: 1rem; /* スペースを調整 */
		width: 60%; /* 幅を60%に固定 */
		max-width: 60%; /* 最大幅も60%に設定 */
	}

	.column li {
		list-style-type: none;
	}
	.badge {
		display: inline-block;
		align-items: center;
		justify-content: center;
		background-color: #ff8c00;
		color: #fff;
		padding: 0.2rem 0.5rem;
		border-radius: 0.2rem;
		font-size: 0.8rem;
		margin-left: 0.5rem;
	}

	.tag {
		padding: 0.2rem 0.5rem;
		border-radius: 0.2rem;
		font-size: 0.8rem;
		margin-left: 0.5rem;
	}

	.column ul {
		padding-left: 0; /* デフォルトのリストスタイルを削除 */
	}

	.column li::before {
		content: '';
		position: absolute;
		left: -1.5rem; /* 左側のスペースを確保 */
		top: 0.5rem; /* 上からの位置 */
		width: 10px; /* 矢印の幅 */
		height: 10px; /* 矢印の高さ */
		background-color: #007bff; /* 矢印の色 */
		border-radius: 50%; /* 丸くする */
	}

	.column li::after {
		content: '';
		position: absolute;
		left: -1.25rem; /* 左側のスペースを確保 */
		top: 1.5rem; /* 上からの位置 */
		width: 2px; /* 矢印の幅 */
		height: calc(100% - 1.5rem); /* 矢印の高さ */
		background-color: #007bff; /* 矢印の色 */
	}

	.column li a {
		text-decoration: none;
		color: inherit;
	}

	.author {
		font-size: 0.8rem;
	}

	.timeline-item {
		margin-bottom: 1rem;
		position: relative; /* Add relative positioning */
		padding: 0.5rem; /* Add some padding to the content */
		background-color: #f9f9f9; /* Light background color */
		border-radius: 5px; /* Rounded corners */
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Add a subtle shadow */
	}

	.timeline-date {
		font-size: 0.8rem;
	}

	.timeline-content {
		font-weight: bold; /* 内容を太字にする */
	}
</style>
