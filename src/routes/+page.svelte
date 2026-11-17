<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const { profile, works, careers, achievementYears, typeLabels } = $derived(data);

	/** Format "YYYY-MM-DD" as "M/D" without timezone conversion. */
	const monthDay = (date: string): string => {
		// Date を経由するとビルド環境(UTC)とブラウザ(JST)で日付がずれるため文字列を直接分解する
		const [, month, day] = date.split('-').map(Number);
		return `${month}/${day}`;
	};

	/** Hostname shown under each work card. */
	const host = (url: string): string => new URL(url).hostname.replace(/^www\./, '');

	const sections = [
		{ id: 'works', label: 'Works' },
		{ id: 'careers', label: 'Careers' },
		{ id: 'achievements', label: 'Achievements' }
	];
</script>

<svelte:head>
	<title>{profile.siteTitle}</title>
	<meta name="description" content={profile.bio} />
	<meta property="og:title" content={profile.siteTitle} />
	<meta property="og:description" content={profile.bio} />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary" />
</svelte:head>

<header class="site-header">
	<div class="inner">
		<a class="brand" href="#top">{profile.name}</a>
		<nav aria-label="ページ内リンク">
			<ul>
				{#each sections as section (section.id)}
					<li><a href="#{section.id}">{section.label}</a></li>
				{/each}
			</ul>
		</nav>
	</div>
</header>

<main id="top">
	<section class="hero">
		<img class="avatar" src="/avatar.jpg" alt="" width="96" height="96" />
		<div>
			<h1>{profile.name}</h1>
			{#if profile.nameEn}<p class="name-en">{profile.nameEn}</p>{/if}
			<p class="bio">{profile.bio}</p>
			<ul class="links">
				{#each profile.links as link (link.url)}
					<li>
						<a href={link.url} target="_blank" rel="noopener noreferrer">
							{#if link.icon}<Icon name={link.icon} />{/if}
							{link.label}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</section>

	<section id="works" aria-labelledby="works-title">
		<h2 id="works-title">Works <span>作ったもの</span></h2>
		<ul class="works">
			{#each works as work (work.url)}
				<li>
					<a class="work" href={work.url} target="_blank" rel="noopener noreferrer">
						<h3>{work.name}</h3>
						<p>{work.description}</p>
						<span class="host">{host(work.url)}</span>
					</a>
				</li>
			{/each}
		</ul>
	</section>

	<section id="careers" aria-labelledby="careers-title">
		<h2 id="careers-title">Careers <span>経歴</span></h2>
		<ol class="careers">
			{#each careers as career (career.title)}
				<li>
					<span class="period">{career.period}</span>
					<span class="career-title">{career.title}</span>
				</li>
			{/each}
		</ol>
	</section>

	<section id="achievements" aria-labelledby="achievements-title">
		<h2 id="achievements-title">Achievements <span>発表・掲載</span></h2>
		{#each achievementYears as group (group.year)}
			<div class="year">
				<h3 class="year-label">{group.year}</h3>
				<ol class="achievements">
					{#each group.items as item, i (`${item.date}-${i}`)}
						<li class="achievement">
							<div class="meta">
								<time datetime={item.date}>{monthDay(item.date)}</time>
								<span class="tag tag-{item.type}">{typeLabels[item.type]}</span>
							</div>
							<p class="title">
								{#if item.url}
									<a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>
								{:else}
									{item.title}
								{/if}
							</p>
							<p class="venue">{item.venue}</p>
							{#if item.note}<p class="note">{item.note}</p>{/if}
							{#if item.awards.length > 0}
								<ul class="awards">
									{#each item.awards as award (award)}
										<li>{award}</li>
									{/each}
								</ul>
							{/if}
						</li>
					{/each}
				</ol>
			</div>
		{/each}
	</section>
</main>

<footer class="site-footer">
	<p>&copy; {profile.nameEn ?? profile.name}</p>
</footer>

<style>
	/* ヘッダー */
	.site-header {
		position: sticky;
		top: 0;
		z-index: 10;
		background: color-mix(in srgb, var(--bg) 85%, transparent);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		border-bottom: 1px solid var(--border);
	}

	.inner {
		max-width: var(--width);
		margin: 0 auto;
		padding: 0 var(--gutter);
		height: 3.25rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}

	.brand {
		font-weight: 700;
		color: var(--text);
		text-decoration: none;
		white-space: nowrap;
	}

	nav ul {
		display: flex;
		gap: 0.25rem;
	}

	nav a {
		display: block;
		padding: 0.35rem 0.6rem;
		border-radius: 8px;
		font-size: 0.875rem;
		color: var(--muted);
		text-decoration: none;
	}

	nav a:hover {
		color: var(--text);
		background: var(--accent-soft);
	}

	/* 狭い画面ではヘッダーの名前を消してナビを優先する(名前はヒーローに出ている) */
	@media (max-width: 420px) {
		.brand {
			display: none;
		}
		.inner {
			justify-content: center;
		}
		nav a {
			padding: 0.35rem 0.5rem;
		}
	}

	/* 本文 */
	main {
		max-width: var(--width);
		margin: 0 auto;
		padding: 0 var(--gutter);
	}

	section {
		padding: 2.5rem 0;
	}

	section + section {
		border-top: 1px solid var(--border);
	}

	h2 {
		font-size: 1.375rem;
		letter-spacing: 0.01em;
		margin-bottom: 1.25rem;
		display: flex;
		align-items: baseline;
		gap: 0.6rem;
	}

	h2 span {
		font-size: 0.8125rem;
		font-weight: 400;
		color: var(--muted);
	}

	/* ヒーロー */
	.hero {
		display: flex;
		gap: 1.5rem;
		align-items: center;
		padding: 3rem 0 2.5rem;
	}

	.avatar {
		width: 96px;
		height: 96px;
		border-radius: 50%;
		object-fit: cover;
		flex: none;
		border: 1px solid var(--border);
	}

	h1 {
		font-size: 1.75rem;
		line-height: 1.3;
	}

	.name-en {
		color: var(--muted);
		font-size: 0.9375rem;
	}

	.bio {
		margin-top: 0.75rem;
	}

	.links {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: 1rem;
	}

	.links a {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.3rem 0.85rem;
		border: 1px solid var(--border);
		border-radius: 999px;
		background: var(--surface);
		color: var(--text);
		font-size: 0.875rem;
		text-decoration: none;
	}

	.links a:hover {
		border-color: var(--accent);
		color: var(--accent);
	}

	@media (max-width: 520px) {
		.hero {
			flex-direction: column;
			text-align: center;
			padding-top: 2rem;
		}
		.links {
			justify-content: center;
		}
	}

	/* Works */
	.works {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 18rem), 1fr));
		gap: 0.875rem;
	}

	.works li {
		display: flex;
	}

	.work {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		padding: 1rem 1.125rem;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		color: var(--text);
		text-decoration: none;
		transition:
			border-color 0.15s,
			transform 0.15s;
	}

	.work:hover {
		border-color: var(--accent);
		transform: translateY(-2px);
	}

	.work h3 {
		font-size: 1rem;
		line-height: 1.5;
	}

	.work p {
		font-size: 0.875rem;
		color: var(--muted);
		flex: 1;
	}

	.host {
		font-size: 0.75rem;
		color: var(--accent);
	}

	/* Careers */
	.careers li {
		display: grid;
		grid-template-columns: 12rem 1fr;
		gap: 0.25rem 1rem;
		padding: 0.75rem 0;
	}

	.careers li + li {
		border-top: 1px dashed var(--border);
	}

	.period {
		color: var(--muted);
		font-size: 0.875rem;
		font-variant-numeric: tabular-nums;
		padding-top: 0.1rem;
	}

	@media (max-width: 520px) {
		.careers li {
			grid-template-columns: 1fr;
		}
	}

	/* Achievements */
	.year {
		display: grid;
		grid-template-columns: 4rem 1fr;
		gap: 1rem;
	}

	.year + .year {
		margin-top: 1.5rem;
	}

	.year-label {
		font-size: 1rem;
		color: var(--muted);
		font-variant-numeric: tabular-nums;
		padding-top: 1rem;
	}

	.achievements {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.achievement {
		padding: 0.875rem 1rem;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: var(--radius);
	}

	.meta {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.8125rem;
		color: var(--muted);
		font-variant-numeric: tabular-nums;
	}

	.tag {
		padding: 0 0.5rem;
		border-radius: 999px;
		font-size: 0.75rem;
		line-height: 1.6rem;
	}

	.tag-conference {
		background: var(--tag-conference-bg);
		color: var(--tag-conference-text);
	}

	.tag-talk {
		background: var(--tag-talk-bg);
		color: var(--tag-talk-text);
	}

	.tag-misc {
		background: var(--tag-misc-bg);
		color: var(--tag-misc-text);
	}

	.title {
		margin-top: 0.35rem;
		font-weight: 700;
		line-height: 1.55;
	}

	.title a {
		color: var(--text);
		text-decoration-color: color-mix(in srgb, var(--accent) 50%, transparent);
	}

	.title a:hover {
		color: var(--accent);
	}

	.venue {
		margin-top: 0.15rem;
		font-size: 0.875rem;
	}

	.note {
		font-size: 0.8125rem;
		color: var(--muted);
	}

	.awards {
		display: flex;
		flex-wrap: wrap;
		gap: 0.375rem;
		margin-top: 0.5rem;
	}

	.awards li {
		padding: 0.05rem 0.6rem;
		border-radius: 999px;
		background: var(--award-bg);
		color: var(--award-text);
		font-size: 0.75rem;
		font-weight: 700;
	}

	@media (max-width: 520px) {
		.year {
			grid-template-columns: 1fr;
			gap: 0.5rem;
		}
		.year-label {
			padding-top: 0;
		}
	}

	/* フッター */
	.site-footer {
		border-top: 1px solid var(--border);
		padding: 1.5rem var(--gutter) 2rem;
		text-align: center;
		font-size: 0.8125rem;
		color: var(--muted);
	}
</style>
