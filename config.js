import extend from 'extend-or-modify'

let config = {
  env: {
    testing: {},
    development: {
      DUMP_URL: 'https://raw.githubusercontent.com/zapret-info/z-i/master/dump.csv',
      PROXYSTRING: 'SOCKS5 127.0.0.1:9050',
      HOST_DOMAIN: 'proxypac-gen-russia.alex0007.ru'
    },
    production: {}
  }
}

export default extend(config, './config.mod.js')
