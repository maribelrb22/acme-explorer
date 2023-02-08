'use strict'

function versionedRoutes(versions) {
    return function(req, res, next) {
        const apiVersion = req.header('X-API-Version');

        if (!versions.includes(apiVersion)) {   
            return res.status(400).send({ error: `X-API-Version must be a value in: ${versions}` });
        } 
        
        req.url = `/${apiVersion}${req.url}`;
        next();
    }
}
  
export default versionedRoutes
