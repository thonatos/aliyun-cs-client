const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const Cluster = require('../')

// callback
const _callback = (err, body, response) => {
  if (err) {
    console.log(err)
    return
  }
  console.log(body, response.statusCode)
}

// init
const hz = new Cluster({
  master_url: '{YOUR_MASTER_URL}',
  ssl: {
    ca: fs.readFileSync(path.resolve(__dirname, '../cluster/hz/ca.pem')),
    cert: fs.readFileSync(path.resolve(__dirname, '../cluster/hz/cert.pem')),
    key: fs.readFileSync(path.resolve(__dirname, '../cluster/hz/key.pem'))
  }
})

// actions

function info() {
  hz.doAction('test', {
    api: 'info'
  }, _callback)
}

function start() {
  hz.doAction('test', {
    api: 'start'
  }, _callback)
}

function stop() {
  hz.doAction('test', {
    api: 'stop',
    params: {
      t: 30
    }
  }, _callback)
}

function del() {
  // must stop first
  hz.doAction('test', {
    api: 'delete',
    params: {
      force: true,
      volume: false
    }
  }, _callback)
}

function update() {
  try {
    const tmpl = fs.readFileSync('./test.yml', 'utf8')
    let tmplJSON = yaml.load(tmpl, { json: true })

    // old template
    console.dir(tmplJSON, { depth: null })

    // change image
    tmplJSON.services.web.image = 'nginx:1.10-alpine'

    // new template
    let newTmpl = yaml.dump(tmplJSON)

    // update
    hz.doAction('test', {
      api: 'update',
      body: {
        description: 'test update',
        template: newTmpl,
        version: '0.2',
        environment: {
          OSS: 'false'
        }
      }
    }, _callback)

  } catch (e) {
    console.log(e)
  }

}

function create() {
  const tmpl = fs.readFileSync('./test.yml', 'utf8')  
  hz.doAction(null, {
    api: 'create',
    body: {
      name: 'test',
      description: 'test',
      template: tmpl,
      version: '0.1',
      environment: {
        OSS: 'false'
      }
    }
  }, _callback)
}
