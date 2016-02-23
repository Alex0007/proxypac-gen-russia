/**
 * Apply environment vars depending on NODE_ENV var
 */

import config from '../config'

let applyVars = () => {
  let NODE_ENV = process.env.NODE_ENV || 'development'

  for (let prop in config.env[NODE_ENV]) {
    process.env[prop.toUpperCase()] = config.env[NODE_ENV][prop]
  }
}

applyVars()
