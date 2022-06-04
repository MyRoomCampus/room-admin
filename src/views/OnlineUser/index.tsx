import styles from './index.module.less';
import { Button, Table, Tooltip } from '@douyinfe/semi-ui';
import { ClientInfo, SignalRClient } from '@//utils/signalrClient';
import { JWT_ACCESS_TOKEN_KEY } from '@//utils/token';
import React, { useEffect, useState } from 'react';
import Header from '@douyinfe/semi-ui/lib/es/navigation/Header';
import { useNavigate } from 'react-router-dom';

// export const createObserveBox = async (houseId: number) => {
// let observeBox = document.getElementById('observe-box');
// if (observeBox != null) {
//   console.log('observe box has already exist, please exit the current observe box');
//   return;
// }
// observeBox = document.createElement('div');
// observeBox.id = 'observe-box';
// document.body.appendChild(observeBox);
// const root = ReactDOM.createRoot(observeBox);

// const unmount = async () => {
//   await client.stop()
//   root.unmount();
//   observeBox?.remove();
// };

// const accessToken = await getAccessToken();
// if (accessToken === null) {
//   return console.error('Can\'t get accessToken.');
// }
// const client = new SignalRClient(accessToken);
//
// root.render(
//   <OnlineUser client={client} houseId={houseId} unmount={unmount}></OnlineUser>
// );
// };

const OnlineUser: React.FC = () => {
  // todo get house id
  const navigator = useNavigate();
  const accessToken = localStorage.getItem(JWT_ACCESS_TOKEN_KEY);

  if (accessToken === null) {
    navigator('/login');
    return <div>未登录</div>;
  }

  const receiveVisit = (clientInfos: ClientInfo[]) => {
    setDataSource(clientInfos);
  };

  const client = new SignalRClient(accessToken);

  const buildConnection = async () => {
    await client.startUp();
    client.onReceiveVisit = receiveVisit;
    client.sendObserve(103612);
  };

  useEffect(() => {
    void buildConnection();
  });


  const [dataSource, setDataSource] = useState<ClientInfo[]>([]);

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
        <Button style={{ right: '30px' }}>退出</Button>
      </Header>

      <div>

      </div>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
};

export default OnlineUser;
