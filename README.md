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

COMING SOON.
