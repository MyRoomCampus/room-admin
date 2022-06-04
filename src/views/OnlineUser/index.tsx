import styles from './index.module.less';
import ReactDOM from 'react-dom/client';
import { Button, Table, Tooltip } from '@douyinfe/semi-ui';
import { ClientInfo, SignalRClient } from '@//utils/signalrClient';
import { getAccessToken } from '@//utils/token';
import React, { useEffect, useState } from 'react';
import Header from '@douyinfe/semi-ui/lib/es/navigation/Header';

const createObserveBox = async (houseId: number): React.ReactElement => {
  let observeBox = document.getElementById('observe-box');
  if (observeBox != null) {
    console.log('observe box has already exist, please exit the current observe box');
    return <div>observe box has already exist, please exit the current observe box</div>
  }
  observeBox = document.createElement('div');
  observeBox.id = 'observe-box';
  document.body.appendChild(observeBox);
  const root = ReactDOM.createRoot(observeBox);

  const unmount = async () => {
    await client.stop()
    root.unmount();
    observeBox?.remove();
  };

  const accessToken = await getAccessToken();
  if (accessToken === null) {
    console.error('Can\'t get accessToken.');
    return <div>error</div>
  }
  const client = new SignalRClient(accessToken);

  return (
    <OnlineUser client={client} houseId={houseId} unmount={unmount}></OnlineUser>
  );
};

const OnlineUser = (props: { client: SignalRClient, houseId: number, unmount: () => void }) => {

  const [dataSource, setDataSource] = useState<ClientInfo[]>([]);

  const receiveVisit = (clientInfos: ClientInfo[]) => {
    setDataSource(clientInfos);
  };

  const connect = async () => {
    await props.client.startUp();
    props.client.onReceiveVisit = receiveVisit;
    props.client.sendObserve(props.houseId);
  };

  useEffect(() => {
    void connect();
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
        );
      }
    }
  ];

  return (
    <div className={styles['online-user-box']}>
      <Header style={{ display: 'flex', flexDirection: 'row' }}>
        <p>用户列表</p>
        <Button style={{ right: '30px' }} onClick={() => props.unmount()
        }>退出</Button>
      </Header>

      <div>

      </div>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
};

export default createObserveBox
