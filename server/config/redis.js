let client = null
const url = process.env.REDIS_URL || 'redis://127.0.0.1:6379'

try {
  const redis = require('redis')
  const createClient = redis.createClient || redis.default?.createClient || redis
  client = createClient({ url })
} catch (err) {
  console.error('Redis require failed:', err)
}

if (client) {
  if (typeof client.on === 'function') {
    client.on('error', (err) => console.error('Redis Client Error', err))
  }

  ;(async () => {
    try {
      if (typeof client.connect === 'function') {
        await client.connect()
        console.log('Redis connected')
      } else {
        console.warn('Redis client has no connect(), skipping connect.')
      }
    } catch (err) {
      console.error('Redis connection failed', err)
    }
  })()
}

module.exports = client
