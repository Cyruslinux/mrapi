/**
 * Get DB client instance
 *
 * @export
 * @param {*} Client
 * @param {string} url
 * @param {*} [options={}]
 * @returns
 */
export function getDBClientInstance(Client: any, url: string, options = {}) {
  process.env.DATABASE_URL = url
  return new Client({
    ...options,
    datasources: {
      db: {
        url,
      },
    },
  })
}

/**
 * Check "fn" is valid Function
 *
 * @export
 * @param {*} fn
 * @param {string} name
 * @param {*} [logger=console]
 * @returns
 */
export function checkFunction(fn: any, name: string, logger = console) {
  if (!fn) {
    logger.error(`client "${name}" function not configured.`)
    return false
  }

  if (typeof fn !== 'function') {
    logger.error(`client "${name}" should be a function.`)
    return false
  }

  return true
}
