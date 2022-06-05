import { Button, Table, Tooltip } from '@douyinfe/semi-ui';
import { ClientInfo, SignalRClient } from '@//utils/signalrClient';
import { getAccessToken } from '@//utils/token';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const OnlineUser: React.FC = () => {
  const navigator = useNavigate()
  const params = useParams()
  const [isBuildConnection, setIsBuildConnection] = useState(false)

  const [dataSource, setDataSource] = useState<ClientInfo[]>([])

  const buildConnection = async () => {
    if(isBuildConnection){
      return;
    }
    setIsBuildConnection(true);

    const accessToken =  await getAccessToken()
    if (!accessToken) {
      navigator('/login')
      return
    }
    const client = new SignalRClient(accessToken)
    console.log('connection begin')

    client.onReceiveVisit = receiveVisit
    console.log('houseid', params.houseId)
    await client.startUp()
    client.sendObserve(parseInt(params.houseId ?? '103612'))
  }

  const receiveVisit = (clientInfos: ClientInfo[]) => {
    setDataSource(clientInfos)
  }

  void buildConnection();

  const columns = [
    {
      title: '用户',
      dataIndex: 'userName'
    },
    {
      title: 'ConnectionId',
      dataIndex: 'connectionId'
    },
    {
      title: '语言通话',
      render: () => {
        return (
          <Tooltip content={'尚未实现'}>
            <Button>发起通话</Button>
          </Tooltip>
        )
      }
    }
  ]

  return (
    <div className={'online-user-container'}>
      <div style={{marginBottom: '20px'}}>项目列表</div>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
};

export default OnlineUser;
