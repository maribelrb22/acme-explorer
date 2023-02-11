

const FINDER_CACHE_TIME   = Math.min(Math.max(process.env.FINDER_CACHE_TIME || 1),  1, 24)
const FINDER_SEARCH_LIMIT = Math.min(Math.max(process.env.FINDER_SEARCH_LIMIT || 10), 1, 100)

// conver hours to milliseconds
const FINDER_CACHE_TIME_MS = FINDER_CACHE_TIME * 60 * 60 * 1000

export { FINDER_CACHE_TIME_MS, FINDER_SEARCH_LIMIT }
