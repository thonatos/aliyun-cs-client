# aliyun-cs-client

Aliyun container service client (node.js)

## Cluster

- https://github.com/aliyun/aliyun-openapi-python-sdk
- https://yq.aliyun.com/articles/5527?commentId=453

### example

```
# coding=utf-8

from aliyunsdkcore import client
from aliyunsdkcs.request.v20151215 import DescribeClusterDetailRequest

clt = client.AcsClient({YOUR_AK}, {YOUR_SK}, 'cn-hangzhou')

def get_master_url():
    request = DescribeClusterDetailRequest.DescribeClusterDetailRequest()
    request.set_ClusterId({YOUR_CLUSTER_ID})
    return clt.do_action(request)
```

## Application

- info
- start
- stop
- kill
- delete
- update
- create

### usage

- install

```
npm i aliyun-cs-client -s
```

- or clone the project

```
git clone https://github.com/thonatos/aliyun-cs-client
cd aliyun-cs-client
```

- nodejs

```
touch app.js
```

- app.js

```
const Cluster = require('aliyun-cs-client')

// const Cluster = require('./') // if clone the repo

const hz = new Cluster({

  // you can get master url with the python script under example
  // or aliyun cs admin dashboard : 
  // tcp://{ID}.cs-cn-hangzhou.aliyun.com:15086
  // change it to : https://{ID}.cs-cn-hangzhou.aliyun.com:15086
  // then, download the ssl ca/key/cert ~

  master_url: '{YOUR_MASTER_URL}',
  ssl: {
    ca: fs.readFileSync(path.resolve(__dirname, '../cluster/hz/ca.pem')),
    cert: fs.readFileSync(path.resolve(__dirname, '../cluster/hz/cert.pem')),
    key: fs.readFileSync(path.resolve(__dirname, '../cluster/hz/key.pem'))
  }
})
```

### Example dir structue

```
➔ tree -L 3
.
├── LICENSE
├── README.md
├── cluster
│   └── hz
│       ├── ca.pem
│       ├── cert.pem
│       └── key.pem
├── composer
│   ├── share.yml
│   └── www.yml
├── examples
│   ├── app.js
│   ├── cluster.py
│   └── test.yml
├── lib
│   └── index.js
└── node_modules
```

## More

- [Aliyun Container Service](https://cn.aliyun.com/product/containerservice?spm=5176.doc26063.416540.31.8xc1Dv)
- [Aliyun Container Service Docoument](https://help.aliyun.com/document_detail/26063.html?spm=5176.doc25983.6.678.m6RLTl)
