import styles from './index.module.less';
import { Button, Table, Tooltip } from '@douyinfe/semi-ui';
import { ClientInfo, SignalRClient } from '@//utils/signalrClient';
import { getAccessToken } from '@//utils/token';
import React, { useEffect, useState } from 'react';
import Header from '@douyinfe/semi-ui/lib/es/navigation/Header';
import { useNavigate, useParams } from 'react-router-dom';

const OnlineUser: React.FC = () => {
  // TODO: get house id
  const navigator = useNavigate()
  const params = useParams()

  const [dataSource, setDataSource] = useState<ClientInfo[]>([])

  const receiveVisit = (clientInfos: ClientInfo[]) => {
    setDataSource(clientInfos)
  }

  const buildConnection = async () => {
    const accessToken =  await getAccessToken()
    if (!accessToken) {
      navigator('/login')
      return
    }
    const client = new SignalRClient(accessToken)
    console.log('connection begin')
    await client.startUp()
    client.onReceiveVisit = receiveVisit
    console.log('houseid', params.houseId)
    client.sendObserve(parseInt(params.houseId ?? '103612'))
  }

  useEffect(() => {
    void buildConnection();
  });

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
    <div className={styles['online-user-box']}>
      <Header style={{ display: 'flex', flexDirection: 'row' }}>
        <p>用户列表</p>
        <Button style={{ right: '30px' }}>退出</Button>
      </Header>

      <div>

      </div>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
};

export default OnlineUser;
