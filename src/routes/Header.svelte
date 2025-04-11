<script lang="ts">
	import { page } from '$app/state';
	import github from '$lib/images/github.svg';
	import xcom from '$lib/images/xcom.svg';
</script>

<header>
	<nav>
		<h1>geogra.dev</h1>
	</nav>
	<div class="corner">
		<a href="https://github.com/geogra-geogra/" target="_blank" rel="noopener noreferrer">
			<img src={github} alt="GitHub" />
		</a>
		<a href="https://x.com/geogra_geogra/" target="_blank" rel="noopener noreferrer">
			<img src={xcom} alt="X" />
		</a>
	</div>
</header>

<style>
	header {
		position: relative;
		top: 0;
		width: 100%;
		background: rgba(255, 255, 255, 1);
		z-index: 1000;
	}
	.corner {
		position: absolute;
		width: 3em;
		height: 3em;
		top: 0;
		right: 1rem;
		display: flex;
		gap: 0.5rem;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		padding: 0.5rem;
	}
	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.corner img {
		width: 2em;
		height: 2em;
		object-fit: contain;
	}

	nav {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0.5em 1em;
	}

	path {
		fill: var(--background);
	}
	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--color-theme-1);
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--color-theme-1);
	}
</style>
