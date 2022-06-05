/* eslint-disable @typescript-eslint/no-unsafe-call */
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';

export interface ClientInfo {
  userName: string;
  connectionId: string;
}

// ------------------------------------------------------------------

type VisitFunction = (clientInfos: ClientInfo[]) => void;

type MessageFunction = (user: string, message: string) => void

type PreOfferFunction = (offerKey: string) => void;

type PreAnswerFunction = (offerKey: string, answer: boolean) => void;

type IceCandidateFunction = (offerKey: string, candidate: RTCIceCandidate) => void

type OfferFunction = (offerKey: string, offer: RTCSessionDescription) => Promise<void>

type AnswerFunction = (offerKey: string, answer: RTCSessionDescription) => void

// ------------------------------------------------------------------
export class SignalRClient {
  private readonly baseUrl = import.meta.env.VITE_BASE_URL as string;
  private readonly url = `${this.baseUrl}/hub/project`;
  private connection: HubConnection | undefined;

  onReceiveVisit: VisitFunction = () => console.warn('onReceiveVisit not implemented');
  onReceiveMessage: MessageFunction = () => console.warn('onReceiveMessage not implemented');
  onReceivePreOffer: PreOfferFunction = () => console.warn('onReceivePreOffer not implemented');
  onReceivePreAnswer: PreAnswerFunction = () => console.warn('onReceivePreAnswer not implemented');
  onReceiveIceCandidateAnswer: IceCandidateFunction = () => console.warn('onReceiveIceCandidate not implemented');
  onReceiveOffer: OfferFunction = async () => console.warn('onReceiveOffer not implemented');
  onReceiveAnswer: AnswerFunction = () => console.warn('onReceiveAnswer not implemented');

  isConnected() {
    return this.connection?.state === HubConnectionState.Connected;
  }

  async stop() {
    await this.connection?.stop();
  }

  async startUp(token: string) {
    this.connection = new HubConnectionBuilder()
      .withUrl(this.url, { accessTokenFactory: () => token })
      .build();

    if (this.isConnected()){
      return console.error('already connected')
    }
    await this.connection.start();
    console.log('connection')
    if (!this.isConnected()) {
      return false;
    }

    this.connection.on('ReceiveVisit', (clientInfos: ClientInfo[]) => {
      this.onReceiveVisit(clientInfos);
    });

    this.connection.on('ReceiveMessage', (user: string, message: string) => {
      this.onReceiveMessage(user, message);
    });

    this.connection.on('ReceivePreOffer', (offerKey: string) => {
      this.onReceivePreOffer(offerKey);
    });

    this.connection.on('ReceivePreAnswer', (offerKey: string, answer: boolean) => {
      this.onReceivePreAnswer(offerKey, answer);
    });

    this.connection.on('ReceiveIceCandidateAnswer', (user: string, candidate: RTCIceCandidate) => {
      this.onReceiveIceCandidateAnswer(user, candidate);
    });

    this.connection.on('ReceiveOffer', (user: string, offer: string) => {
      const obj = JSON.parse(offer) as RTCSessionDescription;
      void this.onReceiveOffer(user, obj);
    });

    this.connection.on('ReceiveAnswer', (user: string, answer: string) => {
      const obj = JSON.parse(answer) as RTCSessionDescription;
      this.onReceiveAnswer(user, obj);
    });

    return true;
  }

  // ------------------------------------------------------------------

  sendVisit(houseId: string) {
    if (!this.isConnected()) {
      return console.error('not connected');
    }

    this.connection?.invoke('SendVisit', houseId).catch(err => {
      return console.error(err.toString());
    });
  }

  sendObserve(houseId: number) {
    if (!this.isConnected()) {
      return console.error('not connected');
    }

    this.connection?.invoke('SendObserve', houseId).catch(err => {
      return console.error(err.toString());
    });
  }

  sendMessage(user: string, msg: string) {
    if (!this.isConnected()) {
      return console.error('not connected');
    }

    this.connection?.invoke('SendMessage', msg).catch(err => {
      return console.error(err.toString());
    });
  }

  sendIceCandidateOffer(offerKey: string, candidate: RTCIceCandidate) {
    if (!this.isConnected()) {
      return console.error('not connected');
    }

    this.connection?.invoke('SendIceCandidateOffer', offerKey, JSON.stringify(candidate)).catch(err => {
      return console.error(err.toString());
    });
  }

  sendIceCandidateAnser(offerKey: string, candidate: RTCIceCandidate) {
    if (!this.isConnected()) {
      return console.error('not connected');
    }

    this.connection?.invoke('SendIceCandidateAnser', offerKey, JSON.stringify(candidate)).catch(err => {
      return console.error(err.toString());
    });
  }


  sendPreOffer(offerKey: string, connectionId: string){
    if (!this.isConnected()){
      return console.error('not connected');
    }

    this.connection?.invoke('SendPreOffer', offerKey, connectionId).catch(err => {
      return console.error(err.toString());
    })
  }

  sendPreAnswer(offerKey: string, agree: boolean){
    if (!this.isConnected()){
      return console.error('not connected');
    }

    this.connection?.invoke('SendPreAnswer', offerKey, agree).catch(err => {
      return console.error(err.toString());
    })
  }

  sendOffer(offerKey: string, offer: RTCSessionDescription) {
    if (!this.isConnected()) {
      return console.error('not connected');
    }

    this.connection?.invoke('SendOffer', offerKey, JSON.stringify(offer)).catch(err => {
      return console.error(err.toString());
    });
  }

  sendAnswer(offerKey: string, answer: RTCSessionDescription) {
    if (!this.isConnected()) {
      return console.error('not connected');
    }

    this.connection?.invoke('SendAnswer', offerKey, JSON.stringify(answer)).catch(err => {
      return console.error(err.toString());
    });
  }
}
