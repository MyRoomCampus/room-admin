import {Button, Table} from '@douyinfe/semi-ui';
import {ClientInfo, SignalRClient} from '@//utils/signalrClient';
import {getAccessToken} from '@//utils/token';
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {randomString} from '@//utils/randomStr';

const OnlineUser: React.FC = () => {
  const pageNavigator = useNavigate()
  const params = useParams()
  const houseId = params.houseId;

  const [dataSource, setDataSource] = useState<ClientInfo[]>([])
  // const [localOfferKey, setLocalOfferKey] = useState('')
  const [client] = useState<SignalRClient>(new SignalRClient());

  useEffect(() => {
    const buildConnection = async () => {
      const accessToken = await getAccessToken()
      if (!accessToken) {
        pageNavigator('/login')
        return
      }

      client.onReceiveVisit = receiveVisit
      await client.startUp(accessToken)
      client.sendObserve(parseInt(houseId ?? '103612'))
    }

    const receiveVisit = (clientInfos: ClientInfo[]) => {
      setDataSource(clientInfos)
    }
    void buildConnection();
  }, [houseId])

  const audioRequest = async (clientInfo: ClientInfo) => {
    const localOfferKey = randomString(32);

    const pc = new RTCPeerConnection();

    // todo 放入某个组件
    let audio: MediaStream[]

    const localStream = await navigator.mediaDevices.getUserMedia({
      audio: true
    })

    for (const track of localStream.getTracks()) {
      pc.addTrack(track, localStream);
    }

    pc.ontrack = e => {
      if (e?.streams) {
        // 获取音频
        audio.push(e.streams[0])
        console.log(e);
        console.log(`pc 收到视频/音频流 ${e.streams}`);
      }
    }

    pc.onicecandidate = (e) => {
      if (e.candidate) {
        client.sendIceCandidateOffer(localOfferKey, e.candidate);
      }
    }

    client.onReceiveIceCandidateAnswer = (offerKey: string, candidate: RTCIceCandidate) => {
      if (localOfferKey !== offerKey) {
        return console.warn(`localOfferKey:${localOfferKey} != offerKey:${offerKey}`)
      }
      if(candidate){
        void pc.addIceCandidate(candidate);
      }
      else{
        console.warn('Receive null candidate.')
      }
    }
    client.onReceivePreAnswer = async (offerKey, answer) => {
      if (localOfferKey !== offerKey) {
        return console.warn(`localOfferKey:${localOfferKey} != offerKey:${offerKey}`)
      }
      if (!answer) {
        return console.info('user refused the audio offer.')
      }
      const offer = await pc.createOffer()
      await pc.setLocalDescription(offer);
      client.sendOffer(offerKey, offer as RTCSessionDescription);
    }
    client.onReceiveAnswer = async (offerKey, answer) => {
      if (localOfferKey !== offerKey) {
        return console.warn(`localOfferKey:${localOfferKey} != offerKey:${offerKey}`)
      }
      await pc.setRemoteDescription(answer)
    }

    client.sendPreOffer(localOfferKey, clientInfo.connectionId);
  }

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
      render: (clientInfo: ClientInfo) => {
        return (
          <Button onClick={() => {
            void audioRequest(clientInfo)
          }}>发起通话</Button>
        )
      }
    }
  ]

  return (
    <div className={'online-user-container'}>
      <div style={{marginBottom: '20px'}}>用户列表</div>
      <Table columns={columns} dataSource={dataSource}/>
    </div>
  );
};

export default OnlineUser;
