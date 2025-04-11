import { newtClient } from '$lib/server/newt'
import type { Achievements } from '$lib/server/newt'
import type { Careers } from '$lib/server/newt'
import type { Works } from '$lib/server/newt'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
  const { items: achievements } = await newtClient.getContents<Achievements>({
    appUid: 'achievements',
    modelUid: 'article',
    query: {
      select: ['_id', 'title', 'slug', 'date', 'url', 'conference', 'author', 'award' , 'categories'],
      order: ['-date']
    }
  })

  const { items: careers } = await newtClient.getContents<Careers>({
    appUid: 'careers',
    modelUid: 'article',
    query: {
      select: ['_id', 'title', 'slug', 'term'],
    }
  })

  const { items: works } = await newtClient.getContents <Works>({
    appUid: 'works',
    modelUid: 'article',
    query: {
      select: ['_id', 'name', 'slug', 'description', 'url'],
      order: ['-_sys.customOrder']
    }
  })

  return {
    achievements,
    careers,
    works
  }
}
