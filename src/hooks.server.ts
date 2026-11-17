import type { Handle } from '@sveltejs/kit';

// 英語ページ(/en)では <html lang> を en にする
export const handle: Handle = ({ event, resolve }) => {
	const lang = event.url.pathname === '/en' || event.url.pathname.startsWith('/en/') ? 'en' : 'ja';
	return resolve(event, { transformPageChunk: ({ html }) => html.replace('%lang%', lang) });
};
