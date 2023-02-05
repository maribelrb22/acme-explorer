'use strict'
import { validationResult } from 'express-validator'

const handleValidation = async (req, res, next) => {
  const err = validationResult(req)
  if (err.errors.length > 0) {
    res.status(400).send(err)
  } else {
    next()
  }
}

export default handleValidation
