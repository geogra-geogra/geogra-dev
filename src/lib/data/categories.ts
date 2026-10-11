import type { Category } from './types';

/** Category master. Reference entries from achievements as `categories.<key>`. */
export const categories = {
	misc: { name: 'MISC', colorCode: '#ffdbd3' },
	conference: { name: 'Conference', colorCode: '#fbf4d2' },
	talk: { name: 'Talk', colorCode: '#fbf4d2' }
} satisfies Record<string, Category>;
