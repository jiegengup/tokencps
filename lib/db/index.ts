import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

const connectionString = process.env.DATABASE_URL || 'postgres://multica:multica@localhost:5432/tokencps'

// Use a single connection for queries (Next.js serverless-friendly)
const client = postgres(connectionString, { max: 10 })
export const db = drizzle(client, { schema })

export { schema }
export * from './schema'
