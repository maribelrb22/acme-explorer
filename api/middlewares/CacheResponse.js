'use strict'
import mcache from 'memory-cache'

var cacheFinderResponse = async (req, res, next) => {
    try {
        // get finder cache time from configuration
        const configuration = await ConfigurationModel.find()
        const finderCacheMillis = configuration.finderCacheSeconds * 1000

        // the explorerId is our cache key
        let key = req.params.explorerId

        // return cached response
        let cachedBody = mcache.get(key)
        if (cachedBody) {
            res.send(cachedBody)
            return
        } else {
            res._send = res.send
            res.send = (body) => {
                // cache response and send it
                mcache.put(key, body, finderCacheMillis);
                res._send(body);
            }
            next()
        }
    } catch (err) {
        req.err = err;
        next()
    }
}

export default cacheFinderResponse