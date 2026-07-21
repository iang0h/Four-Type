import { after } from 'next/server'
import { createProductionRequestAccessPostHandler } from '@/lib/field-guide/access-server'

export const runtime = 'nodejs'

export const POST = createProductionRequestAccessPostHandler((work) => {
  after(work)
})
