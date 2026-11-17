import adapter from '@sveltejs/adapter-cloudflare';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

// SvelteKit 3 から設定は svelte.config.js ではなくここに書く
export default defineConfig({
	plugins: [sveltekit({ adapter: adapter() })]
});
