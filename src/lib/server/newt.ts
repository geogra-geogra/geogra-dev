import { createClient } from 'newt-client-js'
import { NEWT_SPACE_UID, NEWT_CDN_API_TOKEN } from '$env/static/private'

export interface Achievements {
  _id: string
  title: string
  conference: string
  author: string
  award: string
  slug: string
  date: string
  url: string
  categories: string[]
}

export interface Careers {
  _id: string
  title: string
  slug: string
  term: string
}

export interface Works {
  _id: string
  name: string
  slug: string
  description: string
  url: string
}


export const newtClient = createClient({
  spaceUid: NEWT_SPACE_UID,
  token: NEWT_CDN_API_TOKEN,
  apiType: 'cdn'
})