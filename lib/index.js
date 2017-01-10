const url = require('url')
const request = require('request')
const qs = require('querystring')

class Cluster {

  constructor(options) {
    
    const defaultOptions = {
      master_url: '',
      ssl: {
        ca: '',
        cert: '',
        key: ''
      }
    }

    // api list
    const apis = {
      info: {
        method: 'GET',
        url: 'projects/${name}',
        params: {}
      },
      start: {
        method: 'POST',
        url: 'projects/${name}/start',
        params: {}
      },
      stop: {
        method: 'POST',
        url: 'projects/${name}/stop',
        params: {
          t: 10
        }
      },
      kill: {
        method: 'POST',
        url: 'projects/${name}/kill',
        params: {
          signal: 'KILL'
        }
      },
      delete: {
        method: 'DELETE',
        url: 'projects/${name}',
        params: {
          force: false,
          volume: false
        }
      },
      update: {
        method: 'POST',
        url: 'projects/${name}/update',
        json: true,
        body: {
        }
      },
      create: {
        method: 'POST',
        url: 'projects/',
        json: true,
        body: {
          name: ''
        }
      }
    }

    this.apis = apis
    this.options = Object.assign(defaultOptions, options)

  }

  // https request
  request(options, callback) {
    const _options = this.options
    const _requestOptions = Object.assign({}, {
      url: url.resolve(_options.master_url, options.url),
      method: options.method || 'GET',
      json: options.json || false,
      body: options.body || null
    }, _options.ssl)

    // console.log(_requestOptions)

    request(_requestOptions, function (err, response, body) {
      if (err) {
        callback(err)
        return
      }
      callback(null, body, response)
    })
  }
  
  doAction(name, options, callback) {
    const _callback = callback || function () { }

    let api = this.apis[options.api]
    let requestUrl = name ? api.url.replace('${name}', name) : api.url
    let requestParams = qs.stringify(Object.assign(options, api.params || {}))

    this.request({
      url: requestParams ? requestUrl + '?' + requestParams : requestUrl,
      method: api.method,
      json: api.json,
      body: options.body || null
    }, _callback)
  }
}

module.exports = Cluster
