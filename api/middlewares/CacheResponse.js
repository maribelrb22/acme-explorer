'use strict'
import mcache from 'memory-cache'

var cacheResponse = function (milliseconds) {
    return (req, res, next) => {
        let key = "__express__" + req.originalUrl || req.url

        // return cached response
        let cachedBody = mcache.get(key)
        if (cachedBody) {
            res.send(cachedBody)
            return
        } else {
            res._send = res.send
            res.send = (body) => {
                // cache response and send it
                mcache.put(key, body, milliseconds);
                res._send(body);
            }
            next()
        }
    }
}

export default cacheResponse