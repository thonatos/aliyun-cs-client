# coding=utf-8

from aliyunsdkcore import client
from aliyunsdkcs.request.v20151215 import DescribeClusterDetailRequest

clt = client.AcsClient({YOUR_AK}, {YOUR_SK}, 'cn-hangzhou')

def get_master_url():
    request = DescribeClusterDetailRequest.DescribeClusterDetailRequest()
    request.set_ClusterId({YOUR_CLUSTER_ID})
    return clt.do_action(request)